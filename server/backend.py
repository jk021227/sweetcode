from flask import Flask, request, jsonify, flash, redirect, url_for
from flask_cors import CORS
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
import os



load_dotenv() # loading environment variables from .env file
app = Flask(__name__) # creating a Flask app
CORS(app)  # This will enable CORS for all routes
bcrypt = Bcrypt(app)
auth0_domain = 'YOUR_AUTH0_DOMAIN'
auth0_client_id = 'YOUR_CLIENT_ID'
auth0_client_secret = 'YOUR_CLIENT_SECRET'


app.api_key = os.getenv('API_KEY')
app.db_string = os.getenv('DB_STRING')

print("this is api string ", app.api_key)
print("\nthis is db string ", app.db_string)


@app.route('/members')
def members():
    return {"members": ["JK", "PW"]}

def initialize_database():
    try: 
        client = MongoClient(app.db_string)
        db = client.sweetcode
        users_collection = db.get_collection("users")
        client.admin.command('ping')

    except Exception as e:
        print(e)
        return jsonify({"error": "Could not connect to the database."}), 500
    
    return db, users_collection

@app.route('/createprofile', methods=['POST'])
def create_profile():
    _, users_collection = initialize_database()

    # getting JSON data from the request
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')


    # checking if the user already exists
    user = users_collection.find_one({"username": username})

    if user:
        flash("Username already exists.")
        return jsonify({"error": "Username already exists."}), 409  # Conflict status code
    else:
        # hashing password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        # inserting new user into database
        users_collection.insert_one({"username": username, "password": hashed_password})
        flash("Profile created successfully.", "profile_created")
        return jsonify({"message": "Profile created successfully."}), 201  # Created status code


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)