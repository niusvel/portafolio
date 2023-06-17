from src.repository.auth_repository import AuthRepository
from src.model.bo.response_bo import ResponseBO

class DummyService:
    def __init__(self) -> None:
        self.repository = AuthRepository()
    
    def get_dummy_data(self, token) -> ResponseBO:
        if not token:
            return ResponseBO(success=False, success_code=None, error_code=400, message="Bad request, token is required", extra_info=None)
        result = self.repository.check_token(token)
        if result.success == True:
            result.extra_info = { "dummyData": "Here you have a dummy message" }
        return result