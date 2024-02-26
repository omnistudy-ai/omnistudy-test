# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn, options
from firebase_admin import initialize_app
from Processor import Processor

# initialize_app()
#
#
# @https_fn.on_request()
# def on_request_example(req: https_fn.Request) -> https_fn.Response:
#     return https_fn.Response("Hello world!")

# @https_fn.on_call()
# def process_document(request: Request) -> Response:
#     return "Hello world!"

@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins=[r"firebase\.com$", r"https://flutter\.com"],
        cors_methods=["get", "post"],
    )
)
def say_hello(req: https_fn.Request) -> https_fn.Response:
    # processor = Processor()
    # processor.upload('/Users/jamisongrudem/OmniStudy/test/pyfunctions/CV.pdf',textbook_name='testing_cv')
    return https_fn.Response("Hello world!")