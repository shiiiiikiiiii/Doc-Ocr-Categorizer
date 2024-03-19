from db.db_setup import get_db
from fastapi import APIRouter, HTTPException, Depends
from pydantic_schemas.pydantic_schema import PyDocument, PyCategory
from db.models.db_model import DbCategory, DbDocument
from sqlalchemy.orm import Session


router = APIRouter()


@router.get("/categories", response_model=list[PyCategory])
async def get_categories(db: Session = Depends(get_db)):
    categories = db.query(DbCategory).all()
    return categories


@router.post("/categories", response_model=PyCategory)
async def create_category(category: PyCategory, db: Session = Depends(get_db)):
    new_category = DbCategory(
        name = category.name,
        description = category.description
    )
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category


@router.patch("/categories/{id}")
async def update_category(id: int, updated_data: dict, db: Session = Depends(get_db)):
    category = db.query(DbCategory).filter(DbCategory.id == id).first()
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")

    for key, value in updated_data.items():
        setattr(category, key, value)

    db.commit()
    return {"message": "Category updated successfully"}


@router.delete("/categories/{id}", status_code=204)
async def delete_category(id: int, db: Session = Depends(get_db)):
    result = db.query(DbCategory).filter(DbCategory.id == id).delete()
    if result == 0:
        raise HTTPException(status_code=404, detail="Category not found")
    db.commit()
    return {"message": "Category deleted successfully"}


@router.get("/categories/{category_id}/documents", response_model=list[PyDocument])
async def get_documents_by_category(category_id: int, db: Session = Depends(get_db)):
    documents = db.query(DbDocument).filter(DbDocument.category_id == category_id).all()
    return documents
