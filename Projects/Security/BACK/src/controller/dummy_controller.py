from fastapi import APIRouter, HTTPException, Header
from fastapi.responses import JSONResponse

from src.service.dummy_service import DummyService

dummy_router = APIRouter()
service = DummyService()

@dummy_router.get("/data", summary="Dummy data for testing.")
def get_dummy_data(Authorization: str = Header(None)):
    """
    Return a dummy data for testing.

    This endpoint receive a user token and return some dummy data if the token is valid.

    Returns:
    - 200: The dummy information.
    - 400: 'Bad request: token is required'.
    """
    if not Authorization:
        raise HTTPException(status_code=400, detail="Bad request: token is required")
    token = Authorization.split(" ")[1]
    if not token:
        raise HTTPException(status_code=400, detail="Bad request: token is required")
    result = service.get_dummy_data(token)
    if result.success == False:
        raise HTTPException(status_code=result.error_code, detail=result.message)
    return JSONResponse(status_code=result.success_code, content={"message": result.message, "data": result.extra_info})
