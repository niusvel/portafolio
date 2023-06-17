from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.origins import origins
from src.controller.auth_controller import auth_router
from src.controller.dummy_controller import dummy_router

app = FastAPI(debug=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.get("/")
async def root():
    return {"message": "Hi, Im working, so you can go to '[current URL]/docs' for viewing my endpoints"}

app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(dummy_router, prefix="/api/dummy", tags=["Dummy"])
