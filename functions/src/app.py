from flask import Flask, request, jsonify
from firebase_admin import firestore
from firebase_setup import initialize_firebase_app
#AI folder
from AI.AI_QA import QA

app = Flask(__name__)

# Initialize Firebase
default_app = initialize_firebase_app()

# Initialize Firestore
db = firestore.client()

#Add logic to not keep initializing while user is on the same page
#Add logic to grab the user namespace from firestore and input that to AI
@app.route('/api/endpoint', methods=['POST'])
def context_QA():
    query = request.json.get('inputData')
    model = QA
    model.init_QA
    output = model.run(query)
    answer = output[0]
    return jsonify({'message': answer})

if __name__ == '__main__':
    app.run(debug=True)
