from pymongo.errors import DuplicateKeyError
from bson import ObjectId

from db.database import db
from src.model.document.user_document import UserDocument
from src.model.bo.response_bo import ResponseBO
from src.repository.mapper.user_repository_mapper import UserRepositoryMapper
from src.repository.utils.tokens import generate_access_token, generate_refresh_token, decode_token, ACCESS_TOKEN_EXPIRE_MINUTES

from utils.logger import logger

def get_token_info(user_doc: UserDocument, auth):
    access_token = user_doc.token
    refresh_token = user_doc.refresh_token
    auth.extra_info = {"accessToken": access_token, "expirationTime": ACCESS_TOKEN_EXPIRE_MINUTES, "refreshToken": refresh_token}
    return auth

class AuthRepository:
    def __init__(self) -> None:
        self.collection = db.get_collection("users")
        self.mapper = UserRepositoryMapper()
    
    def register_user(self, username, password) -> ResponseBO:
        doc = UserDocument(
            _id="",
            username=username,
            password=password,
            token=generate_access_token(username),
            refresh_token=generate_refresh_token(username),
            expired_time=ACCESS_TOKEN_EXPIRE_MINUTES
        )
        doc_dic = doc.dict()
        del doc_dic["id"]
        try:
            existing_user = self.collection.find_one({"username": username})
            if existing_user:
                return ResponseBO(success=False, success_code=None, error_code=400, message="Username already exists", extra_info=None)
            insertion_result = self.collection.insert_one(doc_dic)
            if not insertion_result:
                return ResponseBO(success=False, success_code=None, error_code=500, message="Internal error, the user cannot be registered", extra_info=None)
            result = ResponseBO(success=True, success_code=201, error_code=None, message="User registered successfully", extra_info=None)
            result.extra_info = {"accessToken": doc.token, "expirationTime": doc.expired_time, "refreshToken": doc.refresh_token}
            return result
        except DuplicateKeyError:
            return ResponseBO(success=False, success_code=None, error_code=400, message="Username already exists", extra_info=None)
    
    def login_user(self, username, password) -> ResponseBO:
        try:
            db_user = self.collection.find_one({"username": username, "password": password})
            if not db_user:
                return ResponseBO(success=False, success_code=None, error_code=401, message="Unauthorized: Invalid username or password", extra_info=None)
            token = generate_access_token(username)
            refresh_token = generate_refresh_token(username)
            db_user["token"] = token
            db_user["refresh_token"] = refresh_token
            db_user["expired_time"] = ACCESS_TOKEN_EXPIRE_MINUTES
            update_query = {"_id": ObjectId(db_user["_id"])}
            update_operation = {"$set": db_user}
            result = self.collection.update_one(update_query, update_operation)
            if result.matched_count == 0:
                return ResponseBO(success=False, success_code=None, error_code=409, message="The new token cannot be updated", extra_info=None)
            result = ResponseBO(success=True, success_code=202, error_code=None, message="User logged successfully", extra_info=None)
            result.extra_info = {"accessToken": token, "expirationTime": ACCESS_TOKEN_EXPIRE_MINUTES, "refreshToken": refresh_token}
            return result
        except:
            return ResponseBO(success=False, success_code=None, error_code=500, message="Internal error", extra_info=None)
    
    def check_token(self, token) -> ResponseBO:
        try:
            username = decode_token(token)
            if not username:
                return ResponseBO(success=False, uccess_code=None, error_code=401, message="Invalid refreshToken", extra_info=None)
            db_user = self.collection.find_one({"username": username, "token": token})
            if not db_user:
                return ResponseBO(success=False, success_code=None, error_code=401, message="Invalid token", extra_info=None)
            return ResponseBO(success=True, success_code=200, error_code=None, message="Valid token", extra_info=None)
        except:
            return ResponseBO(success=False, success_code=None, error_code=500, message="Internal error", extra_info=None)
    
    def refresh_token(self, refreshToken) -> ResponseBO:
        try:
            username = decode_token(refreshToken)
            if not username:
                return ResponseBO(success=False, success_code=None, error_code=401, message="Invalid refreshToken", extra_info=None)
            db_user = self.collection.find_one({"username": username, "refreshToken": refreshToken})
            if not db_user:
                return ResponseBO(success=False, success_code=None, error_code=401, message="Invalid refreshToken", extra_info=None)
            doc = UserDocument(
                _id=str(db_user["_id"]),
                username=username,
                password=db_user.get("password"),
                token=generate_access_token(username),
                refresh_token=generate_refresh_token(username),
                expired_time=ACCESS_TOKEN_EXPIRE_MINUTES
            )
            result = ResponseBO(success=True, success_code=200, error_code=None, message="Token refreshed successfully", extra_info=None)
            result.extra_info = {"accessToken": doc.token, "expirationTime": doc.expired_time, "refreshToken": doc.refresh_token}
            return result
        except:
            return ResponseBO(success=False, success_code=None, error_code=500, message="Internal error", extra_info=None)
