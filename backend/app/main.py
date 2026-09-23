from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .log import router as log_router
from .file_creator import router as file_creator_router


@asynccontextmanager
async def lifespan(_app: FastAPI):
	Base.metadata.create_all(bind=engine)
	yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
	CORSMiddleware,
	allow_origins=["http://localhost:5173"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(log_router)
app.include_router(file_creator_router)

