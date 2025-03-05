"use client"

import { useState, useEffect } from "react"
import { Layout, MobileFooter } from "../layout/barsNew"
import { Users, Grid, Search, Target } from "lucide-react"

export default function Bio() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [editingProfile, setEditingProfile] = useState(false)
  const [editingBackground, setEditingBackground] = useState(false)
  const [editingProject, setEditingProject] = useState(false)
  const [currentPage, setCurrentPage] = useState("profile")
  const [isMobile, setIsMobile] = useState(false)

  // Form states
  const [firstName, setFirstName] = useState("Mark")
  const [lastName, setLastName] = useState("Zuckerberg")
  const [city, setCity] = useState("San Francisco, CA, USA")
  const [headline, setHeadline] = useState("CEO, Facebook")
  const [portfolio, setPortfolio] = useState("https://portfolio.com/")
  const [linkedin, setLinkedin] = useState("https://www.linkedin.com/in/mark-zuckerberg-618bba58/")
  const [github, setGithub] = useState("https://github.com/")
  const [twitter, setTwitter] = useState("https://x.com/finkd/")

  const [achievement, setAchievement] = useState("Founder of facebook")
  const [selectedSkills, setSelectedSkills] = useState(["Business & Operations"])
  const [selectedDisciplines, setSelectedDisciplines] = useState([
    "Business Development",
    "Business Operations",
    "Business Strategy",
  ])

  const [projectStage, setProjectStage] = useState("Prototype")
  const [workplace, setWorkplace] = useState("Remote")

  const skills = [
    "Business & Operations", "Growth & Marketing", "Investing & Funding",
    "Science", "Leadership", "Legal", "Product & Design", 
    "Data", "Other", "Software Engineering",
  ]

  const disciplines = [
    "Client Management", "E-Commerce", "HR & Recruiting", "PR(Public Relations)",
    "Sales", "Business Analytics", "Business Development", "Business Operations",
    "Customer Success", "Project Management", "Business Strategy", 
    "Program Management", "Finance",
  ]

  const stages = ["Idea", "Prototype", "Revenue", "Scale"]
  const workplaces = ["Remote", "Hybrid", "Office"]

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

  const handleSave = (section) => {
    if (section === "profile") {
      setEditingProfile(false)
    } else if (section === "background") {
      setEditingBackground(false)
    } else if (section === "project") {
      setEditingProject(false)
    }
  }

  const handleCancel = (section) => {
    if (section === "profile") {
      setEditingProfile(false)
    } else if (section === "background") {
      setEditingBackground(false)
    } else if (section === "project") {
      setEditingProject(false)
    }
  }

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    )
  }

  const toggleDiscipline = (discipline) => {
    setSelectedDisciplines(prev => 
      prev.includes(discipline)
        ? prev.filter((d) => d !== discipline)
        : [...prev, discipline]
    )
  }

  const toggleStage = (stage) => {
    setProjectStage(stage)
  }

  const toggleWorkplace = (place) => {
    setWorkplace(place)
  }

  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className={`${isMobile ? 'px-4 pb-24 pt-3' : 'w-full px-4 mx-auto mt-16'} overflow-y-auto`}>
        <div className="max-w-3xl w-full mx-auto">
          <div className="bg-black rounded-3xl shadow-lg overflow-hidden border" 
            style={{ 
              borderColor: "#757575", 
              borderRadius: "20px",
              width: isMobile ? '100%' : 'auto',
              maxWidth: isMobile ? '100%' : '48rem'
            }}
          >
            {/* Editing Profile Section with Mobile Responsiveness */}
            {!editingProfile ? (
              <div className="p-4 sm:p-6 border-b border-gray-800">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div className="w-full">
                    <div className="flex items-center mb-2">
                      <h1 className={`text-2xl sm:text-3xl font-bold ${isMobile ? 'mr-2' : ''}`}>
                        Mark Zuckerburg
                      </h1>
                      <button 
                        className={`flex items-center gap-1 text-gray-400`} 
                        onClick={() => setEditingProfile(true)}
                      >
                        <svg width="17" height="17" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Edit icon SVG */}
                        </svg>
                        <span style={{ color: "#CAC5C5" }}>Edit</span>
                      </button>
                    </div>
                    <div className={`${isMobile ? 'flex items-center' : ''}`}>
                      <div>
                        <p className="text-base sm:text-xl text-[#D9D9D9] mb-1">San Francisco, CA, USA</p>
                        <p className="text-sm sm:text-base text-[#757575] mb-3">@markzuckerberg</p>
                        <p className="text-base sm:text-lg mb-5">CEO, Facebook</p>

                        <div className="flex space-x-3 mb-4">
                          <div className="bg-black rounded-full px-3 py-1 border border-[#757575] text-white text-xs">
                            #New here
                          </div>
                          <div className="bg-black rounded-full px-3 py-1 border border-[#757575] flex items-center text-white text-xs">
                            2m
                          </div>
                        </div>
                      </div>
                      <div className="relative ml-10 sm:ml-0">
                        <div className="rounded-full w-16 h-16 overflow-hidden border border-[#757575] bg-gray-800"></div>
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-4 sm:mt-0 hidden sm:flex justify-center w-full sm:w-auto">
                    <div className="rounded-full w-20 h-20 sm:w-28 sm:h-28 overflow-hidden border border-[#757575] bg-gray-800"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 sm:p-6 border-b border-gray-800">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl sm:text-2xl font-bold">Bio</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCancel("profile")}
                      className="bg-[#333333] text-white px-3 py-1 rounded-md text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave("profile")}
                      className="bg-white text-black px-3 py-1 rounded-md text-sm"
                    >
                      Save
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-base sm:text-lg font-bold mb-2">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none text-sm sm:text-base"
                      style={{ color: 'CAC5C5' }}
                    />
                  </div>
                  <div>
                    <label className="block text-base sm:text-lg font-bold mb-2">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none text-sm sm:text-base"
                      style={{ color: 'CAC5C5' }}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-base sm:text-lg font-bold mb-2">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none text-sm sm:text-base"
                    style={{ color: 'CAC5C5' }}
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-base sm:text-lg font-bold mb-2">Short headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none text-sm sm:text-base"
                    style={{ color: 'CAC5C5' }}
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-base sm:text-lg font-bold mb-2">Links</label>
                  {/* Links inputs with similar responsive styling */}
                  {/* ... (previous links input code with added responsive classes) ... */}
                </div>
              </div>
            )}

            {/* Background Section */}
            {!editingBackground ? (
              <div
                className="shadow-lg overflow-hidden border-t pt-5 pl-4 pr-4 sm:pl-6 sm:pr-6"
                style={{ background: "#111111", borderColor: "#757575" }}
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl sm:text-2xl font-bold">Background</h2>
                  <button className="flex items-center gap-1 text-gray-400" onClick={() => setEditingBackground(true)}>
                    <span style={{ color: "#CAC5C5" }}>Edit</span>
                  </button>
                </div>

                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Achievement</h3>
                  <p className="text-[#757575] text-sm sm:text-base">{achievement}</p>
                </div>

                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-black rounded-full px-3 py-1 border-[1px] border-[#757575] text-white text-xs sm:text-sm"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Discipline</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDisciplines.map((discipline, index) => (
                      <div
                        key={index}
                        className="bg-black rounded-full px-3 py-1 border-[1px] border-[#757575] text-white text-xs sm:text-sm"
                      >
                        {discipline}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 sm:p-6 border-t" style={{ background: "#111111", borderColor: "#757575" }}>
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl sm:text-2xl font-bold">Background</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCancel("background")}
                      className="bg-[#333333] text-white px-3 py-1 rounded-md text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave("background")}
                      className="bg-white text-black px-3 py-1 rounded-md text-sm"
                    >
                      Save
                    </button>
                  </div>
                </div>

                {/* Similar mobile-responsive styling applied to background editing section */}
                <div className="mb-5">
                  <h3 className="text-base sm:text-xl font-bold mb-2">Achievement</h3>
                  <textarea
                    value={achievement}
                    onChange={(e) => setAchievement(e.target.value)}
                    className="w-full bg-black border border-gray-700 rounded-md p-2 text-white text-sm sm:text-base"
                    rows="3"
                    style={{ color: '#424242' }}
                  />
                </div>

                <div className="mb-5">
                  <h3 className="text-base sm:text-xl font-bold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        className={`rounded-full px-3 py-1 border-[1px] border-[#757575] cursor-pointer text-xs sm:text-sm ${selectedSkills.includes(skill) ? "bg-white" : "bg-black"}`}
                        style={{ color: selectedSkills.includes(skill) ? "#000000" : "#757575" }}
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                



                <div className="mb-5">
                  <h3 className="text-base sm:text-xl font-bold mb-2">Discipline</h3>
                  <div className="flex flex-wrap gap-2">
                    {disciplines.map((discipline, index) => (
                      <div
                        key={index}
                        className={`rounded-full px-3 py-1 border-[1px] border-[#757575] cursor-pointer text-xs sm:text-sm ${selectedDisciplines.includes(discipline) ? "bg-white" : "bg-black"}`}
                        style={{ color: selectedDisciplines.includes(discipline) ? "#000000" : "#757575" }}
                        onClick={() => toggleDiscipline(discipline)}
                      >
                        {discipline}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Projects Section */}
            <div className="p-4 sm:p-6 border-b" style={{ background: "#111111", borderColor: "#757575" }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl sm:text-2xl font-bold">Projects</h2>
                <button className="text-white bg-transparent border-none text-sm sm:text-base">
                  + Add Project
                </button>
              </div>

              {!editingProject ? (
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg sm:text-xl font-bold mb-2">Stealth Project</h3>
                    <button 
                      className="flex items-center gap-1 text-gray-400" 
                      onClick={() => setEditingProject(true)}
                    >
                      <span style={{ color: "#CAC5C5" }}>Edit</span>
                    </button>
                  </div>
                  <div className="bg-[#1D1C1C] w-14 h-14 sm:w-16 sm:h-16 rounded-lg"></div>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg sm:text-xl font-bold">Stealth Project</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCancel("project")}
                        className="bg-[#333333] text-white px-3 py-1 rounded-md text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSave("project")}
                        className="bg-white text-black px-3 py-1 rounded-md text-sm"
                      >
                        Save
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row mb-5">
                  <div className="bg-[#1D1C1C] w-16 h-16 rounded-lg mx-auto sm:mx-0 sm:mr-5 sm:mb-0 mb-4"></div>


                    <div className="flex-1 space-y-3">
                      <div>
                        <h4 className="text-sm sm:text-base font-bold mb-1">Project name</h4>
                        <input
                          type="text"
                          placeholder="Pitch your idea in more detail..."
                          className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-[#424242] text-xs sm:text-sm placeholder:text-[#424242]"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold mb-1">Idea description</h4>
                        <input
                          type="text"
                          placeholder="Describe your idea in few words..."
                          className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-[#424242] text-xs sm:text-sm placeholder:text-[#424242]"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold mb-1">Link</h4>
                        <input
                          type="text"
                          placeholder="https://yourproject.com/"
                          className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-[#424242] text-xs sm:text-sm placeholder:text-[#424242]"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold mb-1">Pitch</h4>
                        <input
                          type="text"
                          placeholder="Pitch your idea in more detail..."
                          className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-[#424242] text-xs sm:text-sm placeholder:text-[#424242]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <h3 className="text-sm sm:text-xl font-bold mb-2">Stage</h3>
                    <div className="flex flex-wrap gap-2">
                      {stages.map((stage, index) => (
                        <div
                          key={index}
                          className={`rounded-full px-3 py-1 border-[1px] border-[#757575] cursor-pointer text-xs sm:text-sm ${projectStage === stage ? "bg-white" : "bg-black"}`}
                          style={{ color: projectStage === stage ? "#000000" : "#757575" }}
                          onClick={() => toggleStage(stage)}
                        >
                          {stage}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm sm:text-xl font-bold mb-2">Workplace</h3>
                    <div className="flex flex-wrap gap-2">
                      {workplaces.map((place, index) => (
                        <div
                          key={index}
                          className={`rounded-full px-3 py-1 border-[1px] border-[#757575] cursor-pointer text-xs sm:text-sm ${workplace === place ? "bg-white" : "bg-black"}`}
                          style={{ color: workplace === place ? "#000000" : "#757575" }}
                          onClick={() => toggleWorkplace(place)}
                        >
                          {place}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      {isMobile && <MobileFooter currentPage={currentPage} />}
    </Layout>
  )
}

