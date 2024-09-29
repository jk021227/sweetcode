import React, { useState } from 'react'

function Question({ question, onNext }) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const handleOptionClick = (option) => {
    setSelectedOption(option)
    setShowAnswer(true)
  }

  const handleNextClick = () => {
    setSelectedOption(null) // Reset selected option
    setShowAnswer(false) // Reset show answer state
    onNext() // Call the onNext function to go to the next question
  }

  return (
    <div>
      <h3 className="text-m font-bold leading-tight my-4">
        {question.question}
      </h3>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`block w-full border-1 border-black p-2 rounded ${
              showAnswer
                ? option === question.correctAnswer
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-white'
            }`}
            disabled={showAnswer}
          >
            {option}
          </button>
        ))}
      </div>
      {showAnswer && (
        <div className="mt-4 flex justify-between">
          <p className="">
            {selectedOption === question.correctAnswer
              ? 'Correct!'
              : 'Wrong answer. Try again!'}
          </p>
          <button
            onClick={handleNextClick} // Update the button click handler
            className="underline"
          >
            Next Question →
          </button>
        </div>
      )}
    </div>
  )
}

export default Question
