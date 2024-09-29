import React, { useState, useEffect } from 'react';

const InterviewIsle = () => {
  const [question, setQuestion] = useState('');
  const [tag, setTag] = useState('');
  const [userInput, setUserInput] = useState('');
  const [tutorResponse, setTutorResponse] = useState(''); // State for tutor response
  const [isCorrect, setIsCorrect] = useState(false); // State for correctness
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('/data/questions.json'); // Adjust the path as needed
        if (!res.ok) throw new Error('Failed to fetch questions.');
        const data = await res.json();
        setQuestions(data);

        // Randomly select a category and then a question from that category
        const categories = Object.keys(data);
        const randomCategoryIndex = Math.floor(Math.random() * categories.length);
        const randomCategory = categories[randomCategoryIndex];
        const questionsInCategory = data[randomCategory];
        const randomQuestionIndex = Math.floor(Math.random() * questionsInCategory.length);
        
        // Set the question and tag
        const selectedQuestion = questionsInCategory[randomQuestionIndex];
        setQuestion(selectedQuestion.yassifiedExample); // Set the question
        setTag(randomCategory); // Set the tag based on the category
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []); // Run once on component mount

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, user_input: userInput }), // Pass question and user input
      });

      if (res.ok) {
        const data = await res.json();
        setTutorResponse(data.response); // Set the tutor response
        setIsCorrect(data.correct); // Set correctness
      } else {
        setTutorResponse('Error: Could not fetch response from server.');
        setIsCorrect(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setTutorResponse('Error: Something went wrong.');
      setIsCorrect(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Interview Isle</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            Question
            {tag && (
              <span className="ml-2 px-2 py-1 text-sm text-white bg-blue-500 rounded-full">
                {tag}
              </span>
            )}
          </label>
          {/* Display the question as bold text */}
          <p className="mt-1 p-2 font-bold">
            {question}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="userInput">
            Your Answer
          </label>
          <textarea
            id="userInput"
            value={userInput}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full h-24"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded-md"
        >
          Submit
        </button>
      </form>
      
      {/* Tutor Response Box */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="TutorResponse">
          Tutor Response
        </label>
        <textarea
          id="TutorResponse"
          value={tutorResponse}
          readOnly // Make the response textarea read-only
          className="mt-1 p-2 border border-gray-300 rounded-md w-full h-24 bg-gray-100"
        />
        <p className="mt-2 text-sm text-gray-500">
          {isCorrect ? "Your answer was correct!" : "Keep trying!"}
        </p>
      </div>
    </div>
  );
};

export default InterviewIsle;
