from pydantic import BaseModel
from sqlalchemy_utils import URLType

# Image Pydantic Model
class Image(BaseModel):
    id: int
    file_key: URLType
    document_id: int

# Document Pydantic Model
class Document(BaseModel):
    id: int
    name: str
    ocr_result: dict  # JSON data can be represented as a dict in Pydantic.
    category_id: int

# Category Pydantic Model
class Category(BaseModel):
    id: int
    name: str
    description: str