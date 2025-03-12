"use client"

import { useState,useEffect } from "react"
import { Header, Sidebar } from "../layout/bars"
import axios from "axios"
import API_KEY from "../../../key";
import { Layout, MobileFooter } from "../layout/bars"
import {User} from "lucide-react"
function timeDifference(createdAt) {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  const diffMs = currentDate - createdDate; // Difference in milliseconds
  const diffMins = Math.round(diffMs / (1000 * 60)); // Convert to minutes
  const diffHours = Math.round(diffMs / (1000 * 60 * 60)); // Convert to hours

  if (diffMins < 60) {
    return `${diffMins} min ago`;
  } else {
    return `${diffHours} hr ago`;
  }
}

export default function Bio() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [editingProfile, setEditingProfile] = useState(false)
  const [editingBackground, setEditingBackground] = useState(false)
  const [editingProject, setEditingProject] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [time, setTimeDifference] = useState(0);
  const [achievement, setAchievement] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    headline: "",
    portfolioLink: "",
    linkedinLink: "",
    github:"",
    avatar:"",
    twitter:""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [userId, setUserId] =useState("");
  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_KEY}/profile/fetch`,{headers: {'Content-Type': 'application/json',
          token: localStorage.getItem('token')
        }});
        // //console.log(response.data[0]);
        if (response.data.length > 0) {
          setUserId(response.data[0].user);
          setFormData(response.data[0]);
          localStorage.setItem("dip",response.data[0].avatar);
          setTimeDifference(timeDifference(response.data[0].createdAt));
          setAchievement(response.data[0].achievement);
          setSelectedSkills(response.data[0].skills);
          setSelectedDisciplines(response.data[0].disciplines);
          // setIsEditing(true); // Enable edit mode if data exists
        }
      } catch (error) {
        //console.error("Error fetching user data:", error);
      } 
      // finally {
      //   setLoading(false);
      // }
    };

    fetchUserData();
  }, []);

  const [projects, setProjects] = useState([]); // Holds project list
  // const [editingProject, setEditingProject] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectPitch, setProjectPitch] = useState("");
  const [projectStage, setProjectStage] = useState("");
  const [projectWorkplace, setProjectWorkplace] = useState("");

  // Fetch Projects from Backend
  useEffect(() => {
    fetch(`${API_KEY}/profile/projects/fetch` , {headers: {'Content-Type': 'application/json',
      token: localStorage.getItem('token')
    }})
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  // Handle "Edit" Button Click
  const handleEdit = (project) => {
    setEditingProject(true);
    setProjectId(project._id);
    setProjectName(project.name);
    setProjectDescription(project.idea_description);
    setProjectLink(project.link);
    setProjectPitch(project.pitch);
    setProjectStage(project.stage);
    setProjectWorkplace(project.workplace);
  };

  // Handle "Add Project" Button Click
  const handleAddProject = () => {
    setEditingProject(true);
    setProjectId(null);
    setProjectName("");
    setProjectDescription("");
    setProjectLink("");
    setProjectPitch("");
    setProjectStage("");
    setProjectWorkplace("");
  };

  // Handle Save (Update or Create)
  const handleSave2 = () => {
    const payload = {
      name: projectName,
      idea_description: projectDescription,
      link: projectLink,
      pitch: projectPitch,
      stage: projectStage,
      workplace: projectWorkplace,
    };

    if (projectId) {
      // Update Existing Project
      fetch(`${API_KEY}/profile/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" , "token" :localStorage.getItem("token") },
        body: JSON.stringify(payload),
      }).then(() => {
        setProjects((prev) =>
          prev.map((proj) =>
            proj._id === projectId ? { ...proj, ...payload } : proj
          )
        );
        setEditingProject(false);
      });
    } else {
      // Create New Project
      fetch("${API_KEY}/profile/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" , "token": localStorage.getItem("token") },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((newProject) => {
          setProjects((prev) => [...prev, newProject]);
          setEditingProject(false);
        });
    }
  };


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

  const stages = ["Idea", "Prototype", "Revenue", "Scale"]
  const workplaces = ["Remote", "Hybrid", "Office"]
  const [Eicon,setIcon] = useState(false);
  
    

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
  const BackgroundSave = async () => {
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
      // navigate("/newproject"); // Move to next step
    } catch (error) {
      //console.error("Error saving skills:", error);
    }
  };

  const ProfileSave = async () => {
    // e.preventDefault();
    
    try {
      const response = await fetch(`${API_KEY}/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          token: localStorage.getItem('token')
         },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Successfully submitted!");
        // navigate("/putaface")
      } else {
        setMessage(result.error || "Something went wrong!");
      }
    } catch (error) {
      setMessage("Server error! Try again later.");
    }
  };

  const handleSave = async (section) => {
    if (section === "profile") {
       await ProfileSave();
      setEditingProfile(false)
    } else if (section === "background") {
      await BackgroundSave();
      setEditingBackground(false);
    } else if (section === "project") {
      await handleSave2();
      setEditingProject(false)
    }
  }

  const handleCancel = (section) => {
    if (section === "profile") {
      setEditingProfile(false)
    } else if (section === "background") {
      setEditingBackground(false)
    } else if (section === "project") {
      setEditingProject(false);
    }
  }
  const handleStageSelect = (stage) => {
    setProjectStage(stage);
  };

  const handleEdit2 = () =>{
    setIcon(!Eicon);
  }
   const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append("avatar", file);
    // console.log(userId);
    const response= await axios.post(`${API_KEY}/profile/${userId}/upload-avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    localStorage.setItem("dip",response.data.avatar);
   // console.log(response.data)
  };


  const handleWorkplaceSelect = (workplace) => {
    setProjectWorkplace(workplace);
  };
  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className={`${isMobile ? 'px-4 pb-24 pt-3' : 'w-full px-4 mx-auto mt-16'} overflow-y-auto`} style={{ fontFamily: 'Manrope', letterSpacing: '-4%' }}>
        <div className="max-w-3xl w-full mx-auto">
          
        <div className="flex justify-end space-x-2 mb-4 pr-12">
        <button onClick={()=> handleEdit2()}> 
        <svg width="21" height="21" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path d="M3.33333 7.71667V8.66667Z" fill="white"/>
          </svg>
          </button>
          <svg width="21" height="21" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="15" height="15" stroke="black"/>
<path d="M6.1664 10.3333Z" fill="#757575"/>
</svg>
            </div>
          <div className="bg-black rounded-[2rem] shadow-lg overflow-hidden border" 
            style={{ 
              borderColor: "#757575", 
              width: isMobile ? '100%' : 'auto',
              maxWidth: isMobile ? '100%' : '48rem',
              borderRadius: '2rem',
              borderWidth: '1px'
            }}
          >
            {/* Editing Profile Section with Mobile Responsiveness */}
            {!editingProfile ? (
                 <div className="p-6 border-b border-gray-800">
                 <div className="flex justify-between items-center">
                   <div>
                   <div className="flex items-center justify-between mb-5">
                       <h1 className="text-4xl font-bold">{formData.firstName + " "+ formData.lastName}</h1>
                     </div>
                     <p className="text-[25px] text-[#D9D9D9] mb-1">{formData.city}</p>
                     <p className="text-xl text-gray-400 mb-4">@{localStorage.getItem("user") || "username"}</p>
                     <p className="text-xl mb-6">{formData.headline}</p>

                   </div>

                   <div className="relative">
                 { Eicon && <button className="ml-[3.5rem] flex items-center gap-1 text-gray-400 mb-[3rem]" onClick={() => setEditingProfile(true)}>
                 <svg width="17" height="17" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 12V.1125Z" fill="#CAC5C5"/>
</svg>
                         <span style={{ color: "#CAC5C5" }}>Edit</span>
                       </button>}









                       <div className="rounded-full w-28 h-28 overflow-hidden border border-[#757575] bg-gray-800 flex items-center justify-center">
  {avatar || localStorage.getItem("dip") || formData.avatar  ? (
    <img
      alt="User Avatar"
      className="w-full h-full object-cover"
      src={avatar || formData.avatar || localStorage.getItem("dip") }
    />
  ) : (
    <svg
    className="w-full h-full object-cover"
    viewBox="0 0 469 469"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="234.5" cy="234.5" r="234.5" fill="#111111" />
    <circle cx="234.5" cy="217.5" r="91" fill="#EEEEEE" fillOpacity="0.93" />
    <path
      d="M379.86 17.556Z"
      fill="#EEEEEE"
      fillOpacity="0.933333"
    />
  </svg>
  )}
</div>

<label htmlFor="avatarUpload" className="absolute bottom-0 right-0 bg-white rounded-md p-1">
<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="25" height="25" rx="4" fill="#CAC5C5"/>
<g clip-path="url(#clip0_2146_2)">
<path d="M6.33301 133 8.48334Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_2146_2">
<rect width="16" height="16" fill="white" transform="translate(5 3)"/>
</clipPath>
</defs>
</svg>
                     </label>
                     <input type="file" id="avatarUpload" accept="image/*" onChange={handleAvatarChange} className="hidden" />
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



                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-base sm:text-lg font-bold mb-2">First Name</label>
                    <input
                        type="text"
                       name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none text-sm sm:text-base"
                        style={{ color: 'white' }}
                      />
                    </div>
                    <div>
                      <label className="block text-base sm:text-lg font-bold mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                      value={formData.lastName}
                        className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none text-sm sm:text-base"
                        style={{ color: 'white' }}
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-base sm:text-lg font-bold mb-2">City</label>
                    <input
                      type="text"
                      name="city"
  
                      onChange={handleChange}
                      value={formData.city}
                      className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none text-sm sm:text-base"
                      style={{ color: 'white' }}
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block text-base sm:text-lg font-bold mb-2">Short headline</label>
                    <input
                      type="text"
                      name="headline"
                      onChange={handleChange}
                      value={formData.headline}
                      className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none text-sm sm:text-base"
                      style={{ color: 'white' }}
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block text-base sm:text-lg font-bold mb-2">Links</label>

                    <div className="flex items-center mb-3">
                      <div className="w-8 mr-2">
                      <svg width="24" height="24" viewBox="0 0 14 14"  fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.33334 12.25999Z" fill="#757575"/>
                    </svg>
                      </div>
                      <input
                        type="text"
                        name="portfolioLink"
                        onChange={handleChange}
                        value={formData.portfolioLink}
                        className="flex-1 bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none text-sm sm:text-base"
                        style={{ color: 'white' }}
                        placeholder="https://portfolio.com/"
                      />
                    </div>

                    <div className="flex items-center mb-3">
                      <div className="w-8 mr-2">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gray-400" fill="currentColor">
                          <path d="M20.5  3.36 3.66z"></path>
                        </svg>  
                      </div>
                      <input
                        type="text"
                        name="linkedinLink"
                        onChange={handleChange}
                        value={formData.linkedinLink}
                        className="flex-1 bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none text-sm sm:text-base"
                        style={{ color: 'white' }}
                        placeholder="https://www.linkedin.com/in/..."
                      />
                    </div>

                    <div className="flex items-center mb-3">
                      <div className="w-8 mr-2">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gray-400" fill="currentColor">
                          <path d="M12 0c-6.626 0-12.373-12-12-12z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="github"
                        onChange={handleChange}
                      value={formData.github}
                        className="flex-1 bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none text-sm sm:text-base"
                        style={{ color: 'white' }}
                        placeholder="https://github.com/"
                      />
                    </div>

                    <div className="flex items-center">
                      <div className="w-8 mr-2">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gray-400" fill="currentColor">
                          <path d="M18.901 1.124H4.298Z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="twitter"
                        onChange={handleChange}
                        value={formData.twitter}
                        className="flex-1 bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none"
                        style={{ color: 'white' }}
                        placeholder="https://x.com/"
                      />
                    </div>
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
                {Eicon &&  <button className="flex items-center gap-1 text-gray-400" onClick={() => setEditingBackground(true)}>
                <svg width="17" height="17" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 12V10H11V12.1125Z" fill="#CAC5C5"/>
</svg>
                      <span style={{ color: "#CAC5C5" }}>Edit</span>
                    </button>}
                  </div>


                  <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: "#CAC5C5" }}>Achievement</h3>
                  <p className="text-[#757575] text-sm sm:text-base">{formData.achievement}</p>
                  </div>

                  <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: "#CAC5C5" }}>Skills</h3>
                  <div className="flex flex-wrap gap-2">
                      {formData.skills?.map((skill, index) => (
                        <div
                          key={index}
                          className="bg-black rounded-full px-3 py-1 border-[1px] border-[#757575] text-white text-xs sm:text-sm" >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: "#CAC5C5" }}>Discipline</h3>
                  <div className="flex flex-wrap gap-2">
                      {formData.disciplines?.map((discipline, index) => (
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

                  <div className="mb-5">
                    <h3 className="text-base sm:text-xl font-bold mb-2" style={{ color: "#CAC5C5" }}>Achievement</h3>
                    <textarea
                      value={achievement}
                      onChange={(e) => setAchievement(e.target.value)}
                      className="w-full bg-black border border-gray-700 rounded-md p-2 text-white text-sm sm:text-base"
                      rows="3"
                      style={{ color: 'white' }}
                    />
                  </div>

               
                  <div className="mb-5">
                  <h3 className="text-base sm:text-xl font-bold mb-2" style={{ color: "#CAC5C5" }}>Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(skillsData).map((skill) => (
                  <div
                  className={`rounded-full px-3 py-1 border-[1px] border-[#757575] cursor-pointer text-xs sm:text-sm ${selectedSkills.includes(skill) ? "bg-white" : "bg-black"}`}
                  style={{ color: selectedSkills.includes(skill) ? "#000000" : "#CAC5C5" }}

                    onClick={() => handleSkillClick(skill)}
                  >
                    {skill}
                  </div>
                ))}
                    </div>
                  </div>

                  <div className="mb-5">
                  <h3 className="text-base sm:text-xl font-bold mb-2" style={{ color: "#CAC5C5" }}>Discipline</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.flatMap((skill) =>
                      skillsData[skill].map((discipline) => (
                        <div
                          key={discipline}
                          className={`rounded-full px-3 py-1 border-[1px] border-[#757575] cursor-pointer text-xs sm:text-sm ${selectedDisciplines.includes(discipline) ? "bg-white" : "bg-black"}`}
                        style={{ color: selectedDisciplines.includes(discipline) ? "#000000" : "#CAC5C5" }}

                          onClick={() => handleDisciplineClick(discipline)}
                        >
                          {discipline}
                        </div>
                      ))
                    )}
                    </div>
                  </div>
                </div>
              )}

