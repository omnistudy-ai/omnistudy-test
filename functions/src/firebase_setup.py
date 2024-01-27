import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import firestore, credentials

def initialize_firebase_app():
    dotenv_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..','..', 'client', '.env')
    load_dotenv(dotenv_path)
    firebase_credentials = {
        "type": "service_account",
        "project_id": os.getenv("REACT_APP_FIREBASE_PROJECT_ID"),
        "private_key_id": os.getenv("REACT_APP_FIREBASE_PRIVATE_KEY_ID"),
        "private_key": os.getenv("REACT_APP_FIREBASE_PRIVATE_KEY").replace("\\n", "\n"),
        "client_email": os.getenv("REACT_APP_FIREBASE_CLIENT_EMAIL"),
        "client_id": os.getenv("REACT_APP_FIREBASE_CLIENT_ID"),
        "auth_uri": os.getenv("REACT_APP_FIREBASE_AUTH_URI"),
        "token_uri": os.getenv("REACT_APP_FIREBASE_TOKEN_URI"),
        "auth_provider_x509_cert_url": os.getenv("REACT_APP_FIREBASE_AUTH_PROVIDER_CERT_URL"),
        "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_CERT_URL"),
    }
    #Authenticate access
    cred = credentials.Certificate(firebase_credentials)
    return firebase_admin.initialize_app(cred)
