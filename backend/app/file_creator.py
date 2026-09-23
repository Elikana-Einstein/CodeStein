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


@router.post("/workspace")
def publish_workspace(data: WorkspaceRequest):
    global workspace_path

    workspace_path = data.path.strip()

    print(f"Workspace path: {workspace_path}")

    return {"path": workspace_path}

@router.post("/folder-structure")
def publish_folder_structure(data: FolderStructureRequest):
    global folder_structure

    folder_structure = data.structure

    print(f"Folder structure: {folder_structure}")

    return {"path": workspace_path}


@router.get("/workspace")
def get_workspace():
    print(f"Workspace path: {workspace_path}")

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

