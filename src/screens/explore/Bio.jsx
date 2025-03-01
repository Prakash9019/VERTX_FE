"use client"

import { useState } from "react"
import { Header, Sidebar } from "../layout/bars"

export default function Bio() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [editingProfile, setEditingProfile] = useState(false)
  const [editingBackground, setEditingBackground] = useState(false)
  const [editingProject, setEditingProject] = useState(false)

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
    "Business & Operations",
    "Growth & Marketing",
    "Investing & Funding",
    "Science",
    "Leadership",
    "Legal",
    "Product & Design",
    "Data",
    "Other",
    "Software Engineering",
  ]

  const disciplines = [
    "Client Management",
    "E-Commerce",
    "HR & Recruiting",
    "PR(Public Relations)",
    "Sales",
    "Business Analytics",
    "Business Development",
    "Business Operations",
    "Customer Success",
    "Project Management",
    "Business Strategy",
    "Program Management",
    "Finance",
  ]

  const stages = ["Idea", "Prototype", "Revenue", "Scale"]
  const workplaces = ["Remote", "Hybrid", "Office"]

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
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const toggleDiscipline = (discipline) => {
    if (selectedDisciplines.includes(discipline)) {
      setSelectedDisciplines(selectedDisciplines.filter((d) => d !== discipline))
    } else {
      setSelectedDisciplines([...selectedDisciplines, discipline])
    }
  }

  const toggleStage = (stage) => {
    setProjectStage(stage)
  }

  const toggleWorkplace = (place) => {
    setWorkplace(place)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 relative">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main
          className={`flex-1 flex items-center justify-center transition-all duration-300 ${sidebarOpen ? "ml-64" : "-ml-20"} pt-20`}
        >
          <div className="max-w-3xl w-full px-4 pt-8">
            {/* Icons Container */}
            <div className="flex justify-end space-x-2 mb-4 pr-12">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33333 14C2.96667 14 2.65278 13.8694 2.39167 13.6083C2.13056 13.3472 2 13.0333 2 12.6667V3.33333C2 2.96667 2.13056 2.65278 2.39167 2.39167C2.65278 2.13056 2.96667 2 3.33333 2H9.28333L7.95 3.33333H3.33333V12.6667H12.6667V8.03333L14 6.7V12.6667C14 13.0333 13.8694 13.3472 13.6083 13.6083C13.3472 13.8694 13.0333 14 12.6667 14H3.33333ZM6 10V7.16667L12.1167 1.05C12.25 0.916668 12.4 0.816668 12.5667 0.750002C12.7333 0.683335 12.9 0.650002 13.0667 0.650002C13.2444 0.650002 13.4139 0.683335 13.575 0.750002C13.7361 0.816668 13.8833 0.916668 14.0167 1.05L14.95 2C15.0722 2.13333 15.1667 2.28056 15.2333 2.44167C15.3 2.60278 15.3333 2.76667 15.3333 2.93333C15.3333 3.1 15.3028 3.26389 15.2417 3.425C15.1806 3.58611 15.0833 3.73333 14.95 3.86667L8.83333 10H6ZM7.33333 8.66667H8.26667L12.1333 4.8L11.6667 4.33333L11.1833 3.86667L7.33333 7.71667V8.66667Z" fill="white"/>
</svg>

<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="15" height="15" stroke="black"/>
<path d="M6.16647 14.6667L5.89981 12.5333C5.75536 12.4778 5.61925 12.4111 5.49147 12.3333C5.36369 12.2556 5.23869 12.1722 5.11647 12.0833L3.13314 12.9167L1.2998 9.75L3.01647 8.45C3.00536 8.37222 2.9998 8.29722 2.9998 8.225V7.775C2.9998 7.70278 3.00536 7.62778 3.01647 7.55L1.2998 6.25L3.13314 3.08334L5.11647 3.91667C5.23869 3.82778 5.36647 3.74445 5.4998 3.66667C5.63314 3.58889 5.76647 3.52222 5.89981 3.46667L6.16647 1.33334H9.83314L10.0998 3.46667C10.2442 3.52222 10.3804 3.58889 10.5081 3.66667C10.6359 3.74445 10.7609 3.82778 10.8831 3.91667L12.8665 3.08334L14.6998 6.25L12.9831 7.55C12.9942 7.62778 12.9998 7.70278 12.9998 7.775V8.225C12.9998 8.29722 12.9887 8.37222 12.9665 8.45L14.6831 9.75L12.8498 12.9167L10.8831 12.0833C10.7609 12.1722 10.6331 12.2556 10.4998 12.3333C10.3665 12.4111 10.2331 12.4778 10.0998 12.5333L9.83314 14.6667H6.16647ZM8.03314 10.3333C8.67758 10.3333 9.22758 10.1056 9.68314 9.65C10.1387 9.19445 10.3665 8.64445 10.3665 8C10.3665 7.35556 10.1387 6.80556 9.68314 6.35C9.22758 5.89445 8.67758 5.66667 8.03314 5.66667C7.37758 5.66667 6.8248 5.89445 6.3748 6.35C5.92481 6.80556 5.6998 7.35556 5.6998 8C5.6998 8.64445 5.92481 9.19445 6.3748 9.65C6.8248 10.1056 7.37758 10.3333 8.03314 10.3333Z" fill="#757575"/>
</svg>
            </div>

            <div className="bg-black rounded-3xl shadow-lg overflow-hidden border" style={{ borderColor: "#757575", borderRadius: "20px" }}>
              {/* Profile Top Section */}
              {!editingProfile ? (
                <div className="p-6 border-b border-gray-800">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center mb-2">
                        <h1 className="text-3xl font-bold">Mark Zuckerburg</h1>
                        <button className="ml-4 flex items-center gap-1 text-gray-400" onClick={() => setEditingProfile(true)}>
                        <svg width="17" height="17" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 12V10H11V12H1ZM3 8H3.7L7.6 4.1125L7.2375 3.75L6.8875 3.4L3 7.3V8ZM2 9V6.875L7.6 1.2875C7.69167 1.19583 7.79792 1.125 7.91875 1.075C8.03958 1.025 8.16667 1 8.3 1C8.43333 1 8.5625 1.025 8.6875 1.075C8.8125 1.125 8.925 1.2 9.025 1.3L9.7125 2C9.8125 2.09167 9.88542 2.2 9.93125 2.325C9.97708 2.45 10 2.57917 10 2.7125C10 2.8375 9.97708 2.96042 9.93125 3.08125C9.88542 3.20208 9.8125 3.3125 9.7125 3.4125L4.125 9H2ZM7.6 4.1125L7.2375 3.75L6.8875 3.4L7.6 4.1125Z" fill="#CAC5C5"/>
</svg>
                          <span style={{ color: "#CAC5C5" }}>Edit</span>
                        </button>
                      </div>
                      <p className="text-xl text-[#D9D9D9] mb-1">San Francisco, CA, USA</p>
                      <p className="text-base text-[#757575] mb-3">@markzuckerberg</p>
                      <p className="text-lg mb-5">CEO, Facebook</p>

                      <div className="flex space-x-3">
                        <div className="bg-black rounded-full px-3 py-1 border border-[#757575] text-white text-xs">
                          #New here
                        </div>
                        <div className="bg-black rounded-full px-3 py-1 border border-[#757575] flex items-center text-white text-xs">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.92532 9.74166L9.74199 8.92499L7.58366 6.76666V4.08332H6.41699V7.23332L8.92532 9.74166ZM7.00033 12.8333C6.19338 12.8333 5.43505 12.6802 4.72533 12.3739C4.0156 12.0677 3.39824 11.6521 2.87324 11.1271C2.34824 10.6021 1.93262 9.98471 1.62637 9.27499C1.32012 8.56527 1.16699 7.80693 1.16699 6.99999C1.16699 6.19305 1.32012 5.43471 1.62637 4.72499C1.93262 4.01527 2.34824 3.39791 2.87324 2.87291C3.39824 2.34791 4.0156 1.93228 4.72533 1.62603C5.43505 1.31978 6.19338 1.16666 7.00033 1.16666C7.80727 1.16666 8.5656 1.31978 9.27532 1.62603C9.98505 1.93228 10.6024 2.34791 11.1274 2.87291C11.6524 3.39791 12.068 4.01527 12.3743 4.72499C12.6805 5.43471 12.8337 6.19305 12.8337 6.99999C12.8337 7.80693 12.6805 8.56527 12.3743 9.27499C12.068 9.98471 11.6524 10.6021 11.1274 11.1271C10.6024 11.6521 9.98505 12.0677 9.27532 12.3739C8.5656 12.6802 7.80727 12.8333 7.00033 12.8333ZM7.00033 11.6667C8.29338 11.6667 9.39442 11.2121 10.3034 10.3031C11.2125 9.39409 11.667 8.29305 11.667 6.99999C11.667 5.70693 11.2125 4.60589 10.3034 3.69686C9.39442 2.78784 8.29338 2.33332 7.00033 2.33332C5.70727 2.33332 4.60623 2.78784 3.6972 3.69686C2.78817 4.60589 2.33366 5.70693 2.33366 6.99999C2.33366 8.29305 2.78817 9.39409 3.6972 10.3031C4.60623 11.2121 5.70727 11.6667 7.00033 11.6667Z" fill="#757575"/>
</svg>
                          2m
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="rounded-full w-28 h-28 overflow-hidden border border-[#757575] bg-gray-800">
                        {/* Placeholder for profile image */}
                      </div>
                      <div className="absolute bottom-0 right-0 bg-white rounded-md p-1">
                      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="25" height="25" rx="4" fill="#CAC5C5"/>
<g clip-path="url(#clip0_2146_2)">
<path d="M6.33301 19V16.3333H19.6663V19H6.33301ZM8.99967 13.6667H9.93301L15.133 8.48334L14.6497 8.00001L14.183 7.53334L8.99967 12.7333V13.6667ZM7.66634 15V12.1667L15.133 4.71668C15.2552 4.59445 15.3969 4.50001 15.558 4.43334C15.7191 4.36668 15.8886 4.33334 16.0663 4.33334C16.2441 4.33334 16.4163 4.36668 16.583 4.43334C16.7497 4.50001 16.8997 4.60001 17.033 4.73334L17.9497 5.66668C18.083 5.7889 18.1802 5.93334 18.2413 6.10001C18.3025 6.26668 18.333 6.4389 18.333 6.61668C18.333 6.78334 18.3025 6.94723 18.2413 7.10834C18.1802 7.26945 18.083 7.41668 17.9497 7.55001L10.4997 15H7.66634ZM15.133 8.48334L14.6497 8.00001L14.183 7.53334L15.133 8.48334Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_2146_2">
<rect width="16" height="16" fill="white" transform="translate(5 3)"/>
</clipPath>
</defs>
</svg>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 border-b border-gray-800">
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-bold">Bio</h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCancel("profile")}
                        className="bg-[#333333] text-white px-3 py-1 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSave("profile")}
                        className="bg-white text-black px-3 py-1 rounded-md"
                      >
                        Save
                      </button>
                    </div>
                  </div>



                  <div className="grid grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-lg font-bold mb-2">First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none"
                        style={{ color: 'CAC5C5' }}
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-bold mb-2">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none"
                        style={{ color: 'CAC5C5' }}
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-lg font-bold mb-2">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none"
                      style={{ color: 'CAC5C5' }}
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block text-lg font-bold mb-2">Short headline</label>
                    <input
                      type="text"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none"
                      style={{ color: 'CAC5C5' }}
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block text-lg font-bold mb-2">Links</label>

                    <div className="flex items-center mb-3">
                      <div className="w-8 mr-2">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="h-6 w-6 text-gray-400"
                          fill="currentColor"
                        >
                          <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        className="flex-1 bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none"
                        style={{ color: '#424242' }}
                        placeholder="https://portfolio.com/"
                      />
                    </div>

                    <div className="flex items-center mb-3">
                      <div className="w-8 mr-2">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gray-400" fill="currentColor">
                          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                        </svg>  
                      </div>
                      <input
                        type="text"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        className="flex-1 bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none"
                        style={{ color: '#424242' }}
                        placeholder="https://www.linkedin.com/in/..."
                      />
                    </div>

                    <div className="flex items-center mb-3">
                      <div className="w-8 mr-2">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gray-400" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        className="flex-1 bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none"
                        style={{ color: '#424242' }}
                        placeholder="https://github.com/"
                      />
                    </div>

                    <div className="flex items-center">
                      <div className="w-8 mr-2">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gray-400" fill="currentColor">
                          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        className="flex-1 bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none"
                        style={{ color: '#424242' }}
                        placeholder="https://x.com/"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Background Section */}
              {!editingBackground ? (
                <div
                  className="shadow-lg overflow-hidden border-t pt-5 pl-6 pr-6"
                  style={{ background: "#111111", borderColor: "#757575" }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-2xl font-bold">Background</h2>
                    <button className="flex items-center gap-1 text-gray-400" onClick={() => setEditingBackground(true)}>
                    <svg width="17" height="17" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 12V10H11V12H1ZM3 8H3.7L7.6 4.1125L7.2375 3.75L6.8875 3.4L3 7.3V8ZM2 9V6.875L7.6 1.2875C7.69167 1.19583 7.79792 1.125 7.91875 1.075C8.03958 1.025 8.16667 1 8.3 1C8.43333 1 8.5625 1.025 8.6875 1.075C8.8125 1.125 8.925 1.2 9.025 1.3L9.7125 2C9.8125 2.09167 9.88542 2.2 9.93125 2.325C9.97708 2.45 10 2.57917 10 2.7125C10 2.8375 9.97708 2.96042 9.93125 3.08125C9.88542 3.20208 9.8125 3.3125 9.7125 3.4125L4.125 9H2ZM7.6 4.1125L7.2375 3.75L6.8875 3.4L7.6 4.1125Z" fill="#CAC5C5"/>
</svg>
                      <span style={{ color: "#CAC5C5" }}>Edit</span>
                    </button>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">Achievement</h3>
                    <p className="text-[#757575]">{achievement}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkills.map((skill, index) => (
                        <div
                          key={index}
                          className="bg-black rounded-full px-3 py-1 border-[1px] border-[#757575] text-white text-sm"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">Discipline</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDisciplines.map((discipline, index) => (
                        <div
                          key={index}
                          className="bg-black rounded-full px-3 py-1 border-[1px] border-[#757575] text-white text-sm"
                        >
                          {discipline}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 border-t" style={{ background: "#111111", borderColor: "#757575" }}>
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-bold">Background</h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCancel("background")}
                        className="bg-[#333333] text-white px-3 py-1 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSave("background")}
                        className="bg-white text-black px-3 py-1 rounded-md"
                      >
                        Save
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">Achievement</h3>
                    <textarea
                      value={achievement}
                      onChange={(e) => setAchievement(e.target.value)}
                      className="w-full bg-black border border-gray-700 rounded-md p-2 text-white"
                      rows="3"
                      style={{ color: '#424242' }}
                    />
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <div
                          key={index}
                          className={`rounded-full px-3 py-1 border-[1px] border-[#757575] cursor-pointer ${selectedSkills.includes(skill) ? "bg-white" : "bg-black"}`}
                          style={{ color: selectedSkills.includes(skill) ? "#000000" : "#757575" }}
                          onClick={() => toggleSkill(skill)}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">Discipline</h3>
                    <div className="flex flex-wrap gap-2">
                      {disciplines.map((discipline, index) => (
                        <div
                          key={index}
                          className={`rounded-full px-3 py-1 border-[1px] border-[#757575] cursor-pointer ${selectedDisciplines.includes(discipline) ? "bg-white" : "bg-black"}`}
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
              <div className="p-6 border-b" style={{ background: "#111111", borderColor: "#757575" }}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-bold">Projects</h2>
                  <button className="text-white bg-transparent border-none">+ Add Project</button>
                </div>

                {!editingProject ? (
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold mb-2">Stealth Project</h3>
                      <button className="flex items-center gap-1 text-gray-400" onClick={() => setEditingProject(true)}>
                      <svg width="17" height="17" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 12V10H11V12H1ZM3 8H3.7L7.6 4.1125L7.2375 3.75L6.8875 3.4L3 7.3V8ZM2 9V6.875L7.6 1.2875C7.69167 1.19583 7.79792 1.125 7.91875 1.075C8.03958 1.025 8.16667 1 8.3 1C8.43333 1 8.5625 1.025 8.6875 1.075C8.8125 1.125 8.925 1.2 9.025 1.3L9.7125 2C9.8125 2.09167 9.88542 2.2 9.93125 2.325C9.97708 2.45 10 2.57917 10 2.7125C10 2.8375 9.97708 2.96042 9.93125 3.08125C9.88542 3.20208 9.8125 3.3125 9.7125 3.4125L4.125 9H2ZM7.6 4.1125L7.2375 3.75L6.8875 3.4L7.6 4.1125Z" fill="#CAC5C5"/>
  </svg>
                        <span style={{ color: "#CAC5C5" }}>Edit</span>
                      </button>
                    </div>
                    <div className="bg-[#1D1C1C] w-14 h-14 rounded-lg"></div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="text-xl font-bold">Stealth Project</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleCancel("project")}
                          className="bg-[#333333] text-white px-3 py-1 rounded-md"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSave("project")}
                          className="bg-white text-black px-3 py-1 rounded-md"
                        >
                          Save
                        </button>
                      </div>
                    </div>

                    <div className="flex mb-5">
                      <div className="bg-[#1D1C1C] w-16 h-16 rounded-lg mr-5"></div>
                      <div className="flex-1">
                        <h4 className="text-base font-bold mb-1">Project name</h4>
                        <input
  type="text"
  placeholder="Pitch your idea in more detail..."
  className="w-full bg-transparent border-none outline-none text-[#424242] pb-2 placeholder:text-sm placeholder:text-[#424242] !important"
/>

                        <h4 className="text-base font-bold mb-1">Idea description</h4>
                        <input
                          type="text"
                          placeholder="Describe your idea in few words..."
                            className="w-full bg-transparent border-none outline-none text-[#424242] pb-2 placeholder:text-sm placeholder:text-[#424242] !important"
                        />

                        <h4 className="text-base font-bold mb-1">Link</h4>
                        <input
                          type="text"
                          placeholder="https://yourproject.com/"
                           className="w-full bg-transparent border-none outline-none text-[#424242] pb-2 placeholder:text-sm placeholder:text-[#424242] !important"
                        />

                        <h4 className="text-base font-bold mb-1">Pitch</h4>
                        <input
                          type="text"
                          placeholder="Pitch your idea in more detail..."
                            className="w-full bg-transparent border-none outline-none text-[#424242] pb-2 placeholder:text-sm placeholder:text-[#424242] !important"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Stage</h3>
                  <div className="flex flex-wrap gap-2">
                    {editingProject ? (
                      stages.map((stage, index) => (
                        <div
                          key={index}
                          className={`rounded-full px-3 py-1 border-[1px] border-[#757575] cursor-pointer text-sm ${projectStage === stage ? "bg-white" : "bg-black"}`}
                          style={{ color: projectStage === stage ? "#000000" : "#757575" }}
                          onClick={() => toggleStage(stage)}
                        >
                          {stage}
                        </div>
                      ))
                    ) : (
                      <div className="bg-black rounded-full px-3 py-1 border-[1px] border-[#757575] text-white text-sm">
                        {projectStage}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Workplace</h3>
                  <div className="flex flex-wrap gap-2">
                    {editingProject ? (
                      workplaces.map((place, index) => (
                        <div
                          key={index}
                          className={`rounded-full px-3 py-1 border-[1px] border-[#757575] cursor-pointer text-sm ${workplace === place ? "bg-white" : "bg-black"}`}
                          style={{ color: workplace === place ? "#000000" : "#757575" }}
                          onClick={() => toggleWorkplace(place)}
                        >
                          {place}
                        </div>
                      ))
                    ) : (
                      <div className="bg-black rounded-full px-3 py-1 border-[1px] border-[#757575] text-white text-sm">
                        {workplace}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
