"use client"

import React, { useState, useEffect } from "react"
import { Layout, MobileFooter } from "../layout/bars"
import { useNavigate } from "react-router"
import API_KEY from "../../../key"
export default function BrokenFeature() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState("explore")
  const [isMobile, setIsMobile] = useState(false)
  const navigate=useNavigate();
 
const handleClick = async () => {

  try {
      // Update completion status in the database
      await fetch(`${API_KEY}/profile/complete-profile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" ,
             token: localStorage.getItem("token")
          }
      });

      // Store completion flag in localStorage
      localStorage.setItem("exe", "1");

      navigate("/outreach");
  } catch (error) {
      console.error("Error updating profile:", error);
  }
};


  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // Automatically collapse sidebar on mobile
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      }
    }
    
    // Initial check
    checkIsMobile()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])
  
  useEffect(() => {
    // Check if the path includes "explore" to keep the bar active
    if (location.pathname.includes("explore")) {
      setCurrentPage("explore")
    } else {
      setCurrentPage(location.pathname.split("/").pop()) // Fallback for other pages
    }
  }, [location.pathname])
  
  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="flex flex-col min-h-screen">
        <div className={`${isMobile ? 'px-4 pt-6 pb-24' : 'w-full px-4 mx-auto'} overflow-y-auto flex-grow flex items-center justify-center`}>
          <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto text-center">
          <p className="text-lg md:text-xl text-[#757575] mb-4 md:whitespace-nowrap">
  {/* Sorry, founder. We broke, this feature is still under development. */}
  Your profile is now complete. It takes at least 24 hours to show you the profiles.
</p>

            <button className="bg-transparent text-white font-bold py-2 px-4 rounded text-base md:text-lg  transition-colors" onClick={()=> handleClick()}>
              Explore investors
            </button>
          </div>
        </div>
        {isMobile && <MobileFooter currentPage={currentPage} />}
      </div>
    </Layout>
  )
}