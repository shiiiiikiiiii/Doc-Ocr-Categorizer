poetry install --no-root
poetry shell

# in poetry shell
# alembic upgrade head
# uvicorn app.main:app --reload