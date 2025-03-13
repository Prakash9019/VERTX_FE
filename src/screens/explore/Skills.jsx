"use client";
import React, { useState, useEffect } from "react";
import { Header, Sidebar, Layout, NavIconFooter, MobileFooter } from "../layout/bars"
import { useNavigate } from "react-router";
import axios from "axios";
import API_KEY from "../../../key";
import gify from "../outreach/gify.gif";
import { Search, Target, Users, Grid } from "lucide-react";

// Skills & corresponding disciplines mapping
const skillsData = {
  "Business & Operations": [
    "Client Management", "E-commerce", "HR & Recruitment", "PR (Public Relations)",
    "Business Development", "Business Operations", "Business Strategy",
    "Customer Success", "Finance", "Business Analytics", "Program Management", "Sales"
  ],
  "Growth & Marketing": [
    "Brand Management", "Client Management", "Marketing Management", "Growth Analytics",
    "Growth Operations", "Growth Strategy", "Advertising", "Growth Hacking", "SEO"
  ],
  "Investment & Funding": [
    "Hedge Funds", "Angel Investment", "Investment", "Private Equity",
    "Fundraising", "Venture Capital"
  ],
  "Leadership": [
    "CFO", "CMO", "CPO", "CEO", "Chief of Staff", "COO", "CTO",
    "Management", "Mentoring", "Team Management"
  ],
  "Legal": [
    "Contract Law", "IP Law", "Property Law", "Corporate Law", "Law", "Risk Management"
  ],
  "Product & Design": [
    "Product Ownership", "UI Design", "Visual Design", "CX Design",
    "Product Management", "Service Design", "User Research", "UX Design"
  ],
  "Science": [
    "Biomedical Science", "Chemistry", "Physics", "Biology",
    "Cancer Research", "Genetics", "Healthcare", "Medicine",
    "Neuroscience", "Nutrition", "Psychology"
  ],
  "Software Engineering": [
    "DevOps", "Frontend Dev", "Mobile Dev", "QA (Quality Assurance)",
    "Systems Engineering", "AI", "AR/VR", "Backend Dev", "Blockchain",
    "Cloud Computing", "Cybersecurity", "Data Engineering", "Game Dev", "Web Dev"
  ],
  "Data": [
    "Data Visualisation", "AI", "Blockchain", "Data Analytics",
    "Database Administration", "Data Engineering", "Data Science", "Statistics"
  ],
  "Other": [
    "Access To Grants And Incubators", "Agile", "AI Interviewing", "Algorithmic Trading",
    "Art Direction", "Automation", "Behavioral Science", "Biochemistry",
    "Biomedical Sciences", "Blockchain Strategy", "Blogging"
  ]
};

export default function Skills() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [achievement, setAchievement] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState("explore");

  // Check if device is mobile based on screen width
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Automatically collapse sidebar on mobile
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
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

  // Fetch existing data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          token: localStorage.getItem('token')
        };
        const response = await axios.get(`${API_KEY}/profile/skills`, {headers}); // API to get saved skills
      //  console.log(response);
        const { achievement, skills, disciplines } = response.data.data;
        setAchievement(achievement || "");
        setSelectedSkills(skills || []);
        setSelectedDisciplines(disciplines || []);
      } catch (error) {
        console.error("Error fetching skills data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Toggle skill selection
  const handleSkillClick = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill) // Remove if already selected
        : [...prev, skill] // Add if not selected
    );
  };

  // Toggle discipline selection
  const handleDisciplineClick = (discipline) => {
    setSelectedDisciplines((prev) =>
      prev.includes(discipline)
        ? prev.filter((d) => d !== discipline) // Remove if already selected
        : [...prev, discipline] // Add if not selected
    );
  };

  // Submit data to backend
  const handleSubmit = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        token: localStorage.getItem('token')
      };
      await axios.post(`${API_KEY}/profile/skills`, {
        achievement,
        skills: selectedSkills,
        disciplines: selectedDisciplines
      }, {headers});
      navigate("/explore/newproject"); // Move to next step
    } catch (error) {
      console.error("Error saving skills:", error);
    }
  };

  if (loading) {
    return <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
      <img src={gify} alt="Loading..." className="w-20 h-20" />
    </div>;
  }

  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="flex flex-col min-h-screen" style={{letterSpacing: '-0.04em'}}>
        <div className={`${isMobile ? 'px-4 mt-10 pb-24 flex-grow' : 'flex-1 flex -mt-12 items-center justify-center'} overflow-y-auto`}>
          <div className={`${isMobile ? 'w-full' : 'max-w-3xl w-full px-4'}`}>
            <div className={`text-left ${isMobile ? 'ml-0' : 'ml-0'}`}>
              <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold mb-1`}>Skills to survive</h1>
              <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-[#CAC5C5] mb-4`}>Tell me about your background</p>
            </div>
            
            <div className="bg-[black] rounded-[2rem] p-4 md:p-8 shadow-xl border border-[#1D1C1C] w-full">
              <div className="flex flex-col items-start">
                {/* Achievement Input */}
                <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-3`}>Achievement</h2>
                <div className="relative w-full mb-5">
                  <input 
                    type="text" 
                    placeholder="Something you are proud of..." 
                    className="w-full bg-transparent border-none outline-none text-white placeholder-[#424242] pb-2"
                    value={achievement}
                    onChange={(e) => setAchievement(e.target.value)}
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

                {/* Skills Selection - REDUCED FONT WEIGHT ONLY */}
                <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-3`}>Skills</h2>
                <div className="flex flex-wrap gap-1.5 md:gap-2 w-full">
                  {Object.keys(skillsData).map((skill) => (
                    <div
                      key={skill}
                      className={`${
                        selectedSkills.includes(skill) 
                          ? "bg-white text-black font-normal" 
                          : "bg-transparent border border-[#757575] text-[#757575] font-normal"
                      } rounded-full px-2 py-0.5 md:px-4 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                      onClick={() => handleSkillClick(skill)}
                    >
                      {skill}
                    </div>
                  ))}
                </div>

                {/* Display Disciplines of Selected Skills - REDUCED FONT WEIGHT ONLY */}
                {selectedSkills.length > 0 && (
                  <div className="mt-5 w-full">
                    <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-3`}>Disciplines</h2>
                    <div className="flex flex-wrap gap-1.5 md:gap-2 w-full">
                      {selectedSkills.flatMap((skill) =>
                        skillsData[skill].map((discipline) => (
                          <div
                            key={discipline}
                            className={`${
                              selectedDisciplines.includes(discipline)
                                ? "bg-white text-black font-normal"
                                : "bg-transparent border border-[#757575] text-[#757575] font-normal"
                            } rounded-full px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm cursor-pointer mb-1`}
                            onClick={() => handleDisciplineClick(discipline)}
                          >
                            {discipline}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className={`flex ${isMobile ? 'justify-center mt-6 mb-16 max-sm:gap-4' : 'justify-between mt-6'} w-full`}>
              {isMobile ? (
                <>
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
                </>
              ) : (
                <>
                  <button 
                    className="bg-[#1D1C1C] text-white font-bold py-2 px-8 rounded-[10px] text-lg w-[32%]"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                  <button 
                    className="bg-white text-black font-bold py-2 px-8 rounded-[10px] text-lg w-[64%]"
                    onClick={handleSubmit}
                  >
                    Continue
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Using the MobileFooter component for mobile devices */}
        {isMobile && <MobileFooter currentPage={currentPage} />}
      </div>
    </Layout>
  );
}