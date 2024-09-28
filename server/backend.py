from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
import os

load_dotenv() # loading environment variables from .env file
app = Flask(__name__) # creating a Flask app
CORS(app)  # This will enable CORS for all routes
bcrypt = Bcrypt(app)


app.api_key = os.getenv('API_KEY')
app.db_string = os.getenv('DB_STRING')
app.secret_key = os.getenv('FLASK_SECRET_KEY')

print("this is api string ", app.api_key)
print("\nthis is db string ", app.db_string)

def initialize_database():
    try: 
        client = MongoClient(app.db_string)
        db = client.sweetcode 
        users_collection = db.get_collection("users")
        # qna_bank = db.get_collection("qna")
        client.admin.command('ping')
        print("Connected to the database.")
        print("this is users collection ", users_collection)

    except Exception as e:
        print(e)
        return jsonify({"error": "Could not connect to the database."}), 500
    
    return db, users_collection

@app.route('/login', methods=['POST'])
def login():
    _, users_collection = initialize_database()

    if users_collection is None:
        return jsonify({"error": "Database connection failed."}), 500
    # print user collection
    print("type of usercollection",type(users_collection)) 
    
    # getting JSON data from the request
    data = request.get_json()
    print("this is the login details: ", data)
    username = data.get('username')
    password = data.get('password')
    print("this is the username: ", username)
    print("this is the password: ", password)

    # checking if the user already exists
    user = users_collection.find_one({"username": username})

    if user and bcrypt.check_password_hash(user['password'], password):
        print("login successful")
        return jsonify({"message": "Login successful.", "token": username}), 200  # Change status to 200

    else:
        return jsonify({"error": "Wrong username/password."}), 409


@app.route('/createprofile', methods=['POST'])
def create_profile():
    _, users_collection = initialize_database()

    # getting JSON data from the request
    data = request.get_json()
    print("this is data ", data)
    nickname = data.get('nickname')
    username = data.get('username')
    password = data.get('password')

    # checking if the user already exists
    user = users_collection.find_one({"username": username})

    if user:
        return jsonify({"error": "User already exists."}), 409  # Conflict status code
    else:
        # hashing password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        # inserting new user into database
        users_collection.insert_one({"nickname": nickname, "username": username, "password": hashed_password})
        return jsonify({"message": "Profile created.", "token": username}), 200   # Created status code


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)