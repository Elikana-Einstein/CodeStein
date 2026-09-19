from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field


router = APIRouter(prefix="/file-creator")
request_queue = []
workspace_path = None


class CreateFilesRequest(BaseModel):
    path: str = Field(min_length=1)
    names: list[str] = Field(min_length=1)


class WorkspaceRequest(BaseModel):
    path: str = Field(min_length=1)


@router.post("/workspace")
def publish_workspace(data: WorkspaceRequest):
    global workspace_path

    workspace_path = data.path.strip()
    return {"path": workspace_path}


@router.get("/workspace")
def get_workspace():
    print(f"Workspace path: {workspace_path}")
    return {"path": workspace_path}


@router.post("/requests")
def queue_file_requests(data: CreateFilesRequest):
    path = data.path.strip()
    names = list(dict.fromkeys(name.strip() for name in data.names if name.strip()))

    if not path:
        raise HTTPException(status_code=400, detail="Folder path is required.")

    if not names:
        raise HTTPException(status_code=400, detail="At least one file name is required.")

    request_queue.extend(
        {
            "action": "create",
            "type": "file",
            "path": path,
            "name": name,
        }
        for name in names
    )

    return {"queued": len(names), "names": names}


@router.get("/requests")
def get_file_requests():
    requests = request_queue.copy()
    request_queue.clear()
    return requests