from pydantic import BaseModel

class ResponseBO(BaseModel):
    success: bool
    success_code: int | None = None
    error_code: int | None = None
    message: str | None = None
    extra_info: object | None = None
