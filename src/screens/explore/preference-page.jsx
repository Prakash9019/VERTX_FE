"use client"
import { useState, useEffect } from "react"
import { Layout, MobileFooter } from "../layout/bars"
import { useNavigate } from "react-router"
import gify from "../outreach/gify.gif"

export default function PreferenceSet() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [currentPage, setCurrentPage] = useState("explore")

  // User preferences
  const [option, setOption] = useState("")
  const [availability, setAvailability] = useState("")
  const [compensation, setCompensation] = useState("")
  const [stage, setStage] = useState("")
  const [workplace, setWorkplace] = useState("")

  // Check if device is mobile based on screen width
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
    window.addEventListener("resize", checkIsMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile)
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

  // Function to handle option selection
  const handleOptionSelect = (value) => {
    setOption(value)
  }

  // Function to handle availability selection
  const handleAvailabilitySelect = (value) => {
    setAvailability(value)
  }

  // Function to handle compensation selection
  const handleCompensationSelect = (value) => {
    setCompensation(value)
  }

  // Function to handle stage selection
  const handleStageSelect = (value) => {
    setStage(value)
  }

  // Function to handle workplace selection
  const handleWorkplaceSelect = (value) => {
    setWorkplace(value)
  }

  // Submit preferences
  const handleSubmit = () => {
    try {
      setLoading(true)
      // Frontend only code for navigation
      navigate("/explore/skills") // Move to skills page
    } catch (error) {
      console.error("Error navigating:", error)
    } finally {
      setLoading(false)
    }
  }

  // Get heading based on selected option
  const getHeading = () => {
    if (option === "founder") {
      return "Set Preference"
    } else if (option === "co-founder") {
      return "List preferences"
    } else if (option === "notInterested") {
      return "Continue exploring"
    } else {
      return "Set Preference" // Default
    }
  }

  // Get subheading based on selected option
  const getSubheading = () => {
    if (option === "founder") {
      return "Choose which profiles you want to explore."
    } else if (option === "co-founder") {
      return "List what you're looking for in a profile."
    } else if (option === "notInterested") {
      return "You've chosen not to display profiles. Feel free to explore."
    } else {
      return "Choose which profiles you want to explore." // Default
    }
  }

  // Determine if preferences section should be shown (hide if "Not interested" is selected)
  const showPreferences = option !== "notInterested"

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
        <img src={gify || "/placeholder.svg"} alt="Loading..." className="w-20 h-20" />
      </div>
    )
  }

  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="flex flex-col min-h-screen" style={{ letterSpacing: "-0.04em" }}>
        <div className={`${isMobile ? "px-4 mt-10 pb-24" : "px-4 mt-6"} flex-1 flex   justify-center overflow-y-auto`}>    
        
          <div className={`${isMobile ? "w-full" : "max-w-3xl w-full"}`}>
            <div className="text-left">
              <h1 className={`${isMobile ? "text-3xl" : "text-4xl"} font-bold mb-1`}>{getHeading()}</h1>
              <p className={`${isMobile ? "text-lg" : "text-xl"} text-[#CAC5C5] mb-4`}>{getSubheading()}</p>
            </div>

            {/* Option Selection */}
            <div className="bg-[black] rounded-[2rem] p-4 md:p-6 shadow-xl border border-[1px] border-[#1D1C1C] w-full mt-12 mb-3">
              <h2 className={`${isMobile ? "text-xl" : "text-2xl"} font-bold mb-9`}>Choose an option</h2>
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-5">
                <div
                  className={`${option === "founder" ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"} rounded-full px-8 py-0.5 md:px-10 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                  onClick={() => handleOptionSelect("founder")}
                >
                  Join a founder
                </div>
                <div
                  className={`${option === "co-founder" ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"} rounded-full px-8 py-0.5 md:px-10 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                  onClick={() => handleOptionSelect("co-founder")}
                >
                  Invite a co-founder
                </div>
                <div
                  className={`${option === "notInterested" ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"} rounded-full px-8 py-0.5 md:px-10 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                  onClick={() => handleOptionSelect("notInterested")}
                >
                  Not interested
                </div>
              </div>
            </div>

            {/* Preferences Section - Only show if not "Not interested" */}
            {showPreferences && (
              <div className="bg-[black] rounded-[2rem] p-4 md:p-6 shadow-xl border border-[1px] border-[#1D1C1C] w-full">
                <h2 className={`${isMobile ? "text-xl" : "text-2xl"} font-bold mb-8`}>Preferences</h2>

                {/* Availability */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-[#CAC5C5] font-[800]">Availability</h3>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    <div
                      className={`${availability === "part-time" ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"} rounded-full px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                      onClick={() => handleAvailabilitySelect("part-time")}
                    >
                      Part-time
                    </div>
                    <div
                      className={`${availability === "full-time" ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"} rounded-full px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                      onClick={() => handleAvailabilitySelect("full-time")}
                    >
                      Full-time
                    </div>
                    <div
                      className={`${availability === "open" ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"} rounded-full px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                      onClick={() => handleAvailabilitySelect("open")}
                    >
                      Open to all
                    </div>
                  </div>
                </div>

                {/* Compensation */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-[#CAC5C5] font-[800]">Compensation</h3>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    <div
                      className={`${compensation === "paid" ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"} rounded-full px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                      onClick={() => handleCompensationSelect("paid")}
                    >
                      Paid
                    </div>
                    <div
                      className={`${compensation === "equity" ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"} rounded-full px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                      onClick={() => handleCompensationSelect("equity")}
                    >
                      Equity
                    </div>
                    <div
                      className={`${compensation === "volunteer" ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"} rounded-full px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                      onClick={() => handleCompensationSelect("volunteer")}
                    >
                      Volunteer
                    </div>
                    <div
                      className={`${compensation === "open" ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"} rounded-full px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                      onClick={() => handleCompensationSelect("open")}
                    >
                      Open to all
                    </div>
                  </div>
                </div>

                {/* Stage */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-[#CAC5C5] font-[800]">Stage</h3>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    <div
                      className={`${stage === "idea" ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"} rounded-full px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                      onClick={() => handleStageSelect("idea")}
                    >
                      Idea
                    </div>
                    <div
                      className={`${stage === "prototype" ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"} rounded-full px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                      onClick={() => handleStageSelect("prototype")}
                    >
                      Prototype
                    </div>
                    <div
                      className={`${stage === "revenue" ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"} rounded-full px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                      onClick={() => handleStageSelect("revenue")}
                    >
                      Revenue
                    </div>
                    <div
                      className={`${stage === "scale" ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"} rounded-full px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                      onClick={() => handleStageSelect("scale")}
                    >
                      Scale
                    </div>
                    <div
                      className={`${stage === "open" ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"} rounded-full px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                      onClick={() => handleStageSelect("open")}
                    >
                      Open to all
                    </div>
                  </div>
                </div>

                {/* Workplace */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-[#CAC5C5] font-[800]">Workplace</h3>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    <div
                      className={`${workplace === "remote" ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"} rounded-full px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                      onClick={() => handleWorkplaceSelect("remote")}
                    >
                      Remote
                    </div>
                    <div
                      className={`${workplace === "hybrid" ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"} rounded-full px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                      onClick={() => handleWorkplaceSelect("hybrid")}
                    >
                      Hybrid
                    </div>
                    <div
                      className={`${workplace === "office" ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"} rounded-full px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                      onClick={() => handleWorkplaceSelect("office")}
                    >
                      Office
                    </div>
                    <div
                      className={`${workplace === "open" ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"} rounded-full px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                      onClick={() => handleWorkplaceSelect("open")}
                    >
                      Open to all
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div
              className={`flex ${isMobile ? "justify-center mt-6 mb-16 max-sm:gap-4" : "justify-between mt-6"} w-full`}
            >
              <button
                className="bg-[#1D1C1C] text-white font-bold py-2 px-8 rounded-[10px] text-lg w-[32%]"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
              <button
                className="bg-white text-black font-bold py-2.5 px-8 rounded-[10px] text-lg w-[64%]"
                onClick={handleSubmit}
              >
                Continue
              </button>
            </div>
          </div>
        </div>

        {/* Using the MobileFooter component for mobile devices */}
        {isMobile && <MobileFooter currentPage={currentPage} />}
      </div>
    </Layout>
  )
}





