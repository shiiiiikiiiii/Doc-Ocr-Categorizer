from sqlalchemy.orm import Session
from db.models.db_model import DbDocument
from typing import Optional

from db.db_setup import get_psycopg2_connection
from fastapi import Depends


def find_most_related_document( document_id: int, conn = Depends(get_psycopg2_connection)):
    # 使用pgvector的余弦相似度计算功能来找到最相似的文档
    query = """
    SELECT id, nlp_result
    FROM document
    WHERE id != %s
    ORDER BY (SELECT 1 - COALESCE((nlp_result <-> (SELECT nlp_result FROM document WHERE id = %s)), 0) END)
    LIMIT 1;
    """
    
    # 执行查询
    cursor = conn.cursor()
    cursor.execute(query, (document_id, document_id))
    result = cursor.fetchone()
    
    # 关闭游标
    cursor.close()
    
    # 返回最相关文档的ID和nlp_result
    return result


# Helper function to update the document's category_id based on the most related document
async def update_category_id(db: Session, document: DbDocument, most_related_document: Optional[DbDocument]):
    if most_related_document and most_related_document.category_id != document.category_id:
        document.category_id = most_related_document.category_id
        db.commit()
        