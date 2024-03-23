from db.models.db_model import DbDocument


def single_document_return(db_document: DbDocument) -> dict:
    return {"id": f"{db_document.id}", "category_id": f"{db_document.category_id}", "ocr_result": f"{db_document.ocr_result}"}


def multiple_documents_return(db_documents: list[DbDocument]) -> list:
    return [{"id": f"{doc.id}", "name": f"{doc.name}"} for doc in db_documents]
