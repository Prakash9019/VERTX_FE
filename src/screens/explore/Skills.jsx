"use client";
import React, { useState, useEffect } from "react";
import { Header, Sidebar } from "../layout/bars";
import { useNavigate } from "react-router";
import axios from "axios";
import API_KEY from "../../../key";
import gify from "../outreach/gify.gif"

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

  // Fetch existing data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          token: localStorage.getItem('token')
        };
        const response = await axios.get(`${API_KEY}/profile/skills`,{headers}); // API to get saved skills
        console.log(response);
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
      },{headers});
      navigate("/explore/newproject"); // Move to next step
    } catch (error) {
      console.error("Error saving skills:", error);
    }
  };

  if (loading) {
    return <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
                        <img src={gify} alt="Loading..." className="w-20 h-20" />
                      </div>
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className={`flex-1 flex items-center justify-center transition-all ${sidebarOpen ? "ml-64" : "-ml-20"}`}>
          <div className="max-w-4xl w-full px-4">
            <h1 className="text-4xl font-bold mb-2">Skills to survive</h1>
            <p className="text-xl text-gray-400 mb-8">Tell me about your background</p>

            <div className="bg-[#151515] rounded-3xl p-12 shadow-xl border border-white-600">
              {/* Achievement Input */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Achievement</h2>
                <input
                  type="text"
                  placeholder="Something you are proud of..."
                  className="w-full bg-transparent border-b border-gray-600 text-gray-400 p-2 outline-none"
                  value={achievement}
                  onChange={(e) => setAchievement(e.target.value)}
                />
              </div>

              {/* Skills Selection */}
              <h2 className="text-2xl font-bold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {Object.keys(skillsData).map((skill) => (
                  <div
                    key={skill}
                    className={`px-4 py-2 rounded-full cursor-pointer transition ${
                      selectedSkills.includes(skill) ? "bg-white text-black" : "border border-gray-600 text-gray-400"
                    }`}
                    onClick={() => handleSkillClick(skill)}
                  >
                    {skill}
                  </div>
                ))}
              </div>

              {/* Display Disciplines of Selected Skills */}
              {selectedSkills.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-2xl font-bold mb-4">Disciplines</h2>
                  <div className="flex flex-wrap gap-3">
                    {selectedSkills.flatMap((skill) =>
                      skillsData[skill].map((discipline) => (
                        <div
                          key={discipline}
                          className={`px-4 py-2 rounded-full cursor-pointer transition ${
                            selectedDisciplines.includes(discipline) ? "bg-white text-black" : "border border-gray-600 text-gray-400"
                          }`}
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

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button className="bg-[#1D1C1C] text-white font-bold py-3 px-12 rounded-lg border border-gray-600"  onClick={() => navigate(-1)}>
                Back
              </button>
              <button className="bg-white text-black font-bold py-3 px-12 rounded-lg ml-4" onClick={handleSubmit}>
                Save & Continue
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}