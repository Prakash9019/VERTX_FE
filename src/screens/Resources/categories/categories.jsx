"use client"

import { useState } from "react"
import "./style.css"
import FinancialModeling from "../AandF/AandF"
import EquityManagement from "../Equity_table/Equity_table"
import ValuationCalculator from "../Startup-valuation/Startup-valuation"
import DocandSa from "../DOCandSA/DocandSa"
import { Header, Sidebar } from "../../layout/bars" 

function Categories() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedTool, setSelectedTool] = useState(null)

  const openPopup = (index) => {
    setSelectedTool(index)
    setIsPopupOpen(true)
    document.body.style.overflow = "hidden" // Prevent scrolling
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
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 relative">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className={`flex-1 p-3 pt-20 transition-all duration-300 ${sidebarOpen ? "ml-64" : "-ml-30"}`}>
          <div className="main-content2">
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

          {/* Popup */}
          {isPopupOpen && selectedTool !== null && (
            <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-[2px] flex justify-center items-center z-50">
              <div className="w-[70%] bg-black rounded-2xl border border-[#75757569] p-6 pb-10 h-[95%] overflow-hidden relative">
                {/* Popup Content */}
                <main className="overflow-y-scroll h-full scrollbar-hide">
                  <div className="max-w-5xl mx-auto">
                    {tools[selectedTool].component}
                  </div>
                </main>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Categories
