from sqlalchemy import Column, Integer, String, JSON, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy_utils import URLType

from db.models.utils.mixins import Timestamp
from db.db_setup import Base

from pgvector.sqlalchemy import Vector


# Image SQLAlchemy ORM Model
class DbImage(Timestamp, Base):
    __tablename__ = "image"
    id = Column(Integer, primary_key=True)
    file_key = Column(URLType, nullable=False)
    document_id = Column(Integer, ForeignKey("document.id"), nullable=False)

    document = relationship("DbDocument", back_populates="images")


# Document SQLAlchemy ORM Model
class DbDocument(Timestamp, Base):
    __tablename__ = "document"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    ocr_result = Column(JSON, nullable=False)  # Using JSON format to store OCR result
    nlp_result = Column(Vector(dim=1024), nullable=True)  # Using pgvector's Vector type and allowing null values
    category_id = Column(Integer, ForeignKey("category.id"), nullable=False)

    images = relationship("DbImage", back_populates="document")
    category = relationship("DbCategory", back_populates="documents")


# Category SQLAlchemy ORM Model
class DbCategory(Timestamp, Base):
    __tablename__ = "category"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)

    documents = relationship("DbDocument", back_populates="category")
