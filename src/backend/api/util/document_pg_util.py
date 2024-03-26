from db.db_setup import PGSQL2_DATABASE_URL
import psycopg2


# Psycopg2 Connection Utilities
def get_psycopg2_conn():
    return psycopg2.connect(PGSQL2_DATABASE_URL)

def close_psycopg2_conn(conn):
    conn.close()

# Use the context manager pattern to manage the lifecycle of psycopg2 connections
class Psycopg2ConnectionManager:
    def __init__(self):
        self.conn = None

    def __enter__(self):
        # Make sure only create the connection once
        if self.conn is None:
            self.conn = get_psycopg2_conn()
        return self.conn

    def __exit__(self, exc_type, exc_val, exc_tb):
        # Close the connection when exiting the context
        close_psycopg2_conn(self.conn)
        self.conn = None


from sqlalchemy.orm import Session
from db.models.db_model import DbDocument


def find_most_related_document( document_id: int ):
    with Psycopg2ConnectionManager() as conn_manager:
        # Use cosine similarity calculation in pgvector
        query = """
        SELECT category_id
        FROM document
        WHERE id != %s
        ORDER BY (SELECT 1 - COALESCE((nlp_result <-> (SELECT nlp_result FROM document WHERE id = %s)), 0) END)
        LIMIT 1;
        """
        
        cursor = conn_manager.cursor()
        cursor.execute(query, (document_id, document_id))
        result = cursor.fetchone()
        
        cursor.close()

    return result


# Helper function to update the document's category_id based on the most related document
async def update_category_id(db: Session, document: DbDocument, most_related_category_id: int):
    if most_related_category_id and most_related_category_id != document.category_id:
        document.category_id = most_related_category_id
        db.commit()
    return document