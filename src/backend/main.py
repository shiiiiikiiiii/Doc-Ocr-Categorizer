from fastapi import FastAPI

from api import document, category
from db.db_setup import engine
from db.models import db_model

db_model.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(document.router)
app.include_router(category.router)
