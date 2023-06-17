from pymongo import MongoClient

class Database:
    def __init__(self) -> None:
        self.client = MongoClient("mongodb://localhost:27017")
        self.db = self.client["securityDB"]
    
    def get_collection(self, name):
        return self.db[name]

db = Database()
