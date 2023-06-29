import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(sender_email, sender_password, reciever_email, subject, message):
    # Create a multipart message container
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = reciever_email
    msg['Subject'] = subject

    # Attach the message to the email
    body = MIMEText(message, 'plain')
    msg.attach(body)

    try:
        # Connect to the SMTP server (Gmail server in this case)
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()

        # Login to the sender's Gmail account
        server.login(sender_email, sender_password)

        # Send the email
        server.sendmail(sender_email, reciever_email, msg.as_string())

        # Close the connection
        server.quit()

        print("Email sent successfully!")
    except smtplib.SMTPException as e:
        print("Error occurred while sending the email:", e)

# Example usage:
sender_email = 'Email_id'
sender_password = 'password'
reciever_email = 'Reciever_email'
subject = 'Rasyog website permission'
message = 'Hi user, you can now access rasyog your email and password are....'

send_email(sender_email, sender_password, reciever_email, subject, message)