from fastapi import UploadFile
from minio import Minio
from rapidocr_onnxruntime import RapidOCR
from pydantic_schemas.pydantic_schema import PyImage, PyDocument
from sqlalchemy.orm import Session


def process_image(file: UploadFile, db: Session) -> PyDocument:
    # Create MinIO client
    client = Minio(
        "localhost:6900",
        access_key="admin",
        secret_key="password",
        secure=False,
    )

    # Upload image to MinIO and get URL
    file_contents = file.file.read()
    object_name = f"{file.filename}"
    client.put_object(
        "image-bucket", object_name, file_contents, length=len(file_contents)
    )
    image_url = client.presigned_get_object("image-bucket", object_name)

    # OCR recognition using RapidOCR
    engine = RapidOCR()
    with open(file.file.name, "rb") as img_file:
        result = engine(img_file)

    # Extract the OCR result and convert it to JSON format
    ocr_result = [
        {"coordinates": box, "text": text, "confidence": confidence}
        for box, text, confidence in result
    ]

    # Save image information to the db image table
    new_image = PyImage(file_key=image_url)
    db.add(new_image)
    db.commit()
    db.refresh(new_image)

    # Default category ID
    default_category_id: int = -1

    # Create a new Document object and store the OCR results as JSON in it
    new_document = PyDocument(
        name=file.filename,
        ocr_result=ocr_result,
        category_id=default_category_id,
        image_id=new_image.id,
    )
    db.add(new_document)
    db.commit()
    db.refresh(new_document)

    return new_document


import asyncio
from concurrent.futures import ThreadPoolExecutor


async def process_image_async(file: UploadFile, db: Session) -> PyDocument:
    loop = asyncio.get_running_loop()

    # Create a thread pool executor
    executor = ThreadPoolExecutor()

    # Define helper functions for synchronous processing of images
    def sync_process_image(upload_file, db_session):
        return process_image(upload_file, db_session)

    # Run async in executor
    document = await loop.run_in_executor(executor, sync_process_image, file, db)

    return document
