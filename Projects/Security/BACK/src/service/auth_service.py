from src.repository.auth_repository import AuthRepository
from src.model.bo.response_bo import ResponseBO
from src.service.mapper.user_service_mapper import UserServiceMapper

from utils.logger import logger

class AuthService:
    def __init__(self) -> None:
        self.repository = AuthRepository()
        self.mapper = UserServiceMapper()
    
    def register_user(self, username, password) -> ResponseBO:
        if not username or not password:
            return ResponseBO(success=False, success_code=None, error_code=400, message="Bad request, username and password are required", extra_info=None)
        result = self.repository.register_user(username, password)
        return result
    
    def login_user(self, username, password) -> ResponseBO:
        if not username or not password:
            return ResponseBO(False, None, 400, "Bad request, username and password are required")
        result = self.repository.login_user(username, password)
        return result
    
    def refresh_token(self, refreshToken) -> ResponseBO:
        if not refreshToken:
            return ResponseBO(False, None, 400, "Bad request, refreshToken is required")
        result = self.repository.refresh_token(refreshToken)
        return result
