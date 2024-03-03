from db.db_setup import get_db
from fastapi import APIRouter, HTTPException, Depends, File, UploadFile, Query
from api.utils.image_processor import process_image_async
from pydantic_schemas.pydantic_schema import Document, Category
from sqlalchemy.orm import Session


router = APIRouter()


@router.post("/upload")
async def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    document = await process_image_async(file, db)
    return document


@router.get("/documents", response_model=list[Document])
async def get_documents(db: Session = Depends(get_db)):
    documents = db.query(Document).all()
    if documents is None:
        raise HTTPException(status_code=404, detail="Documents are empty")
    return documents


@router.get("/documents/{id}")
async def get_document(id: int, db: Session = Depends(get_db)):
    document = db.query(Document).filter(Document.id == id).first()
    if document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return document


@router.get("/documents/search", response_model=list[Document])
async def search_documents(name: str = Query(None), db: Session = Depends(get_db)):
    query = db.query(Document)
    if name:
        query = query.filter(Document.name.contains(name))
    documents = query.all()
    return documents


@router.delete("/documents/{id}", status_code=204)
async def delete_document(id: int, db: Session = Depends(get_db)):
    result = db.query(Document).filter(Document.id == id).delete()
    if result == 0:
        raise HTTPException(status_code=404, detail="Document not found")
    db.commit()


@router.post("/documents/{document_id}/category")
async def update_document_category(
    document_id: int, category_id: int, db: Session = Depends(get_db)
):
    document = db.query(Document).filter(Document.id == document_id).first()
    if document is None:
        raise HTTPException(status_code=404, detail="Document not found")

    category = db.query(Category).filter(Category.id == category_id).first()
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")

    document.category_id = category_id
    db.commit()
    return {"message": "Document category updated successfully"}
