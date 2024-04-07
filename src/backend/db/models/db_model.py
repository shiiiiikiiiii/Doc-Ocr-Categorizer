from sqlalchemy import Column, Integer, String, JSON, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy_utils import URLType
from db.models.utils.mixins import Timestamp
from db.db_setup import Base
from pgvector.sqlalchemy import Vector
from db.models.utils.enums import Role, AccessType

import sqlalchemy


# Image SQLAlchemy ORM Model
class DbImage(Timestamp, Base):
    __tablename__ = "image"

    id = Column(Integer, primary_key=True)
    file_key = Column(URLType, nullable=False)
    document_id = Column(Integer, ForeignKey("document.id", ondelete="CASCADE"), nullable=False)
    document = relationship("DbDocument", back_populates="image")


# Document SQLAlchemy ORM Model
class DbDocument(Timestamp, Base):
    __tablename__ = "document"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    ocr_result = Column(JSON, nullable=False)  # Using JSON format to store OCR result
    nlp_result = Column(Vector(dim=1024), nullable=True)  # Using pgvector's Vector type and allowing null values
    category_id = Column(Integer, ForeignKey("category.id", ondelete="CASCADE"), nullable=False)
    image = relationship("DbImage", back_populates="document", cascade="all, delete", passive_deletes=True, uselist=False)
    category = relationship("DbCategory", back_populates="documents")


# Category SQLAlchemy ORM Model (Updated)
class DbCategory(Timestamp, Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    library_id = Column(Integer, ForeignKey("library.id", ondelete="CASCADE"), nullable=False)
    library = relationship("DbLibrary", back_populates="categories")
    documents = relationship("DbDocument", back_populates="category", cascade="all, delete", passive_deletes=True, lazy='dynamic')


# User SQLAlchemy ORM Model
class DbUser(Timestamp, Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False, unique=True)
    email = Column(String, nullable=False, unique=True)
    password_hash = Column(String, nullable=False)
    role = Column(sqlalchemy.Enum(Role), nullable=False)
    libraries = relationship("DbLibrary", secondary="user_library_association", back_populates="users")


# Library SQLAlchemy ORM Model
class DbLibrary(Timestamp, Base):
    __tablename__ = "library"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    created_by = Column(Integer, ForeignKey("user.id", ondelete="SET NULL"), nullable=True)
    user = relationship("DbUser", back_populates="libraries")
    access_type = Column(sqlalchemy.Enum(AccessType), nullable=False)
    documents = relationship("DbDocument", back_populates="library", cascade="all, delete", passive_deletes=True, lazy='dynamic')


# UserLibraryAssociation SQLAlchemy ORM Model for Many-to-Many Relationship
class DbUserLibraryAssociation(Base):
    __tablename__ = "user_library_association"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=True)
    library_id = Column(Integer, ForeignKey("library.id", ondelete="CASCADE"), nullable=True)
    permission_level = Column(Integer, nullable=False)
    users = relationship("DbUser", back_populates="libraries")
    libraries = relationship("DbLibrary", back_populates="users")
