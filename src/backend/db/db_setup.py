from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql+psycopg2://postgres:postgres@localhost/doc_ocr_categorizeer"

engine = create_engine(DATABASE_URL, connect_args={}, future=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, future=True)

Base = declarative_base()


# DB Utilities
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


import psycopg2


# Psycopg2 Connection Utilities
def get_psycopg2_conn():
    # 创建一个新的psycopg2连接
    return psycopg2.connect(DATABASE_URL)

def close_psycopg2_conn(conn):
    # 关闭psycopg2连接
    conn.close()

# 使用上下文管理器模式来管理psycopg2连接的生命周期
class Psycopg2ConnectionManager:
    def __init__(self):
        self.conn = None

    def __enter__(self):
        # 确保只创建一次连接
        if self.conn is None:
            self.conn = get_psycopg2_conn()
        return self.conn

    def __exit__(self, exc_type, exc_val, exc_tb):
        # 在退出上下文时关闭连接
        close_psycopg2_conn(self.conn)
        self.conn = None


def get_psycopg2_connection():
    return Psycopg2ConnectionManager()