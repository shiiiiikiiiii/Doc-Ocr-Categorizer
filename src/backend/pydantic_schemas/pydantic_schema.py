from pydantic import BaseModel
from typing import Union


# Image Pydantic Model
class PyImage(BaseModel):
    id: int
    file_key: str
    document_id: int


# Document Pydantic Model
class PyDocument(BaseModel):
    id: int
    name: str
    ocr_result: list[dict]  # JSON data can be represented as a dict in Pydantic.
    nlp_result: list = None  # Allowed to be None (i.e., accept null values)
    category_id: int


class PyDocumentRtn(BaseModel):
    id: int
    name: str
    ocr_result: list[dict]
    category_id: int


# Category Pydantic Model
class PyCategory(BaseModel):
    id: int
    name: str
    description: Union[str, None]


class PyCategoryInput(BaseModel):
    name: str
    description: Union[str, None]

