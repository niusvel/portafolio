from src.model.dto.user_dto import UserDTO
from src.model.bo.user_bo import UserBO

class UserServiceMapper:
    def bo_to_dto(self, src: UserBO):
        result = UserDTO(
            id=src.id if src.id is not None else None,
            username=src.username,
            password=src.password if src.password is not None else None
        )
        return result
    
    def dto_to_bo(self, src: UserDTO):
        result = UserBO(
            id=src.id if src.id is not None else None,
            username=src.username,
            password=src.password if src.password is not None else None
        )
        return result
