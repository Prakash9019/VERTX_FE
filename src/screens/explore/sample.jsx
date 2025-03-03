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
          <div className="max-w-3xl w-full px-4">
            <h1 className="text-4xl font-bold mb-2">Skills to survive</h1>
            <p className="text-xl text-[#CAC5C5] mb-8">Tell me about your background</p>
            
            <div className="bg-[#151515] rounded-[20px] p-8 shadow-xl border border-[#1D1C1C] w-full">

              <div className="flex flex-col items-start">
                <h2 className="text-2xl font-bold mb-4">Achievement</h2>
                <div className="relative w-full mb-6">
                <input 
  type="text" 
  placeholder="Something you are proud of..." 
  className="w-full bg-transparent border-none outline-none text-[#424242] pb-2 placeholder-[#424242]"
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
                <h2 className="text-2xl font-bold mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2 w-full">
                  <div className="bg-white text-black rounded-full px-3 py-1 text-sm font-bold">
                    Business & Operations
                  </div>
                  
                  <div className="bg-transparent rounded-full px-3 py-1 border border-[#757575] text-[#757575] text-sm font-bold">
                    Growth & Marketing
                  </div>
                  <div className="bg-transparent rounded-full px-3 py-1 border border-[#757575] text-[#757575] text-sm font-bold">
                    Investing & Funding
                  </div>
                  <div className="bg-transparent rounded-full px-3 py-1 border border-[#757575] text-[#757575] text-sm font-bold">
                    Science
                  </div>
                  <div className="bg-transparent rounded-full px-3 py-1 border border-[#757575] mt-1 text-[#757575] text-sm font-bold">
                    Leadership
                  </div>
                  <div className="bg-transparent rounded-full px-3 py-1 border border-[#757575] mt-1 text-[#757575] text-sm font-bold">
                    Legal
                  </div>
                  <div className="bg-transparent rounded-full px-3 py-1 border border-[#757575] mt-1 text-[#757575] text-sm font-bold">
                    Product & Design
                  </div>
                  <div className="bg-transparent rounded-full px-3 py-1 border border-[#757575] mt-1 text-[#757575] text-sm font-bold">
                    Data
                  </div>
                  <div className="bg-transparent rounded-full px-3 py-1 border border-[#757575] mt-1 text-[#757575] text-sm font-bold">
                    Other
                  </div>
                  <div className="bg-transparent rounded-full px-3 py-1 border border-[#757575] mt-1 text-[#757575] text-sm font-bold">
                    Software Engineering
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6 w-full">
              <button className="bg-[#1D1C1C] text-white font-bold py-2 px-8 rounded-[10px] text-lg w-[32%]">
                Back
              </button>
              <button className="bg-white text-black font-bold py-2 px-8 rounded-[10px] text-lg w-[64%]" onClick={()=> navigate("/project")}>
                Continue
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}