from fastapi import FastAPI

from api import document, category
from db.db_setup import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(document.router)
app.include_router(category.router)
