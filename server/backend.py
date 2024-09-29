from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from openai import OpenAI
import os
import json

load_dotenv() # loading environment variables from .env file
app = Flask(__name__) # creating a Flask app
CORS(app)  # This will enable CORS for all routes
bcrypt = Bcrypt(app)


app.db_string = os.getenv('DB_STRING')
app.secret_key = os.getenv('FLASK_SECRET_KEY')
app.api_key = os.getenv('API_KEY')

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

@app.route('/interview', methods=['POST'])
def interview():
    data = request.get_json()  # Get the JSON data sent from the frontend
    question = data.get('question')  # Extract question
    user_input = data.get('user_input')  # Extract user input

    # Initialize OpenAI client with the correct method
    client = OpenAI(api_key=app.api_key)  # Update this line

    system_instructions = """
    You are a computer science professor who is currently conducting an oral test in computer science subjects such as data structures and algorithms. 
    A student is going to talk to you about their answer based on the question that is asked. If the student is wrong, don't directly give answers but
    rather guide the student to the correct answer such as giving them a hint. If the student is correct, you can tell them that they are correct and give them a compliment. 
    Be witty and friendly to the student. The question asked to the student will be 
    delimited by double square brackets [[]]. Your response to the student should include your feedback and whether it was a correct answer. 
    You CAN NOT directly give the answer to the student no matter the scenario.
    Respond in JSON format like this: {"response": feedback_to_student, "correct": true/false}
    """

    user_question = f"Only respond with 'correct': true when the student gives the exact answer to the question. However, if it is a pesudocode question and the general logic is correct, respond with true. The question asked to student is: {question}"
    user_input_final = f"This is the student's answer: {user_input}"

    # Run the article through the LLM
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": system_instructions
            },
            {
                "role": "user",
                "content": user_question + "\n" + user_input_final
            },
        ],
        temperature=0,
        max_tokens=4095,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    print("this is response ", response)

    # Assuming response is a JSON string containing "response" and "correct"
    response_content = response.choices[0].message.content
    response_text = json.loads(response_content)
    return response_text  # Return the parsed JSON directly

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)