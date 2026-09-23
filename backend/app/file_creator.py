import json

from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel, Field

from .connection import manager

router = APIRouter(prefix="/file-creator")

request_queue = []
workspace_path = None
folder_structure = {}


class CreateFilesRequest(BaseModel):
    path: str = Field(min_length=1)
    names: list[str] = Field(min_length=1)


class WorkspaceRequest(BaseModel):
    path: str = Field(min_length=1)

class FolderStructureRequest(BaseModel):
    structure: dict = Field(min_length=1)

class CodeRequest(BaseModel):
    path: str = Field(min_length=1)
    code: str


@router.post("/workspace")
def publish_workspace(data: WorkspaceRequest):
    global workspace_path

    workspace_path = data.path.strip()


    return {"path": workspace_path}

@router.post("/folder-structure")
def publish_folder_structure(data: FolderStructureRequest):
    global folder_structure

    folder_structure = data.structure


    return {"path": workspace_path}


@router.get("/workspace")
def get_workspace():

    return {"path": workspace_path}

@router.get("/folder-structure")
def get_folder_structure():

    return {"structure": folder_structure}


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)

    try:
        while True:
            await websocket.receive_text()

    except WebSocketDisconnect:
        manager.disconnect(websocket)

    except Exception:
        manager.disconnect(websocket)

@router.websocket("/ws/frontend")
async def frontend_websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket, frontend=True)

    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            if message.get("type") == "code_request":
                await manager.broadcast_extension(message)

    except WebSocketDisconnect:
        manager.disconnect(websocket)

    except Exception:
        manager.disconnect(websocket)

@router.websocket("/ws/requests")
async def websocket_requests_endpoint(websocket: WebSocket):
    await manager.connect(websocket, frontend=True)

    try:
        while True:
            await websocket.receive_text()

            return;

            new_requests = [
                {
                    'action': 'get_code',
                    'type': 'code',
                    'path': workspace_path,
                }
            ]
            await manager.broadcast_extension({
                "type": "code_request",
                "requests": new_requests,
            })


    except WebSocketDisconnect:
        manager.disconnect(websocket)

    except Exception:
        manager.disconnect(websocket)

#gets code from extension and sends it to frontend via websocket
@router.post("/get_code")
async def return_code_request(data: CodeRequest):
    await manager.broadcast_frontend({
        "type": "code",
        "path": data.path.strip(),
        "code": data.code,
    })
    print(data.code,'hy')
    return {
        "sent": True,
        "path": data.path.strip(),
    }


@router.post("/requests")
async def queue_file_requests(data: CreateFilesRequest):
    path = data.path.strip()

    names = list(
        dict.fromkeys(
            name.strip()
            for name in data.names
            if name.strip()
        )
    )

    if not path:
        raise HTTPException(
            status_code=400,
            detail="Folder path is required."
        )

    if not names:
        raise HTTPException(
            status_code=400,
            detail="At least one file name is required."
        )

    new_requests = [
        {
            "action": "create",
            "type": "file",
            "path": path,
            "name": name,
        }
        for name in names
    ]

    request_queue.extend(new_requests)

    # Send the new requests to all connected WebSocket clients
    await manager.broadcast({
        "type": "file_request",
        "requests": new_requests,
    })

    return {
        "queued": len(names),
        "names": names,
    }

