"""create indexes

Revision ID: 3d81a9a611fd
Revises: 6fa4069d3266
Create Date: 2025-02-14 10:02:26.929452

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3d81a9a611fd'
down_revision: Union[str, None] = '6fa4069d3266'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    # Create GIN index for searching name & email using trigrams
    op.execute("CREATE EXTENSION IF NOT EXISTS pg_trgm;")
    op.execute(
        "CREATE INDEX IF NOT EXISTS leads_name_email_gin_idx "
        "ON leads USING GIN ((name || ' ' || email) gin_trgm_ops);"
    )

    # Index for sorting by name
    op.create_index(
        "leads_name_idx",
        "leads",
        ["name"],
        unique=False,
    )

    # Index for filtering active leads (deleted_at IS NULL)
    op.execute(
        "CREATE INDEX IF NOT EXISTS leads_active_idx "
        "ON leads (id) WHERE deleted_at IS NULL;"
    )

    # Index on company_name in companies table (to speed up joins)
    op.create_index(
        "companies_name_idx",
        "companies",
        ["name"],
        unique=False,
    )


def downgrade():
    # Drop all indexes in reverse order
    op.drop_index("companies_name_idx", table_name="companies")
    op.drop_index("leads_name_idx", table_name="leads")

    op.execute("DROP INDEX CONCURRENTLY IF EXISTS leads_name_email_gin_idx;")
    op.execute("DROP INDEX CONCURRENTLY IF EXISTS leads_active_idx;")
