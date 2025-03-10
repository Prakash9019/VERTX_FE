"use client"

import React, { useState, useEffect } from "react"
import { Header, Sidebar, Layout, NavIconFooter, MobileFooter } from "../layout/bars"
import { useNavigate } from "react-router"
import { Search, Target, Users, Grid } from "lucide-react"

export default function ShowYourProject() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [currentPage, setCurrentPage] = useState("explore");

    const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 768);

    useEffect(() => {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      // Run check immediately
      checkIsMobile();
      
      // Listen for resize events
      window.addEventListener("resize", checkIsMobile);
      
      return () => window.removeEventListener("resize", checkIsMobile);
    }, []);
    

    // Set current page for navigation highlighting
    useEffect(() => {
      // Check if the path includes "explore" to keep the bar active
      if (location.pathname.includes("explore")) {
        setCurrentPage("explore");
      } else {
        setCurrentPage(location.pathname.split("/").pop()); // Fallback for other pages
      }
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
                <div className="flex-1 flex items-center justify-center transition-all duration-300">
                    <div className="max-w-2xl w-full mt-10 px-4">
                        <h1 className="text-4xl font-bold mb-2 pt-16">Showcase your project</h1>
                        <p className="text-lg text-[#CAC5C5] mb-6">What have you built so far?</p>
                        
                        <div className="bg-[#151515] rounded-[20px] px-8 py-5 shadow-xl border border-[#1D1C1C] w-full">

                            <div className="flex flex-col items-start">
                                <div className="flex justify-between items-center w-full mb-4">
                                    <h2 className="text-2xl font-bold">Projects</h2>
                                    <button className="flex items-center text-[#757575]">
                                        <span className="text-xl mr-1">+</span> Add Project
                                    </button>
                                </div>
                                
                                <div className="flex justify-between items-center w-full mb-3">
                                    <div className="text-[#CAC5C5] text-[22px] font-extrabold">Stealth Project</div>
                                    <div className="flex space-x-3">
                                        <button className="px-3 py-1.5 rounded-[4px] bg-[#1D1C1C]">Cancel</button>
                                        <button className="bg-white text-black px-3 py-1.5 rounded-lg">Save</button>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-4 w-full mb-4">
                                    <div className="bg-[#1D1C1C] w-14 h-14 rounded-lg"></div>
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <h3 className="text-base font-bold">Project name</h3>
                                        </div>
                                        <input 
                                            type="text" 
                                            placeholder="Stealth project"
                                            className="w-full bg-transparent border-none outline-none text-[#424242] pb-2 placeholder:text-sm placeholder:text-[#424242]"
                                        />
                                        <div className="w-full h-[1px] bg-[#1D1C1C]"></div>
                                    </div>
                                </div>
                                
                                <div className="w-full mb-4">
                                    <div className="flex items-center">
                                        <div className="invisible w-14 h-4 mr-4"></div>
                                        <h3 className="text-base font-bold">Idea description</h3>
                                    </div>
                                    <div className="flex">
                                        <div className="invisible w-14 h-4 mr-4"></div>
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                placeholder="Describe your idea in few words..."
                                                className="w-full bg-transparent border-none outline-none text-[#424242] pb-2 placeholder:text-sm placeholder:text-[#424242]"
                                            />
                                            <div className="w-full h-[1px] bg-[#1D1C1C]"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="w-full mb-4">
                                    <div className="flex items-center">
                                        <div className="invisible w-14 h-4 mr-4"></div>
                                        <h3 className="text-base font-bold">Link</h3>
                                    </div>
                                    <div className="flex">
                                        <div className="invisible w-14 h-4 mr-4"></div>
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                placeholder="https://yourproject.com/"
                                                className="w-full bg-transparent border-none outline-none text-[#424242] pb-2 placeholder:text-sm placeholder:text-[#424242]"
                                            />
                                            <div className="w-full h-[1px] bg-[#1D1C1C]"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="w-full mb-4">
                                    <div className="flex items-center">
                                        <div className="invisible w-14 h-4 mr-4"></div>
                                        <h3 className="text-base font-bold">Pitch</h3>
                                    </div>
                                    <div className="flex">
                                        <div className="invisible w-14 h-4 mr-4"></div>
                                        <div className="flex-1 relative">
                                            <input
                                                type="text"
                                                placeholder="Pitch your idea in more detail..."
                                                className="w-full bg-transparent border-none outline-none text-[#424242] pb-2 placeholder:text-sm placeholder:text-[#424242]"
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
                                
                                <div className="w-full mb-3">
                                    <div className="flex items-center">
                                        <div className="invisible w-14 h-4 mr-4"></div>
                                        <h3 className="text-base font-bold">Stage</h3>
                                    </div>
                                    <div className="flex">
                                        <div className="invisible w-14 h-4 mr-4"></div>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <div className="bg-[#1D1C1C] rounded-full px-3 py-1.5 border border-[#757575] text-[#757575] text-sm">
                                                    Idea
                                                </div>
                                                <div className="bg-transparent rounded-full px-3 py-1.5 border border-[#757575] text-[#757575] text-sm">
                                                    Prototype
                                                </div>
                                                <div className="bg-transparent rounded-full px-3 py-1.5 border border-[#757575] text-[#757575] text-sm">
                                                    Revenue
                                                </div>
                                                <div className="bg-transparent rounded-full px-3 py-1.5 border border-[#757575] text-[#757575] text-sm">
                                                    Scale
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="w-full">
                                    <div className="flex items-center">
                                        <div className="invisible w-14 h-4 mr-4"></div>
                                        <h3 className="text-base font-bold">Workplace</h3>
                                    </div>
                                    <div className="flex">
                                        <div className="invisible w-14 h-4 mr-4"></div>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <div className="bg-transparent rounded-full px-3 py-1.5 border border-[#757575] text-[#757575] text-sm">
                                                    Remote
                                                </div>
                                                <div className="bg-transparent rounded-full px-3 py-1.5 border border-[#757575] text-[#757575] text-sm">
                                                    Hybrid
                                                </div>
                                                <div className="bg-transparent rounded-full px-3 py-1.5 border border-[#757575] text-[#757575] text-sm">
                                                    Office
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-6 w-full">
                            <button className="bg-[#1D1C1C] text-white font-bold py-2 px-8 rounded-[10px] text-lg w-[34%]">
                                Back
                            </button>
                            <button className="bg-white text-black font-bold py-2 px-8 rounded-[10px] text-lg w-[64%]" onClick={()=> navigate("/bio")}>
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>

            {/* Using the MobileFooter component instead of custom mobile footer */}
            {isMobile && <MobileFooter currentPage={currentPage} />}
        </div>
    )
}