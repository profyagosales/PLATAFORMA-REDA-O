import os
from pathlib import Path
from string import Template

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

TEMPLATE_DIR = Path(__file__).resolve().parents[2] / "templates" / "emails"


def render_template(template_name: str, context: dict | None = None) -> str:
    """Load an HTML template and apply the given context."""
    context = context or {}
    template_path = TEMPLATE_DIR / template_name
    with open(template_path, "r", encoding="utf-8") as f:
        template = Template(f.read())
    return template.safe_substitute(context)


def send_email(to_email: str, subject: str, template_name: str, context: dict | None = None) -> None:
    """Send an email using SendGrid with an HTML template."""
    api_key = os.environ.get("SENDGRID_API_KEY")
    from_email = os.environ.get("EMAIL_FROM")
    if not api_key or not from_email:
        raise EnvironmentError("Missing SENDGRID_API_KEY or EMAIL_FROM")

    html_content = render_template(template_name, context)
    message = Mail(from_email=from_email, to_emails=to_email, subject=subject, html_content=html_content)

    sg = SendGridAPIClient(api_key)
    sg.send(message)
