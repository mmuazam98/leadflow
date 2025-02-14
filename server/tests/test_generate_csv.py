import pytest
import csv
from datetime import datetime
from io import StringIO
from app.utils.generate_csv import generate_csv
from app.schemas.lead import LeadResponse


def test_generate_csv_empty_list():
    """Test that an empty lead list returns only the CSV header."""
    expected_csv = "ID,Name,Email,Company Name,Engaged,Stage,Last Contacted At\n"
    assert generate_csv([]) == expected_csv


def test_generate_csv_single_lead():
    """Test CSV generation with a single lead."""
    lead = LeadResponse(
        id=1,
        name="John Doe",
        email="john@example.com",
        company_name="Example Corp",
        company_id=1,
        engaged=True,
        stage="PROSPECT",
        last_contacted_at=datetime(2024, 2, 14, 10, 30, 0)
    )

    csv_output = generate_csv([lead])
    reader = csv.reader(StringIO(csv_output))

    rows = list(reader)
    assert rows[0] == ["ID", "Name", "Email", "Company Name",
                       "Engaged", "Stage", "Last Contacted At"]
    assert rows[1] == ["1", "John Doe", "john@example.com",
                       "Example Corp", "True", "PROSPECT", "2024-02-14 10:30:00"]


def test_generate_csv_multiple_leads():
    """Test CSV generation with multiple leads."""
    leads = [
        LeadResponse(
            id=1,
            name="John Doe",
            email="john@example.com",
            company_name="Example Corp",
            company_id=1,
            engaged=True,
            stage="PROSPECT",
            last_contacted_at=datetime(2024, 2, 14, 10, 30, 0)
        ),
        LeadResponse(
            id=2,
            name="Jane Smith",
            email="jane@example.com",
            company_id=0,
            company_name="",  # Testing empty company name
            engaged=False,
            stage="PROSPECT",
            last_contacted_at=None  # Testing None value for last_contacted_at
        ),
    ]

    csv_output = generate_csv(leads)
    reader = csv.reader(StringIO(csv_output))

    rows = list(reader)
    assert rows[0] == ["ID", "Name", "Email", "Company Name",
                       "Engaged", "Stage", "Last Contacted At"]
    assert rows[1] == ["1", "John Doe", "john@example.com",
                       "Example Corp", "True", "PROSPECT", "2024-02-14 10:30:00"]
    assert rows[2] == ["2", "Jane Smith",
                       "jane@example.com", "", "False", "PROSPECT", ""]


def test_generate_csv_handles_exceptions():
    """Ensure generate_csv does not raise exceptions for missing fields."""
    lead = LeadResponse(
        id=1,
        name="John Doe",
        email="john@example.com",
        company_id=0,
        company_name="",  # No company name
        engaged=True,
        stage="PROSPECT",
        last_contacted_at=None  # No last contacted date
    )

    try:
        csv_output = generate_csv([lead])
        assert csv_output is not None
    except Exception as e:
        pytest.fail(f"generate_csv raised an exception: {e}")
