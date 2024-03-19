"""update pgvector support

Revision ID: a99bbd095fa9
Revises: 26f86eafd52d
Create Date: 2024-03-19 15:13:29.042000

"""
from alembic import op
import sqlalchemy as sa

import pgvector


# revision identifiers, used by Alembic.
revision = 'a99bbd095fa9'
down_revision = '26f86eafd52d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('document', sa.Column('nlp_result', pgvector.sqlalchemy.Vector(dim=1024), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('document', 'nlp_result')
    # ### end Alembic commands ###