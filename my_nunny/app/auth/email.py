from flask import render_template, current_app
from flask_mail import Message
from app import mail # mail instance from app/__init__.py
from threading import Thread # For sending emails asynchronously

def send_async_email(app, msg):
    with app.app_context():
        try:
            mail.send(msg)
        except Exception as e:
            app.logger.error(f"Failed to send email: {e}") # Add logging for email errors


def send_email(subject, sender, recipients, text_body, html_body):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = text_body
    msg.html = html_body

    # Get the actual Flask app instance if current_app is a proxy
    app = current_app._get_current_object()

    # Check if mail is configured, useful for dev environments without email setup
    if not app.config.get('MAIL_SERVER'):
        app.logger.warning("MAIL_SERVER not configured. Email not sent.")
        print(f"Email not sent (MAIL_SERVER not configured):\nTo: {recipients}\nSubject: {subject}\nBody:\n{text_body}") # Print to console for dev
        return

    thread = Thread(target=send_async_email, args=(app, msg))
    thread.start()
    return thread # Optionally return the thread


def send_verification_email(user):
    token = user.get_verification_token()
    # Ensure ADMINS is configured and has at least one email
    sender_email = current_app.config.get('ADMINS',[None])[0] or 'noreply@my-nunny.com' # Fallback sender

    send_email('[My Nunny] Verify Your Email Address',
               sender=sender_email,
               recipients=[user.email],
               text_body=render_template('email/verify_email.txt',
                                         user=user, token=token),
               html_body=render_template('email/verify_email.html',
                                         user=user, token=token))

def send_password_reset_email(user):
    token = user.get_reset_password_token()
    sender_email = current_app.config.get('ADMINS',[None])[0] or 'noreply@my-nunny.com'

    send_email('[My Nunny] Password Reset Request',
               sender=sender_email,
               recipients=[user.email],
               text_body=render_template('email/reset_password.txt',
                                         user=user, token=token),
               html_body=render_template('email/reset_password.html',
                                         user=user, token=token))
