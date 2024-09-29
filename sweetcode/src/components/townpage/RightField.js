import React, { useEffect, useState } from 'react'
import Question from './Question' // Import the Question component
import HintBit from './HintBit'
import QuestionBank from './QuestionBank' // Import the QuestionBank component

function RightField({townNumber}) {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [randomVillagerName, setRandomVillagerName] = useState('') // State to hold the random villager name

  const villagerNames = [
    'BUBBLES THE BUNNY',
    'MELVIN THE MOOSE',
    'FELICITY THE FOX',
    'NEDDY THE NARWHAL',
    'PIPPIN THE PENGUIN',
    'SILLY SAMMY THE SLOTH',
    'LUCY THE LEMUR',
    'DIZZY THE DOLPHIN',
    'GIGGLES THE GIRAFFE',
    'WOBBLES THE WOMBAT',
  ]

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/data/townQuestions.json') // Fetch data from the JSON file
        const data = await response.json()
        setQuestions(data.townQuestions)
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }

    fetchQuestions()
    // Set initial random villager name when the component mounts
    setRandomVillagerName(getRandomName())
  }, []) // Empty dependency array ensures this runs only once on mount

  const getRandomName = () => {
    const randomIndex = Math.floor(Math.random() * villagerNames.length)
    return villagerNames[randomIndex]
  }

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length) // Loop back to start if at the end
    setRandomVillagerName(getRandomName()) // Generate a new random villager name for the new question
    setShowHint(false) // Reset hint visibility when moving to the next question
  }

  const [showHint, setShowHint] = useState(false) // State to control hint visibility

  const toggleHint = () => {
    setShowHint((prev) => !prev) // Toggle the hint visibility
  }

  const bgImgSrc = 'url(/img/bgs/' + townNumber + '.PNG)'
  console.log(bgImgSrc)

  return (

    <div className="ml-2 border-black border-2 bg-cover overflow-hidden" style={{
      backgroundImage: bgImgSrc,
      height: '90vh', // adjust as needed
      backgroundSize: 'cover',
    }}>
      <QuestionBank
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        townNumber={townNumber}
        onNext={handleNextQuestion}
        randomVillagerName={randomVillagerName} // Pass the random villager name to QuestionBank
      />
      <HintBit
        hint={questions[currentQuestionIndex]?.hint}
        townNumber={townNumber}
        onToggleHint={toggleHint}
        showHint={showHint}
      />
    </div>
  )
}

export default RightField
