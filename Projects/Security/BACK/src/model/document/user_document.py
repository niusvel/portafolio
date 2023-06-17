from pydantic import BaseModel, Field

class UserDocument(BaseModel):
    id: str = Field(..., alias="_id")
    username: str
    password: str = None
    token: str = None
    refresh_token: str = None
    expired_time: int = None
