"""create leads table

Revision ID: 6fa4069d3266
Revises: f8f981961345
Create Date: 2025-02-13 22:07:45.610769

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6fa4069d3266'
down_revision: Union[str, None] = 'f8f981961345'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'leads',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(255), nullable=False),
        sa.Column('email', sa.String(255), nullable=False),
        sa.Column('company_id', sa.Integer, sa.ForeignKey(
            'companies.id'), nullable=False),
        sa.Column('engaged', sa.Boolean, default=False),
        sa.Column('stage', sa.Enum('PROSPECT', 'ENGAGED', 'NEGOTIATION',
                  'COMMITTED', 'CLOSED', name='stage'), nullable=False),
        sa.Column('last_contacted_at', sa.DateTime(
            timezone=True), nullable=True),

        sa.Column('created_by', sa.Integer, sa.ForeignKey(
            'users.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False,
                  server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False,
                  server_default=sa.func.now()),
        sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
    )

    # Faster joins with companies table
    op.create_index('idx_leads_company_id', 'leads', ['company_id'])
    # For filtering purposes
    op.create_index('idx_leads_stage', 'leads', ['stage'])
    op.create_index('idx_leads_last_contacted_at',
                    'leads', ['last_contacted_at'])
    op.create_index('idx_leads_engaged_stage', 'leads', ['engaged', 'stage'])


def downgrade() -> None:
    op.drop_table('leads')
    op.drop_index('idx_leads_engaged_stage', table_name='leads')
    op.drop_index('idx_leads_last_contacted_at', table_name='leads')
    op.drop_index('idx_leads_stage', table_name='leads')
    op.drop_index('idx_leads_company_id', table_name='leads')
