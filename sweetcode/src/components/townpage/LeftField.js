import React, { useEffect, useState } from 'react'
import Module from './Module'

function LeftField({townNumber}) {
  const [selectedModule, setSelectedModule] = useState(null) // State to manage the selected module for modal
  const [modules, setModules] = useState([]) // State to hold the modules
  const [isModalOpen, setIsModalOpen] = useState(false) // State to manage modal visibility

  // Fetching the modules from the JSON file
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('/data/modules.json')
        const data = await response.json()
        setModules(data) // Set the modules to state
      } catch (error) {
        console.error('Error fetching the modules: ', error)
      }
    }
    fetchModules()
  }, [])

  const handleModuleClick = (module) => {
    setSelectedModule(module) // Set the clicked module's data
    setIsModalOpen(true) // Open the modal
  }

  const closeModal = () => {
    setIsModalOpen(false) // Close the modal
    setSelectedModule(null) // Reset selected module
  }

  console.log("HEE", townNumber)

  console.log("HEE", townNumber)

  return (
    <div className="main h-[688px] font-mono p-6 overflow-y-auto bg-green-50 border-2 border-black">
      <div className="text-sm font-bold mt-4 text-center mx-auto border-black">
        <h2>KNOWLEDGE BANK</h2>
      </div>
      <div className="grid grid-cols-3 gap-4 w-full my-10 px-4">
        {modules.map((module, index) => (
          <Module
            key={index}
            moduleName={module.name}
            moduleID={module.id}
            townNumber={townNumber}
            onClick={() => handleModuleClick(module)}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedModule && (
        <div className="absolute top-0 left-0 w-[580px] h-[87%] bg-white border py-6 px-8 overflow-y-scroll z-50 m-20">
          <button
            onClick={closeModal}
            className="m-4 p-2 border absolute right-0 top-0"
          >
            X
          </button>
          <h2 className="text-xl font-bold my-4 uppercase">
            {selectedModule.name}
          </h2>
          <p>
            <strong>Key Properties:</strong>{' '}
            {selectedModule.description.keyProperties}
          </p>
          <br />
          <p>
            <strong>Example:</strong>{' '}
            {selectedModule.description.yassifiedExample}
          </p>
          <br />
          <p>
            <strong>LeetCode Questions:</strong>
          </p>
          <ul>
            {selectedModule.description.leetcodeQuestions.map(
              (question, index) => (
                <li key={index}>{question}</li>
              )
            )}
          </ul>
          <br />
          <p>
            <strong>Code Example:</strong>
          </p>
          <pre className="bg-gray-100 p-2 rounded">
            <code>{selectedModule.description.codeExample}</code>
          </pre>
          {/* You can add more detailed information from JSON here */}
        </div>
      )}
    </div>
  )
}

export default LeftField
