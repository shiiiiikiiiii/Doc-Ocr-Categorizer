from sqlalchemy import Column, Integer, String, JSON, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy_utils import URLType

from backend.db.models.utils.mixins import Timestamp
from backend.db.db_setup import Base


# Image SQLAlchemy ORM Model
class Image(Timestamp, Base):
    __tablename__ = "image"
    id = Column(Integer, primary_key=True)
    file_key = Column(URLType, nullable=False)
    document_id = Column(Integer, ForeignKey("document.id"), nullable=False)

    document = relationship("Document", back_populates="images")


# Document SQLAlchemy ORM Model
class Document(Timestamp, Base):
    __tablename__ = "document"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    ocr_result = Column(JSON, nullable=False)  # Using JSON format to store OCR result
    category_id = Column(Integer, ForeignKey("category.id"), nullable=False)

    images = relationship("Image", back_populates="document")
    category = relationship("Category", back_populates="documents")


# Category SQLAlchemy ORM Model
class Category(Timestamp, Base):
    __tablename__ = "category"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)

    documents = relationship("Document", back_populates="category")
