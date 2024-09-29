import React, { useState, useEffect } from 'react';

const InterviewIsle = () => {
  const [question, setQuestion] = useState('');
  const [tag, setTag] = useState('');
  const [userInput, setUserInput] = useState('');
  const [tutorResponse, setTutorResponse] = useState(''); // State for tutor response
  const [isCorrect, setIsCorrect] = useState(false); // State for correctness
  const [questions, setQuestions] = useState([]);
  const [log, setLog] = useState([]); // State for storing log history
  const [showLog, setShowLog] = useState(false); // Toggle for showing/hiding the log

  // Fetch random question logic moved to a reusable function
  const fetchRandomQuestion = (data) => {
    const categories = Object.keys(data);
    const randomCategoryIndex = Math.floor(Math.random() * categories.length);
    const randomCategory = categories[randomCategoryIndex];
    const questionsInCategory = data[randomCategory];
    const randomQuestionIndex = Math.floor(Math.random() * questionsInCategory.length);

    // Set the question and tag
    const selectedQuestion = questionsInCategory[randomQuestionIndex];
    setQuestion(selectedQuestion.yassifiedExample); // Set the question
    setTag(randomCategory); // Set the tag based on the category
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('/data/questions.json'); // Adjust the path as needed
        if (!res.ok) throw new Error('Failed to fetch questions.');
        const data = await res.json();
        setQuestions(data);
        fetchRandomQuestion(data); // Fetch the initial random question
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

        // Check if the question is already logged
        const questionLogged = log.some(entry => entry.question === question);

        // Add the current interaction to the log
        if (!questionLogged) {
          setLog((prevLog) => [
            ...prevLog,
            { question, userInput, tutorResponse: data.response, correct: data.correct },
          ]);
        } else {
          // If the question is already logged, just add the user input and tutor response
          setLog((prevLog) => [
            ...prevLog,
            { userInput, tutorResponse: data.response, correct: data.correct },
          ]);
        }

        // Clear user input after submitting
        setUserInput('');
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

  // Handle fetching a new random question
  const handleNextQuestion = () => {
    fetchRandomQuestion(questions);
    setUserInput(''); // Reset the user's input
    setTutorResponse(''); // Clear the tutor response
    setIsCorrect(false); // Reset correctness
  };

  // Toggle log visibility
  const toggleLog = () => {
    setShowLog(!showLog);
  };
  const bgImgSrc = 'url(/img/wave.webp)'
  const logImg = 'url(/img/log.PNG)'
  console.log(bgImgSrc)
  console.log(logImg)

  return (
    <div
      className="bg-cover overflow-hidden"
      style={{
        backgroundImage: bgImgSrc,
        height: '100vh', // adjust as needed
        backgroundSize: 'auto', // This allows the background to tile
        backgroundRepeat: 'repeat', // Ensures the background tiles
        backgroundPosition: 'top left', // Optional: Adjust position if needed
      }}
    >
      <div className="p-4 relative my-8 mx-auto w-[600px] rounded border-2 border-black bg-white"> {/* Inner content div */}
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
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded-md"
            >
              Submit
            </button>
          </div>
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

        {/* Conditionally render the "Next" button if the answer is correct */}
        {isCorrect && (
          <button
            onClick={handleNextQuestion}
            className="mt-4 bg-green-500 text-white p-2 rounded-md"
          >
            Next Question
          </button>
        )}

        {/* Log Button */}
        <button
          onClick={toggleLog}
          className="fixed bottom-4 right-4 background-white text-black p-2 rounded-md items-center justify-center transition-transform duration-200 hover:translate-y-[-20px]"
        >
          <img src="img/log.PNG" alt="Log" className="w-20 h-20 m-2" />
          User Log
        </button>


        {/* Log Container */}
        {showLog && (
          <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white border-2 border-black w-1/2 max-h-[600px] p-4 rounded-md overflow-y-auto"> {/* Adjust max height to match the interview box */}
              <h2 className="text-xl font-bold mb-4">Interaction Log</h2>
              {log.map((entry, index) => (
                <div key={index} className={`mb-4 ${entry.question ? 'mb-4' : 'mb-0'}`}> {/* Adjust margin based on presence of question */}
                  {entry.question && <p><strong>Question:</strong> {entry.question}</p>} {/* Conditionally render question */}
                  <p><strong>Your Answer:</strong> {entry.userInput}</p>
                  <p><strong>Tutor Response:</strong> {entry.tutorResponse}</p>
                  <p className="text-sm text-gray-500">{entry.correct ? 'Correct!' : 'Incorrect'}</p>
                </div>
              ))}
              <button
                onClick={toggleLog}
                className="mt-4 bg-gray-500 text-white p-2 rounded-md"
              >
                Close Log
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewIsle;
