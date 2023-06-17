from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse

from src.model.dto.user_dto import UserDTO
from src.service.auth_service import AuthService

from utils.logger import logger

auth_router = APIRouter()
service = AuthService()


@auth_router.post("/register", summary="Register a user.")
def register_user(user: UserDTO):
    """
    Register a user.

    This endpoint receive a user data and create it if there is no user with the same username in the application.
    It return a JSON response containing the success message or an HTTPException with its status code and detail.

    Returns:
    - 200: User registered successfully, and a data object with the accessToken, the expirationTime, and the refreshToken for the logged user.
    - 400: 'Bad request: user is required' or 'Bad request, username and password are required' or 'Username already exists'.
    - 500: Internal error, the user cannot be registered.
    """
    if not user:
        raise HTTPException(status_code=400, detail="Bad request: user is required")
    result = service.register_user(user.username, user.password)
    if result.success == False:
        raise HTTPException(status_code=result.error_code, detail=result.message)
    return JSONResponse(status_code=result.success_code, content={"message": result.message, "data": result.extra_info})

@auth_router.post("/login")
def login_user(user: UserDTO):
    """
    Login a user.

    This endpoint receive a user data and login it in the application.
    It return a JSON response containing the access token, expiration time for this token and a refresh token if the login is success, 
    or an HTTPException with its status code and detail otherwise.

    Returns:
    - 202: User logged successfully, and a data object with the accessToken, the expirationTime, and the refreshToken for the logged user.
    - 401: Unauthorized: Invalid username or password.
    - 400: Bad request, username and password are required.
    - 500: Internal error.
    """
    if not user:
        raise HTTPException(status_code=400, detail="Bad request: user is required")
    result = service.login_user(user.username, user.password)
    if result.success == False:
        raise HTTPException(status_code=result.error_code, detail=result.message)
    return JSONResponse(status_code=result.success_code, content={ "message": result.message, "data": result.extra_info})
