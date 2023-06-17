from src.model.bo.user_bo import UserBO
from src.model.document.user_document import UserDocument

class UserRepositoryMapper:
    def bo_to_doc(self, src: UserBO):
        result = UserDocument(
            id=src.id if src.id is not None else None,
            username=src.username,
            password=src.password if src.password is not None else None,
            token=src.token if src.token is not None else None,
            refresh_token=src.refresh_token if src.refresh_token is not None else None,
            expired_time=src.expired_time if src.expired_time is not None else None,
        )
        return result
    
    def doc_to_bo(self, src: UserDocument):
        result = UserBO(
            id=src.id if src.id is not None else None,
            username=src.username,
            password=src.password if src.password is not None else None,
            token=src.token if src.token is not None else None,
            refresh_token=src.refresh_token if src.refresh_token is not None else None,
            expired_time=src.expired_time if src.expired_time is not None else None,
        )
        return result
