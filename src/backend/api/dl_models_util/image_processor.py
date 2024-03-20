from fastapi import UploadFile
from minio import Minio
from rapidocr_onnxruntime import RapidOCR
from db.models.db_model import DbImage, DbDocument
from sqlalchemy.orm import Session

import io

def process_image(input_file: UploadFile, db: Session) -> DbDocument:
    try:
        # Create MinIO client
        client = Minio(
            "localhost:6900",
            access_key="admin",
            secret_key="password",
            secure=False,
        )

        # Upload image to MinIO and get URL
        object_name = f"{input_file.filename}"
        file_bytes = input_file.file.read()  # Read the entire file into memory
        client.put_object(
            "image-bucket", object_name, io.BytesIO(file_bytes), length=len(file_bytes)
        )
        image_url = client.presigned_get_object("image-bucket", object_name)

        # OCR recognition using RapidOCR
        engine = RapidOCR()
        result, elapse = engine(file_bytes)

        # Extract the OCR result and convert it to JSON format
        ocr_result = [
            {"text": text,}
            for box, text, confidence in result
        ]

        # Default category ID
        default_category_id: int = 1

        # Create a new Document object and store the OCR results as JSON in it
        new_document = DbDocument(
            name=input_file.filename,
            ocr_result=ocr_result,
            category_id=default_category_id,
        )
        db.add(new_document)
        db.commit()
        db.refresh(new_document)

        # Save image information to the db image table
        new_image = DbImage(file_key=image_url, document_id=new_document.id)
        db.add(new_image)
        db.commit()
        db.refresh(new_image)  # Load the related information of new_image, like id

        return new_document

    except Exception as e:
        # Handle any exceptions that may occur
        print(f"Error occurred: {e}")
        raise e


import asyncio
from concurrent.futures import ThreadPoolExecutor


async def process_image_async(file: UploadFile, db: Session) -> DbDocument:
    loop = asyncio.get_running_loop()

    # Create a thread pool executor
    executor = ThreadPoolExecutor()

    # Define helper functions for synchronous processing of images
    def sync_process_image(upload_file, db_session):
        return process_image(upload_file, db_session)

    # Run async in executor
    document = await loop.run_in_executor(executor, sync_process_image, file, db)

    return document
