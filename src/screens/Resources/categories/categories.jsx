"use client"

import { useState } from "react"
import "./style.css"
// import { Header, Sidebar } from "./index.jsx"

function Categories() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const tools = [
    {
      title: "Equity and Cap Table Management",
      link: "/cal1"
    },
    {
      title: "Startup Valuation",
      link: "/cal2"
    },
    {
      title: "Accounting and Finance",
      link: "/cal3"
    },
    {
      title: "Convertible Notes & SAFE",
      link: "/cal4"
    },
    {
      title: "Break-Even Analysis",
      link: "/breakeven"
    },
    {
      title: "Pitch Deck Templates",
      link: "/pitch-deck"
    }
  ]

  return (
    <div className="app2">
      {/* <Sidebar sidebarOpen={sidebarOpen} /> */}
      <main>
        <div className="main-content2">
          {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
          <div className="content2">
            <div className="tools-grid">
              {tools.map((tool, index) => (
                <a 
                  key={index} 
                  href={tool.link}
                  className="tool-card"
                >
                  <h2 className="tool-title">{tool.title}</h2>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Categories