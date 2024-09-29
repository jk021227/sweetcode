// src/components/QuestionBank.js
import React from 'react'
import Question from './Question' // Import the Question component

function QuestionBank({
  questions,
  currentQuestionIndex,
  onNext,
  randomVillagerName,
}) {
  return (
    <div className="">
      <div className="m-4 p-2 border-2 border-black bg-amber-950">
        <div className="p-4 border-1 border-black bg-white">
          <div className="flex justify-between">
            <p className="text-xs">{randomVillagerName} ASKED: </p>
            <p className="text-xs"> VILLAGER BULLETIN</p>
          </div>

          {questions.length > 0 ? (
            <Question
              question={questions[currentQuestionIndex]}
              onNext={onNext}
            />
          ) : (
            <p>Loading questions...</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuestionBank
