from pydantic import BaseModel


# Image Pydantic Model
class Image(BaseModel):
    id: int
    file_key: str
    document_id: int


# Document Pydantic Model
class Document(BaseModel):
    id: int
    name: str
    ocr_result: dict  # JSON data can be represented as a dict in Pydantic.
    nlp_result: list = None  # Allowed to be None (i.e., accept null values)
    category_id: int


# Category Pydantic Model
class Category(BaseModel):
    id: int
    name: str
    description: str
