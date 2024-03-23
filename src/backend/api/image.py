from db.db_setup import get_db
from fastapi import APIRouter, HTTPException, Depends
from db.models.db_model import DbImage, DbDocument
from sqlalchemy.orm import Session


router = APIRouter()


@router.get("/images/{document_id}")
async def get_image_by_category(document_id: int, db: Session = Depends(get_db)):
    document = db.query(DbDocument).filter(DbDocument.id == document_id).first()
    if document is None:
        raise HTTPException(status_code=404, detail="Document not found")

    image = db.query(DbImage).filter(DbImage.document_id == document.id).first()
    if image is None:
        raise HTTPException(status_code=404, detail="Category not found")

    return {"image_url": f"{image.file_key}"}
