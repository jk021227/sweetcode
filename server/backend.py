from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os



load_dotenv() # loading environment variables from .env file
app = Flask(__name__) # creating a Flask app
CORS(app, resources={r"/members": {"origins": "http://localhost:3000"}})  # This will enable CORS for all routes


app.api_key = os.getenv('API_KEY')
app.db_string = os.getenv('DB_STRING')

print("this is api string ", app.api_key)
print("\nthis is db string ", app.db_string)


@app.route('/members')
def members():
    return {"members": ["JK", "PW"]}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)