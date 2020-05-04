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
                <a href="http://www.japanwanderlust.com/" rel='noreferrer noopener'
                   target="_blank">Go to the website</a>
            </button>
        </div>""")
    _send_email(message)


def offer_email(to_email):
    message = Mail(
        from_email='offer@japanwanderlust.com',
        to_emails=to_email,
        subject='Your trip offer',
        html_content="""
         <div>
                <p> Hey!</p>
                <h1>Your offer is here!</h1>

                <p>Please find your tailor made trip based on your chosen attractions.</p>

                <h2>Trip to Tokyo</h2>
                <p>
                    <b>
                        Trip for one week!
                    </b>
                </p>
                <p>
                    <ul>
                        <li>Tokyo Imperial Palace</li>
                        <li>Ghibli Museum</li>
                        <li>Todori Park</li>
                        <li>Rikugien</li>
                        <li>Senzoji Temple</li>
                    </ul>
                </p>
                <p>
                    <b>
                        Price: 3000YEN
                        Not guided.
                        Travel alone.
                    </b>
                </p>
                <p>
                    <h3>Sounds perfect?</h3>
                    <b>
                       Contact DreamTravel company now! 
                    </b>
                </p>
                <p>
                    Contact information:
                    <ul>
                        <li>Tel: +2454864786</li>
                        <li>email: dreamtravel@gmail.com</li>
                    </ul>
                </p>
            </div>""")
    _send_email(message)



