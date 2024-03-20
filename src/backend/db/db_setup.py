from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

URL_SOURCE = "postgres:postgres@localhost/doc_ocr_categorizeer"
SQLALCHEMY_DATABASE_URL = f"postgresql+psycopg2://{URL_SOURCE}"
PGSQL2_DATABASE_URL = f"postgresql://{URL_SOURCE}"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={}, future=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, future=True)

Base = declarative_base()


# DB Utilities
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

