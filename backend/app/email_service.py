import os
import resend
from dotenv import load_dotenv

load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")


def send_otp_email(email: str, otp: str):
    return resend.Emails.send({
        "from": "onboarding@resend.dev",
        "to": email,
        "subject": "Your verification code",
        "html": f"""
            <div>
                <h2>Verify your email</h2>

                <p>Your verification code is:</p>

                <h1>{otp}</h1>

                <p>This code expires in 5 minutes.</p>

                <p>If you didn't request this code, you can ignore this email.</p>
            </div>
        """
    })