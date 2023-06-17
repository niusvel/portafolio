from pydantic import BaseModel

class UserBO(BaseModel):
    id: str = None
    username: str
    password: str | None = None
    token: str | None = None
    refresh_token: str | None = None
    expired_time: int | None = None
