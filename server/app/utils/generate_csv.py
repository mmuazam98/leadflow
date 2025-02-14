import csv
import io
from app.schemas.lead import LeadResponse
from typing import List


def generate_csv(leads: List[LeadResponse]) -> str:
    """Generate a CSV string from a list of LeadResponse objects."""
    if not leads:
        return "ID,Name,Email,Company Name,Engaged,Stage,Last Contacted At\n"

    output = io.StringIO()
    writer = csv.writer(output)

    # Write CSV header
    writer.writerow(["ID", "Name", "Email", "Company Name",
                    "Engaged", "Stage", "Last Contacted At"])

    try:
        for lead in leads:
            writer.writerow([
                lead.id,
                lead.name,
                lead.email,
                lead.company_name or "",
                lead.engaged,
                lead.stage,
                lead.last_contacted_at.strftime(
                    "%Y-%m-%d %H:%M:%S") if lead.last_contacted_at else "",
            ])
    except Exception as e:
        raise ValueError(f"Error generating CSV: {str(e)}")

    output.seek(0)
    return output.getvalue()
