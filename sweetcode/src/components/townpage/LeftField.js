import React, { useEffect, useState } from 'react'
import Module from './Module'

function LeftField() {
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

  return (
    <div className="main h-full font-mono">
      <div className="grid grid-cols-3 p-12 bg-green-50 gap-5 w-full">
        {modules.map((module, index) => (
          <Module
            key={index}
            moduleName={module.name}
            moduleID={module.id}
            onClick={() => handleModuleClick(module)}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedModule && (
        <div className="absolute top-0 left-0 w-[550px] h-{90%} bg-white border p-6 overflow-y-scroll z-50 m-20">
          <button
            onClick={closeModal}
            className="mt-4 p-2 bg-green-500 text-white"
          >
            Back
          </button>
          <h2 className="text-xl font-bold my-6">{selectedModule.name}</h2>
          <p>{selectedModule.description.keyProperties}</p>
          <br></br>
          <p>{selectedModule.description.yassifiedExample}</p>

          {/* You can add more detailed information from JSON here */}
        </div>
      )}
    </div>
  )
}

export default LeftField
