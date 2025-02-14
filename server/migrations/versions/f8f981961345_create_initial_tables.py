"""create initial tables

Revision ID: f8f981961345
Revises: 
Create Date: 2025-02-13 22:07:21.580327

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f8f981961345'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(255), nullable=False),
        sa.Column('email', sa.String(255), nullable=False),
        sa.Column('password', sa.String(255), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True),
                  nullable=False, server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True),
                  nullable=False, server_default=sa.func.now()),
        sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index('ix_users_email', 'users', ['email'], unique=True)

    op.create_table(
        'companies',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(255), nullable=False),
    )


def downgrade() -> None:
    op.drop_table('users')
    op.drop_table('companies')
