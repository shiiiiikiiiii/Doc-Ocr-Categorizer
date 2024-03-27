from db.db_setup import get_db
from fastapi import APIRouter, HTTPException, UploadFile, Depends, File
from api.dl_models_util.image_processor import process_image_async
from api.dl_models_util.text_summarizer import generate_text_vector_async
from api.util.document_pg_util import find_most_related_document, update_category_id
from db.models.db_model import DbDocument, DbCategory
from pydantic_schemas.pydantic_schema import PyDocumentRtn
from sqlalchemy.orm import Session

from api.util.nlp_str import TASK, INSTRUCT


router = APIRouter()


@router.post("/upload", response_model=PyDocumentRtn)
async def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Process the image to create a document with nlp_result as null
    document = await process_image_async(file, db)
    
    # Update the nlp_result field of the document with the generated text vector
    document_text = document.ocr_result
    current_nlp_result = await generate_text_vector_async(TASK, INSTRUCT, str(document_text))
    
    # Update the document with the new nlp_result
    document.nlp_result = current_nlp_result
    # Merge the updated document with the database to ensure the changes are tracked
    db.merge(document)
    # Commit the changes to the database
    db.commit()
    
    # Find the most related document and update the category_id if necessary
    most_related_category_id: DbDocument = find_most_related_document(document.id)
    document = await update_category_id(db, document, most_related_category_id)
    
    return document


@router.get("/documents", response_model=list[PyDocumentRtn])
async def get_documents(db: Session = Depends(get_db)):
    documents = db.query(DbDocument).all()
    if documents is None:
        raise HTTPException(status_code=404, detail="Documents are empty")
    return documents


@router.get("/documents/{id}", response_model=PyDocumentRtn)
async def get_document(id: int, db: Session = Depends(get_db)):
    document = db.query(DbDocument).filter(DbDocument.id == id).first()
    if document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return document


@router.get("/documents/search/{search_name}", response_model=list[PyDocumentRtn])
async def search_documents(search_name: str, db: Session = Depends(get_db)):
    query = db.query(DbDocument)
    if search_name:
        query = query.filter(DbDocument.name.contains(search_name))
    documents = query.all()
    return documents


@router.delete("/documents/{id}", status_code=204)
async def delete_document(id: int, db: Session = Depends(get_db)):
    result = db.query(DbDocument).filter(DbDocument.id == id).delete()
    if result == 0:
        raise HTTPException(status_code=404, detail="Document not found")
    db.commit()
    return {
        "id": id,
        "message": "Document deleted successfully"
        }


@router.patch("/documents/{document_id}", response_model=PyDocumentRtn)
async def update_document(document_id: int, update_data: dict, db: Session = Depends(get_db)):
    document = db.query(DbDocument).filter(DbDocument.id == document_id).first()
    if document is None:
        raise HTTPException(status_code=404, detail="Document not found")

    for key, value in update_data.items():
        if (key == "category_id"):
            category = db.query(DbCategory).filter(DbCategory.id == value).first()
            if category is None:
                raise HTTPException(status_code=404, detail="Document not found")
        setattr(document, key, value)

    db.commit()
    return document
