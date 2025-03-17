"use client"
import { useState, useEffect } from "react"
import { Layout, MobileFooter } from "../layout/bars"
import { useNavigate } from "react-router"
import axios from "axios"
import gify from "../outreach/gify.gif"
import API_KEY from "../../../key"

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

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) setSidebarOpen(false)
    }
    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  useEffect(() => {
    // Check if the path includes "explore" to keep the bar active
    if (location.pathname.includes("explore")) {
      setCurrentPage("explore")
    } else {
      setCurrentPage(location.pathname.split("/").pop()) // Fallback for other pages
    }
  }, [location.pathname])
  // Handle option selection
  const handleOptionSelect = (value) => setOption(value)
  const handleAvailabilitySelect = (value) => setAvailability(value)
  const handleCompensationSelect = (value) => setCompensation(value)
  const handleStageSelect = (value) => setStage(value)
  const handleWorkplaceSelect = (value) => setWorkplace(value)

  // Submit preferences
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`${API_KEY}/request/preference`, 
        { // Data (body)
          preference: option,
          availability,
          compensation,
          stage,
          workplace
        },
        { // Headers
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token')
          }
        }
      );
      if (response.status === 201) {
        console.log("Preferences saved successfully:", response.data)
        navigate("/explore/break") // Navigate after successful submission
      } 
    } catch (error) {
      console.error("Error saving preferences:", error)
    } finally {
      setLoading(false)
    }
  }

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
        <div className={`${isMobile ? "px-4 mt-10 pb-24" : "px-4 mt-6"} flex-1 flex justify-center overflow-y-auto`}>
          <div className={`${isMobile ? "w-full" : "max-w-3xl w-full"}`}>
            <div className="text-left">
            <h1 className={`${isMobile ? "text-3xl" : "text-4xl"} font-bold mb-1`}>{getHeading()}</h1>
            <p className={`${isMobile ? "text-lg" : "text-xl"} text-[#CAC5C5] mb-4`}>{getSubheading()}</p>
            </div>

            {/* Option Selection */}
            <div className="bg-[black] rounded-[2rem] p-4 md:p-6 shadow-xl border border-[1px] border-[#1D1C1C] w-full mt-12 mb-3">
              <h2 className={`${isMobile ? "text-xl" : "text-2xl"} font-bold mb-9`}>Choose an option</h2>
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-5">
                {["founder", "co-founder", "notInterested"].map((val) => (
                  <div
                    key={val}
                    className={`rounded-full px-8 py-1 text-sm cursor-pointer ${
                      option === val ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"
                    }`}
                    onClick={() => handleOptionSelect(val)}
                  >
                    {val === "founder" ? "Join a founder" : val === "co-founder" ? "Invite a co-founder" : "Just exploring"}
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences Section */}
            {option !== "notInterested" && (
                <div className="bg-[black] rounded-[2rem] p-4 md:p-6 shadow-xl border border-[1px] border-[#1D1C1C] w-full">
                <h2 className={`${isMobile ? "text-xl" : "text-2xl"} font-bold mb-8`}>Preferences</h2>

                {/* Availability */}
                <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-[#CAC5C5] font-[800]">Availability</h3>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {["Part-time", "Full-time", "Open"].map((val) => (
                      <div
                        key={val}
                        className={`rounded-full px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm cursor-pointer mb-1 ${
                          availability === val ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"
                        }`}
                        onClick={() => handleAvailabilitySelect(val)}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compensation */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-[#CAC5C5]">Compensation</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Paid", "Equity", "Volunteer", "Open"].map((val) => (
                      <div
                        key={val}
                        className={`rounded-full px-3 py-1 text-sm cursor-pointer ${
                          compensation === val ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"
                        }`}
                        onClick={() => handleCompensationSelect(val)}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-[#CAC5C5]">Stage</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Idea", "Prototype", "Revenue", "Scale"].map((val) => (
                      <div
                        key={val}
                        className={`rounded-full px-3 py-1 text-sm cursor-pointer ${
                          stage === val ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"
                        }`}
                        onClick={() => handleStageSelect(val)}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>


                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-[#CAC5C5]">Compensation</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Remote", "Hybrid", "Office"].map((val) => (
                      <div
                        key={val}
                        className={`rounded-full px-3 py-1 text-sm cursor-pointer ${
                          workplace === val ? "bg-white text-black font-normal" : "bg-transparent border border-[#757575] text-[#757575] font-normal"
                        }`}
                        onClick={() => handleWorkplaceSelect(val)}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>     
              </div>
            )}
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
        {isMobile && <MobileFooter currentPage={currentPage} />}
      </div>
    </Layout>
  )
}
