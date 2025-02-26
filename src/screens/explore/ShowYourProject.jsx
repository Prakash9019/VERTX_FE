"use client"

import React, { useState, useEffect } from "react"
import { Header, Sidebar } from "../layout/bars"
import { useNavigate } from "react-router"

export default function ShowYourProject() {
    const navigate=useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 relative">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className={`flex-1 flex items-center justify-center transition-all duration-300 ${sidebarOpen ? 'ml-64' : '-ml-20'}`}>
          <div className="max-w-4xl w-full px-4">
            <h1 className="text-4xl font-bold mb-2 pt-16">Showcase your project</h1>
            <p className="text-xl text-gray-400 mb-6">What have you built so far?</p>
            
            <div className="bg-[#151515] rounded-3xl p-6 shadow-xl border border-[#1D1C1C] w-full">
              <div className="flex flex-col items-start">
                <div className="flex justify-between items-center w-full mb-4">
                  <h2 className="text-2xl font-bold">Projects</h2>
                  <button className="flex items-center text-[#757575]">
                    <span className="text-2xl mr-1">+</span> Add Project
                  </button>
                </div>
                
                <div className="flex justify-between items-center w-full mb-4">
                  <div className="text-[#CAC5C5] text-[25px] font-extrabold">Stealth Project</div>
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 rounded-[4px] bg-[#1D1C1C]">Cancel</button>
                    <button className="bg-white text-black px-4 py-2 rounded-lg">Save</button>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 w-full mb-5">
                  <div className="bg-[#1D1C1C] w-16 h-16 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium">Project name</h3>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Stealth project" 
                      className="w-full bg-transparent border-none outline-none text-gray-400 pb-2"
                    />
                    <div className="w-full h-[1px] bg-[#1D1C1C]"></div>
                  </div>
                </div>
                
                <div className="w-full mb-5">
                  <div className="flex items-center">
                    <div className="invisible w-16 h-4 mr-4"></div>
                    <h3 className="text-lg font-medium">Idea description</h3>
                  </div>
                  <div className="flex">
                    <div className="invisible w-16 h-4 mr-4"></div>
                    <div className="flex-1">
                      <input 
                        type="text" 
                        placeholder="Describe your idea in few words..." 
                        className="w-full bg-transparent border-none outline-none text-gray-400 pb-2"
                      />
                      <div className="w-full h-[1px] bg-[#1D1C1C]"></div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full mb-5">
                  <div className="flex items-center">
                    <div className="invisible w-16 h-4 mr-4"></div>
                    <h3 className="text-lg font-medium">Link</h3>
                  </div>
                  <div className="flex">
                    <div className="invisible w-16 h-4 mr-4"></div>
                    <div className="flex-1">
                      <input 
                        type="text" 
                        placeholder="https://yourproject.com/" 
                        className="w-full bg-transparent border-none outline-none text-gray-400 pb-2"
                      />
                      <div className="w-full h-[1px] bg-[#1D1C1C]"></div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full mb-5">
                  <div className="flex items-center">
                    <div className="invisible w-16 h-4 mr-4"></div>
                    <h3 className="text-lg font-medium">Pitch</h3>
                  </div>
                  <div className="flex">
                    <div className="invisible w-16 h-4 mr-4"></div>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Pitch your idea in more detail..." 
                        className="w-full bg-transparent border-none outline-none text-gray-400 pb-2"
                      />
                      <div className="w-full h-[1px] bg-[#1D1C1C]"></div>
                      <div className="absolute right-0 bottom-2">
                        <svg width="16" height="35" viewBox="0 0 16 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.59625 28.4953L4.43115 25.3302H10.7613L7.59625 28.4953Z" fill="#757575"/>
                          <path d="M7.99984 5.24999L10.9165 8.16666H5.08317L7.99984 5.24999Z" fill="#757575"/>
                          <rect x="5" y="11" width="6" height="12" fill="#757575"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full mb-4">
                  <div className="flex items-center">
                    <div className="invisible w-16 h-4 mr-4"></div>
                    <h3 className="text-lg font-medium">Stage</h3>
                  </div>
                  <div className="flex">
                    <div className="invisible w-16 h-4 mr-4"></div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-3 mt-2">
                        <div className="bg-[#1D1C1C] rounded-full px-4 py-2 border-[0.5px] text-[#757575] border-[#757575]">
                          Idea
                        </div>
                        <div className="bg-transparent rounded-full px-4 py-2 border-[0.5px] text-[#757575] border-[#757575]">
                          Prototype
                        </div>
                        <div className="bg-transparent rounded-full px-4 py-2 border-[0.5px] text-[#757575] border-[#757575]">
                          Revenue
                        </div>
                        <div className="bg-transparent rounded-full px-4 py-2 border-[0.5px] text-[#757575] border-[#757575]">
                          Scale
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full">
                  <div className="flex items-center">
                    <div className="invisible w-16 h-4 mr-4"></div>
                    <h3 className="text-lg font-medium">Workplace</h3>
                  </div>
                  <div className="flex">
                    <div className="invisible w-16 h-4 mr-4"></div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-3 mt-2">
                        <div className="bg-transparent rounded-full px-4 py-2 border-[0.5px] text-[#757575] border-[#757575]">
                          Remote
                        </div>
                        <div className="bg-transparent rounded-full px-4 py-2 border-[0.5px] text-[#757575] border-[#757575]">
                          Hybrid
                        </div>
                        <div className="bg-transparent rounded-full px-4 py-2 border-[0.5px] text-[#757575] border-[#757575]">
                          Office
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex mt-6 space-x-4">
              <button className="bg-[#1D1C1C] text-white font-bold py-3 px-12 rounded-[10px] text-lg border border-gray-600">
                Back
              </button>
              <button className="bg-white text-black font-bold py-3 px-12 rounded-[10px] text-lg" onClick={()=> navigate("/bio")}>
                Continue
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}