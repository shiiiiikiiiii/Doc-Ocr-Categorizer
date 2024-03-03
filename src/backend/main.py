from fastapi import FastAPI

from api import users, courses, sections
from db.db_setup import engine
from db.models import db_model

db_model.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(users.router)
app.include_router(courses.router)
app.include_router(sections.router)
