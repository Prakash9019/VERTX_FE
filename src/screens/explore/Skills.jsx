"use client"

import React, { useState, useEffect } from "react"
import { Header, Sidebar } from "../layout/bars"
import { useNavigate } from "react-router"

export default function Skills() {
  const navigate=useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 relative">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className={`flex-1 flex items-center justify-center transition-all duration-300 ${sidebarOpen ? 'ml-64' : '-ml-20'}`}>
          <div className="max-w-4xl w-full px-4">
            <h1 className="text-4xl font-bold mb-2">Skills to survive</h1>
            <p className="text-xl text-gray-400 mb-8">Tell me about your background</p>
            
            <div className="bg-[#151515] rounded-3xl p-12 shadow-xl border border-white-600 w-full">
              <div className="flex flex-col items-start">
                <h2 className="text-2xl font-bold mb-6">Achievement</h2>
                <div className="relative w-full mb-8">
                  <input 
                    type="text" 
                    placeholder="Something you are proud of..." 
                    className="w-full bg-transparent border-none outline-none text-gray-400 pb-2"
                  />
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <svg width="16" height="35" viewBox="0 0 16 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.59625 28.4953L4.43115 25.3302H10.7613L7.59625 28.4953Z" fill="#757575"/>
                      <path d="M8.00008 5.25001L10.9167 8.16667H5.08342L8.00008 5.25001Z" fill="#757575"/>
                      <rect x="5" y="11" width="6" height="12" fill="#757575"/>
                    </svg>
                  </div>
                  <div className="w-full h-[1px] bg-[#1D1C1C]"></div>
                </div>
                <h2 className="text-2xl font-bold mb-6">Skills</h2>
                <div className="flex flex-wrap gap-3 w-full">
                  <div className="bg-white text-black rounded-full px-4 py-2">
                    Business & Operations
                  </div>
                  
                  <div className="bg-transparent rounded-full px-4 py-2 border-[0.5px] border-gray-600 text-[#757575]">
                    Growth & Marketing
                  </div>
                  <div className="bg-transparent rounded-full px-4 py-2 border-[0.5px] border-gray-600 text-[#757575]">
                    Investing & Funding
                  </div>
                  <div className="bg-transparent rounded-full px-4 py-2 border-[0.5px] border-gray-600 text-[#757575]">
                    Science
                  </div>
                  <div className="bg-transparent rounded-full px-4 py-2 border-[0.5px] border-gray-600 mt-2 text-[#757575]">
                    Leadership
                  </div>
                  <div className="bg-transparent rounded-full px-4 py-2 border-[0.5px] border-gray-600 mt-2 text-[#757575]">
                    Legal
                  </div>
                  <div className="bg-transparent rounded-full px-4 py-2 border-[0.5px] border-gray-600 mt-2 text-[#757575]">
                    Product & Design
                  </div>
                  <div className="bg-transparent rounded-full px-4 py-2 border-[0.5px] border-gray-600 mt-2 text-[#757575]">
                    Data
                  </div>
                  <div className="bg-transparent rounded-full px-4 py-2 border-[0.5px] border-gray-600 mt-2 text-[#757575]">
                    Other
                  </div>
                  <div className="bg-transparent rounded-full px-4 py-2 border-[0.5px] border-gray-600 mt-2 text-[#757575]">
                    Software Engineering
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <div className="flex">
                <button className="bg-[#1D1C1C] text-white font-bold py-3 px-12 rounded-[10px] text-lg border border-gray-600">
                  Back
                </button>
                <button className="bg-white text-black font-bold py-3 px-12 rounded-[10px] text-lg ml-[20px]" onClick={()=> navigate("/project")}>
                  Continue
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}