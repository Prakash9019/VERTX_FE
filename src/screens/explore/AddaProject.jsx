"use client"

import React, { useState, useEffect } from "react"
import { Header, Sidebar } from "../layout/bars"

export default function FinancialModeling() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showNewInput, setShowNewInput] = useState(false)
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 relative">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className={`flex-1 flex items-center justify-center transition-all duration-300 ${sidebarOpen ? 'ml-64' : '-ml-20'}`}>
          <div className="max-w-4xl w-full px-4">
            <h1 className="text-4xl font-bold mb-2">Showcase your project</h1>
            <p className="text-xl text-gray-400 mb-8">What have you built so far?</p>
            
            <div className="bg-[#151515] rounded-3xl p-12 shadow-xl border border-white-600 w-full">
              <div className="flex flex-col items-start">
                <h2 className="text-2xl font-bold mb-6">Projects</h2>
                <div className="flex justify-center items-center w-full min-h-[200px]">
                  <button 
                    className="bg-black rounded-full px-6 py-3 border border-gray-600 text-white hover:bg-gray-800 transition-colors -mt-15"
                    onClick={() => setShowModal(true)}
                  >
                    Add Project
                  </button>
                </div>
              </div>
            </div>
            <div className="flex mt-6 space-x-4">
              <button className="bg-[#1D1C1C] text-white font-bold py-3 px-12 rounded-[10px] text-lg border border-gray-600">
                Back
              </button>
              <button className="bg-white text-black font-bold py-3 px-12 rounded-[10px] text-lg">
                Continue
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Modal overlay with transparent blur effect */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-[#111111] opacity-90"
            onClick={() => setShowModal(false)}
          ></div>
          
          <div className="bg-black z-10 rounded-3xl p-8 w-full max-w-xl border border-gray-600 shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Create a project</h2>
            
            <div className="mb-8 flex flex-col space-y-4">
              <input 
                type="text" 
                placeholder="Start typing your project name.." 
                className="w-full bg-[#1D1C1C] text-white rounded-xl py-3 px-4 border border-gray-600 focus:outline-none focus:border-white" 
              />
              
              {/* Permanent "Stealth Project" input with plus button */}
              <div className="w-full bg-black text-white rounded-xl py-3 px-4 border border-gray-600 flex justify-between items-center">
  <span>Stealth Project</span>
  <button 
    className="text-2xl"
    onClick={() => setShowNewInput(!showNewInput)}
  >
    +
  </button>
</div>

              
              {/* New input field that appears when + is clicked */}
              {showNewInput && (
                <input 
                  type="text" 
                  placeholder="Create New : Start typing" 
                  className="w-full bg-[#1D1C1C] text-white rounded-xl py-3 px-4 border border-gray-600 focus:outline-none focus:border-white" 
                />
              )}
              
              <input 
                type="text" 
                placeholder="Describe your idea in few words.." 
                className="w-full bg-[#1D1C1C] text-white rounded-xl py-3 px-4 border border-gray-600 focus:outline-none focus:border-white" 
              />
              
              <input 
                type="text" 
                placeholder="Provide your project link" 
                className="w-full bg-[#1D1C1C] text-white rounded-xl py-3 px-4 border border-gray-600 focus:outline-none focus:border-white" 
              />
              
              <input 
                type="text" 
                placeholder="Pitch your idea in more detail.." 
                className="w-full bg-[#1D1C1C] text-white rounded-xl py-3 px-4 border border-gray-600 focus:outline-none focus:border-white" 
              />
            </div>
            
            <div className="flex justify-between mt-12">

              <button className="bg-white text-black font-bold py-3 px-12 rounded-[10px] text-lg">
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}