{/* Projects Section */}
<div className="p-4 sm:p-6 " style={{ background: "#111111", borderColor: "#757575", borderBottomLeftRadius: '2rem', borderBottomRightRadius: '2rem' }}>
  <div className="flex items-center justify-between mb-5">
    <h2 className="text-xl sm:text-2xl font-bold">Projects</h2>
    <button className="text-white bg-transparent border-none text-sm sm:text-base" onClick={handleAddProject}>+ Add Project</button>
  </div>

  {!editingProject ? (
    <div className="mb-6">
      <div className="flex flex-col items-center justify-between">
        {projects.map((project, index) => (
          <div className="flex flex-row w-full justify-between items-center" key={index}>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-left flex-grow">{project.name}</h3>
            
            {Eicon && <button className="flex items-center gap-1 text-gray-400" onClick={() => handleEdit(project)}>
            <svg width="17" height="17" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 12V10H11V1.6 4.1125Z" fill="#CAC5C5"/>
        </svg>
              <span style={{ color: "#CAC5C5" }}>Edit</span>
            </button>}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg sm:text-xl font-bold">{projectName}</h3>
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
              placeholder="Pitch your idea in more detail.."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white text-xs sm:text-sm placeholder:text-[#424242]"
            />
          </div>
          <div> 
            <h4 className="text-sm sm:text-base font-bold mb-1">Idea description</h4>
            <input
              type="text"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Describe your idea in few words..."
              className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white text-xs sm:text-sm placeholder:text-[#424242]"
            />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold mb-1">Link</h4>
            <input
              type="text"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              placeholder="https://yourproject.com/"
              className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white text-xs sm:text-sm placeholder:text-[#424242]"
            />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold mb-1">Pitch</h4>
            <input
              type="text"
              value={projectPitch}
              onChange={(e) => setProjectPitch(e.target.value)}
              placeholder="Pitch your idea in more detail..."
              className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white text-xs sm:text-sm placeholder:text-[#424242]"
            />
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h3 className="text-sm sm:text-xl font-bold mb-2">Stage</h3>
        <div className="flex flex-wrap gap-2">
          {editingProject ? (
            <>
              {["Idea", "Prototype", "Revenue", "Scale"].map((stage) => (
                <div
                  key={stage}
                  className={`rounded-full px-3 py-1 border-[1px] border-[#757575] cursor-pointer text-xs sm:text-sm ${projectStage === stage ? "bg-white" : "bg-black"}`}
                  style={{ color: projectStage === stage ? "#000000" : "#CAC5C5" }}
                  onClick={() => handleStageSelect(stage)}
                >
                  {stage}
                </div>
              ))}
            </>
          ) : (
            <div
              className={`rounded-full px-3 py-1 border-[1px] border-[#757575] cursor-pointer text-xs sm:text-sm bg-black`}
            >
              {projectStage}
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm sm:text-xl font-bold mb-2">Workplace</h3>
        <div className="flex flex-wrap gap-2">
          {editingProject ? (
            <>
              {["Remote", "Hybrid", "Office"].map((workplace) => (
                <div
                  key={workplace}
                  className={`rounded-full px-3 py-1 border-[1px] border-[#757575] cursor-pointer text-xs sm:text-sm ${
                    projectWorkplace === workplace ? "bg-white" : "bg-black"
                  }`}
                  style={{ color: projectWorkplace === workplace ? "#000000" : "#CAC5C5" }}
                  onClick={() => handleWorkplaceSelect(workplace)}
                >
                  {workplace}
                </div>
              ))}
            </>
          ) : (
            <div className="rounded-full px-3 py-1 border-[1px] border-[#757575] text-xs sm:text-sm">
              {projectWorkplace}
            </div>
          )}
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

