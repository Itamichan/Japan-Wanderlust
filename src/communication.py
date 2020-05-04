# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

SENDGRID_API_KEY = os.environ.get("SENDGRID_API_KEY")


def _send_email(message):
    try:
        if not SENDGRID_API_KEY:
            raise EnvironmentError("SENDGRID_API_KEY is not defined")

        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        if response.status_code != 202:
            print(response.status_code)
            print(response.body)
    except Exception as e:
        print(e)


def welcome_email(to_email):
    message = Mail(
        from_email='welcome@japanwanderlust.com',
        to_emails=to_email,
        subject='Welcome to Japan Wanderlust',
        html_content="""
        <div>
            <img src="https://japan-wanderlust.s3.eu-north-1.amazonaws.com/static/images/readme/logo-readme.png" 
            alt="JapanWanderlust logo"/>
            <h1>
                <b>Welcome to JapanWanderlust!</b>
            </h1>
            <p>
                Start creating your Dream Trip Now!
            </p>
            <button>
                <a href="https://github.com/Itamichan/Japan-Wanderlust" rel='noreferrer noopener'
                   target="_blank">Go to the website</a>
            </button>
        </div>""")
    _send_email(message)


def offer_email(to_email):
    message = Mail(
        from_email='offer@japanwanderlust.com',
        to_emails=to_email,
        subject='Your trip offer',
        html_content='<strong>Offer body</strong>')
    _send_email(message)



