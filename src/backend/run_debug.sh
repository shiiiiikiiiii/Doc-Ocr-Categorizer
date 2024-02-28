# in poetry shell
alembic upgrade head
uvicorn app.main:app --reload