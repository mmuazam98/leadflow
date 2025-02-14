import csv
import io
from app.schemas.lead import LeadResponse


def generate_csv(leads: list[LeadResponse]) -> str:
    output = io.StringIO()
    writer = csv.writer(output)

    # Write CSV header
    writer.writerow(["ID", "Name", "Email", "Company Name", "Engaged", "Stage",
                    "Last Contacted At"])

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

    output.seek(0)
    return output.getvalue()
