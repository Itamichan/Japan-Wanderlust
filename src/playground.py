# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

SENDGRID_API_KEY="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"

message = Mail(
    from_email='offers@japanwanderlust.com',
    to_emails='cristinagarbuz@gmail.com',
    subject='test sendgrid',
    html_content='<strong>and easy to do anywhere, even with Python</strong>')
try:
    sg = SendGridAPIClient(SENDGRID_API_KEY)
    response = sg.send(message)
    print(response.status_code)
    print(response.body)
    print(response.headers)
except Exception as e:
    print(e.message)