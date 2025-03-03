"use client"

import { useState, useEffect } from "react"
import "./style.css"
import FinancialModeling from "../AandF/AandF"
import EquityManagement from "../Equity_table/Equity_table"
import ValuationCalculator from "../Startup-valuation/Startup-valuation"
import DocandSa from "../DOCandSA/DocandSa"
import { Header, Sidebar, MainContent, Layout, NavIconFooter, MobileFooter } from "../../layout/barsNew" 
import { Search, Target, Users, Grid } from "lucide-react"

function Categories() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedTool, setSelectedTool] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [currentPage, setCurrentPage] = useState("explore")

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

  // Set current page for navigation highlighting
  useEffect(() => {
    // Check if the path includes "explore" to keep the bar active
    if (location.pathname.includes("explore")) {
      setCurrentPage("explore")
    } else {
      setCurrentPage(location.pathname.split("/").pop()) // Fallback for other pages
    }
  }, [location.pathname])

  const openPopup = (index) => {
    setSelectedTool(index)
    setIsPopupOpen(true)
    // Allow scrolling on mobile devices
    if (!isMobile) {
      document.body.style.overflow = "hidden"
    }
  }

  const closePopup = () => {
    setIsPopupOpen(false)
    setSelectedTool(null)
    document.body.style.overflow = "auto" // Restore scrolling
  }

  // Create tools array with closePopup function passed to each component
  const tools = [
    { title: "Equity and Cap Table Management", link: "/cal1", component: <EquityManagement onClose={closePopup} /> },
    { title: "Startup Valuation", link: "/cal2", component: <ValuationCalculator onClose={closePopup} /> },
    { title: "Accounting and Finance", link: "/cal3", component: <FinancialModeling onClose={closePopup} /> },
    { title: "Convertible Notes & SAFE", link: "/cal4", component: <DocandSa onClose={closePopup} /> },
  ]

  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="flex flex-col min-h-screen">
        <div className={`${isMobile ? 'px-4 -mt-5 pb-24 flex-grow' : 'w-full px-4 mx-auto mt-16'} overflow-y-auto`}>
          <div className="main-content2 ">
            <div className="content2">
              <div className="tools-grid">
                {tools.map((tool, index) => (
                  <a
                    key={index}
                    href="#"
                    className="tool-card"
                    onClick={(e) => {
                      e.preventDefault()
                      openPopup(index)
                    }}
                  >
                    <h2 className="tool-title">{tool.title}</h2>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup with proper overflow handling for mobile */}
      {isPopupOpen && selectedTool !== null && (
        <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-[2px] flex justify-center items-center z-50">
          <div className={`w-[70%] max-sm:w-[95%] bg-black rounded-2xl border border-[#75757569] p-6 max-sm:p-2 pb-10 ${isMobile ? 'h-[85%] overflow-y-auto' : 'h-[95%]'} relative`}>
            {/* Close button at the top right */}
            <button 
              onClick={closePopup}
              className="absolute top-2 right-2 p-2 text-white bg-gray-800 rounded-full z-10"
            >
              ✕
            </button>
            
            {/* Popup Content with proper scrolling */}
            <main className={`${isMobile ? '' : 'overflow-y-auto'} h-full scrollbar-hide`}>
              <div className="max-w-5xl mx-auto">
                {tools[selectedTool].component}
              </div>
            </main>
          </div>
        </div>
      )}

      {/* Using the MobileFooter component */}
      {isMobile && <MobileFooter currentPage={currentPage} />}
    </Layout>
  )
}

export default Categories