import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_KEY from "../../../key";
import gify from "../outreach/gify.gif";
import { Layout } from "../layout/bars";

function ProjectCard({ project }) {
  const [projectData, setProjectData] = useState(project);
  const [imagePreview, setImagePreview] = useState(project.image || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProjectData((prevData) => ({ ...prevData, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_KEY}/profile/projects/${project._id}`, 
        projectData, // projectData should be the second argument
        { headers: { token: localStorage.getItem("token") } } // Headers should be in the third argument
    );
    
      // alert("Project updated successfully!");
    } catch (error) {
      //console.error("Error updating project:", error);
    }
  };

  const handleStageSelect = (stage) => {
    setProjectData((prevData) => ({ ...prevData, stage }));
  };

  const handleWorkplaceSelect = (workplace) => {
    setProjectData((prevData) => ({ ...prevData, workplace }));
  };

  const deleteProject = async (projectId) => {
    try {
      console.log(projectId);
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const response = await axios.delete(`${API_KEY}/profile/projects/${projectId}`, {
        headers: { token: localStorage.getItem("token") }
      });
      window.location.reload();
      // alert("Project deleted successfully");
      return response.data;
    } catch (error) {
      console.error("Error deleting project:", error);
      // alert("Failed to delete project");
    }
  };

  return (
    <>
      <div className="bg-[black] rounded-[2rem] p-4 md:p-6 shadow-xl border border-[#1D1C1C] w-full my-3 md:m-4" style={{ fontFamily: "Manrope", letterSpacing: "-4%" }}>
        <div className="flex flex-col items-start">
          <div className="flex justify-between items-center w-full mb-4">
            <div className="text-[#CAC5C5] text-xl md:text-[25px] font-extrabold">{projectData.name}</div>
            <div className="flex space-x-2 md:space-x-4">
              <button className="px-2 py-1 md:px-4 md:py-2 rounded-[4px] bg-[#1D1C1C] text-sm md:text-base" onClick={()=> deleteProject(projectData._id)}>Cancel</button>
              <button className="bg-white text-black px-2 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base" onClick={handleSave}>Save</button>
            </div>
          </div>

          
          <div className="flex items-start space-x-3 md:space-x-4 w-full mb-4 md:mb-5">
            <div className="bg-[#1D1C1C] w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center relative overflow-hidden">
              {imagePreview || project.img? (
                <img src={imagePreview || project.img} alt="Project" className="w-full h-full object-cover" />
              ) : (
                <label htmlFor={`project-image-${project.id}`} className="cursor-pointer w-full h-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1V15" stroke="#757575" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M1 8H15" stroke="#757575" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </label>
              )}
              <input 
                type="file" 
                id={`project-image-${project.id}`} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload}
              />
              {imagePreview && (
                <label htmlFor={`project-image-${project.id}`} className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1V15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M1 8H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </label>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <h3 className="text-base md:text-lg font-medium">Project name</h3>
              </div>
              <input 
                type="text" 
                name="name"
                value={projectData.name}
                onChange={handleChange}
                placeholder="Stealth project" 
                className="w-full bg-transparent border-none outline-none text-white placeholder-[#424242] pb-2"
              />
              <div className="w-full h-[1px] bg-[#1D1C1C]"></div>
            </div>
          </div>
          
          <div className="w-full mb-4 md:mb-5">
            <div className="flex items-center">
              <div className="invisible w-12 h-4 mr-3 md:w-16 md:mr-4"></div>
              <h3 className="text-base md:text-lg font-medium">Idea description</h3>
            </div>
            <div className="flex">
              <div className="invisible w-12 h-4 mr-3 md:w-16 md:mr-4"></div>
              <div className="flex-1">
                <input 
                  type="text" 
                  name="idea_description"
                  value={projectData.idea_description}
                  onChange={handleChange}
                  placeholder="Describe your idea in few words..." 
                  className="w-full bg-transparent border-none outline-none text-white placeholder-[#424242] pb-2"
                />
                <div className="w-full h-[1px] bg-[#1D1C1C]"></div>
              </div>
            </div>
          </div>
          
          <div className="w-full mb-4 md:mb-5">
            <div className="flex items-center">
              <div className="invisible w-12 h-4 mr-3 md:w-16 md:mr-4"></div>
              <h3 className="text-base md:text-lg font-medium">Link</h3>
            </div>
            <div className="flex">
              <div className="invisible w-12 h-4 mr-3 md:w-16 md:mr-4"></div>
              <div className="flex-1">
                <input 
                  type="text" 
                  name="link"
                  value={projectData.link}
                  onChange={handleChange}
                  placeholder="https://yourproject.com/" 
                  className="w-full bg-transparent border-none outline-none text-white placeholder-[#424242] pb-2"
                />
                <div className="w-full h-[1px] bg-[#1D1C1C]"></div>
              </div>
            </div>
          </div>
          
          <div className="w-full mb-4 md:mb-5">
            <div className="flex items-center">
              <div className="invisible w-12 h-4 mr-3 md:w-16 md:mr-4"></div>
              <h3 className="text-base md:text-lg font-medium">Pitch</h3>
            </div>
            <div className="flex">
              <div className="invisible w-12 h-4 mr-3 md:w-16 md:mr-4"></div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  name="pitch"
                  value={projectData.pitch}
                  onChange={handleChange}
                  placeholder="Pitch your idea in more detail..." 
                  className="w-full bg-transparent border-none outline-none text-white placeholder-[#424242] pb-2"
                />
                <div className="w-full h-[1px] bg-[#1D1C1C]"></div>
                <div className="absolute right-0 bottom-2">
                  <svg width="16" height="35" viewBox="0 0 16 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.59625 28.4953L4.43115 25.3302H10.7613L7.59625 28.4953Z" fill="#757575"/>
                    <path d="M7.99984 5.24999L10.9165 8.16666H5.08317L7.99984 5.24999Z" fill="#757575"/>
                    <rect x="5" y="11" width="6" height="12" fill="#757575"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full mb-3 md:mb-4">
  <h3 className="text-sm md:text-base font-extrabold text-[#CAC5C5]">Stage</h3>
  <div className="flex flex-wrap gap-2 md:gap-3 mt-2">
    {["Idea", "Prototype", "Revenue", "Scale"].map((stage) => (
      <div
        key={stage}
        className={`px-4 py-1.5 rounded-full border border-[#757575] text-[#757575] text-xs md:text-sm cursor-pointer transition ${
          projectData.stage === stage ? "bg-white text-black" : ""
        }`}
        onClick={() => handleStageSelect(stage)}
      >
        {stage}
      </div>
    ))}
  </div>
</div>

<div className="w-full mb-3 md:mb-4">
  <h3 className="text-sm md:text-base font-extrabold text-[#CAC5C5]">Workplace</h3>
  <div className="flex flex-wrap gap-2 md:gap-3 mt-2">
    {["Remote", "Hybrid", "Office"].map((workplace) => (
      <div
        key={workplace}
        className={`px-4 py-1.5 rounded-full border border-[#757575] text-[#757575] text-xs md:text-sm cursor-pointer transition ${
          projectData.workplace === workplace ? "bg-white text-black" : ""
        }`}
        onClick={() => handleWorkplaceSelect(workplace)}
      >
        {workplace}
      </div>
    ))}
  </div>
</div>
        </div>
      </div>
    </>
  );
}

export default function AddaProject() {
  const navigate = useNavigate();
  const { profileId } = useParams(); // Get profileId from URL
  const [selectedStage, setSelectedStage] = useState("");
  const [selectedWorkplace, setSelectedWorkplace] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    idea_description: "",
    link: "",
    pitch: "",
    stage: "",
    workplace: "",
    img: ""
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNewInput, setShowNewInput] = useState(false); // Show input form
  const [isMobile, setIsMobile] = useState(false);


  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
  //  console.log(reader.result);
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append("avatar", file);
    // console.log(userId);
    const response= await axios.post(`${API_KEY}/profile/${userId}/upload-avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
   console.log(response.data)
    
  };
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

  const handleStageSelect = (stage) => {
    setSelectedStage(stage);
    setNewProject(prev => ({ ...prev, stage }));
  };

  const handleWorkplaceSelect = (workplace) => {
    setSelectedWorkplace(workplace);
    setNewProject(prev => ({ ...prev, workplace }));
  };

  useEffect(() => {
    fetch(`${API_KEY}/profile/projects/fetch` , {headers: {
        token: localStorage.getItem('token')
      }})
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        console.log(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Base64 preview for UI
        setNewProject(prev => ({
          ...prev,
          img: file, // Store actual File object, not Base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const SavetheProject = async () => {
    if (!newProject.name || !newProject.stage || !newProject.workplace) {
      alert("Please fill all required fields");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", newProject.name);
    formData.append("idea_description", newProject.idea_description);
    formData.append("link", newProject.link);
    formData.append("pitch", newProject.pitch);
    formData.append("stage", newProject.stage);
    formData.append("workplace", newProject.workplace);
  
    if (newProject.img instanceof File) { 
      formData.append("image", newProject.img); // ✅ Ensure it's a File
    } else {
      console.error("Image is not a valid file");
    }
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      const response = await fetch(`${API_KEY}/profile/projects`, {
        method: "POST",
        headers: { token: localStorage.getItem("token") }, // No Content-Type needed for FormData
        body: formData,
      });
  
      if (response.ok) {
        const addedProject = await response.json();
        console.log("Project saved:", addedProject);
        setProjects([...projects, addedProject]);
        setShowNewInput(false);
        setImagePreview(null);
        setNewProject({
          name: "",
          idea_description: "",
          link: "",
          pitch: "",
          stage: "",
          workplace: "",
          img: null, // Reset image
        });
      } else {
        console.error("Failed to save project:", await response.text());
      }
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };
  
  

  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="flex flex-col min-h-screen" style={{ fontFamily: "Manrope", letterSpacing: "-4%" }}>
        <div className={`${isMobile ? 'px-4 pt-6 mt-4 pb-20' : 'max-w-3xl w-full px-4 mx-auto pt-4'} overflow-y-auto flex-grow`}>
          <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold mb-2`}>Showcase your project</h1>
          <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-[#CAC5C5] mb-6 md:mb-8`}>What have you built so far?</p>

          {loading ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
              <img src={gify} alt="Loading..." className="w-16 h-16 md:w-20 md:h-20" />
            </div>
          ) : projects.length === 0 ? (
<div className="bg-[#151515] rounded-[2rem] p-6 md:p-10 shadow-xl border border-white-600 w-full">
<h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Projects</h2>
  <div className="flex flex-col items-center">
  
    <button
      className="bg-black rounded-full px-4 py-2 md:px-6 md:py-3 border border-gray-600 text-white hover:bg-gray-800 transition-colors text-sm md:text-base"
      onClick={() => setShowNewInput(true)}
    >
      Add Project
    </button>
  </div>
</div>

          ) : (
            <div className="flex flex-col items-start" key={123}>
              <div className="flex justify-between items-center w-full mb-3 md:mb-4">
                <h2 className="text-xl md:text-2xl font-bold">Projects</h2>
                <button className="flex items-center text-[#757575] text-sm md:text-base" onClick={() => setShowNewInput(true)}>
                  <span className="text-xl md:text-2xl mr-1">+</span> Add Project
                </button>
              </div>
              {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
          )}

{showNewInput && (
  <div className="bg-[#151515] rounded-[2rem] p-4 md:p-6 shadow-xl border border-[#1D1C1C] w-full my-4">
    <div className="flex flex-col items-start">
      <div className="flex justify-between items-center w-full mb-4">
        <div className="text-[#CAC5C5] text-xl md:text-[25px] font-extrabold">{newProject.name || "Stealth Project"}</div>
        <div className="flex space-x-2 md:space-x-4">
          <button className="px-2 py-1 md:px-4 md:py-2 rounded-[4px] bg-[#1D1C1C] text-sm md:text-base" onClick={() => setShowNewInput(false)}>Cancel</button>
          <button className="bg-white text-black px-2 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base" onClick={SavetheProject}>Save</button>
        </div>
      </div>
      
      <div className="flex items-start space-x-3 md:space-x-4 w-full mb-4 md:mb-5">
        <div className="bg-[#1D1C1C] w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center relative overflow-hidden">
          { imagePreview ? (
            <img src={imagePreview } alt="Project" className="w-full h-full object-cover" />
          ) : (
            <label htmlFor="new-project-image" className="cursor-pointer w-full h-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1V15" stroke="#757575" strokeWidth="2" strokeLinecap="round"/>
                <path d="M1 8H15" stroke="#757575" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </label>
          )}
          <input 
            type="file" 
            id="new-project-image" 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload}
          />
          {imagePreview && (
            <label htmlFor="new-project-image" className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1V15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M1 8H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </label>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="text-base md:text-lg font-medium">Project name</h3>
          </div>
          <input 
            type="text" 
            name="name"
            value={newProject.name}
            onChange={handleInputChange}
            placeholder="Stealth project" 
            className="w-full bg-transparent border-none outline-none text-white placeholder-[#424242] pb-2"
          />
          <div className="w-full h-[1px] bg-[#1D1C1C]"></div>
        </div>
      </div>
      
      <div className="w-full mb-4 md:mb-5">
        <div className="flex items-center">
          <div className="invisible w-12 h-4 mr-3 md:w-16 md:mr-4"></div>
          <h3 className="text-base md:text-lg font-medium">Idea description</h3>
        </div>
        <div className="flex">
          <div className="invisible w-12 h-4 mr-3 md:w-16 md:mr-4"></div>
          <div className="flex-1">
            <input 
              type="text" 
              name="idea_description"
              value={newProject.idea_description}
              onChange={handleInputChange}
              placeholder="Describe your idea in few words..." 
              className="w-full bg-transparent border-none outline-none text-white placeholder-[#424242] pb-2"
            />
            <div className="w-full h-[1px] bg-[#1D1C1C]"></div>
          </div>
        </div>
      </div>
      
      <div className="w-full mb-4 md:mb-5">
        <div className="flex items-center">
          <div className="invisible w-12 h-4 mr-3 md:w-16 md:mr-4"></div>
          <h3 className="text-base md:text-lg font-medium">Link</h3>
        </div>
        <div className="flex">
          <div className="invisible w-12 h-4 mr-3 md:w-16 md:mr-4"></div>
          <div className="flex-1">
            <input 
              type="text" 
              name="link"
              value={newProject.link}
              onChange={handleInputChange}
              placeholder="https://yourproject.com/" 
              className="w-full bg-transparent border-none outline-none text-white placeholder-[#424242] pb-2"
            />
            <div className="w-full h-[1px] bg-[#1D1C1C]"></div>
          </div>
        </div>
      </div>
      
      <div className="w-full mb-4 md:mb-5">
        <div className="flex items-center">
          <div className="invisible w-12 h-4 mr-3 md:w-16 md:mr-4"></div>
          <h3 className="text-base md:text-lg font-medium">Pitch</h3>
        </div>
        <div className="flex">
          <div className="invisible w-12 h-4 mr-3 md:w-16 md:mr-4"></div>
          <div className="flex-1 relative">
            <input
              type="text"
              name="pitch"
              value={newProject.pitch}
              onChange={handleInputChange}
              placeholder="Pitch your idea in more detail..." 
              className="w-full bg-transparent border-none outline-none text-white placeholder-[#424242] pb-2"
            />
            <div className="w-full h-[1px] bg-[#1D1C1C]"></div>
            <div className="absolute right-0 bottom-2">
              <svg width="16" height="35" viewBox="0 0 16 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.59625 28.4953L4.43115 25.3302H10.7613L7.59625 28.4953Z" fill="#757575"/>
                <path d="M7.99984 5.24999L10.9165 8.16666H5.08317L7.99984 5.24999Z" fill="#757575"/>
                <rect x="5" y="11" width="6" height="12" fill="#757575"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full mb-3 md:mb-4">
        <h3 className="text-base md:text-lg font-extrabold text-[#CAC5C5]">Stage</h3>
        <div className="flex flex-wrap gap-2 md:gap-3 mt-2">
          {["Idea", "Prototype", "Revenue", "Scale"].map((stage) => (
            <div
              key={stage}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-full border text-[#757575] text-sm md:text-base cursor-pointer ${
                selectedStage === stage ? "bg-white text-black" : "border-[#757575] border-[0.5px]"
              }`}
              onClick={() => handleStageSelect(stage)}
            >
              {stage}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full mb-3 md:mb-4">
        <h3 className="text-base md:text-lg font-extrabold text-[#CAC5C5]">Workplace</h3>
        <div className="flex flex-wrap gap-2 md:gap-3 mt-2">
          {["Remote", "Hybrid", "Office"].map((workplace) => (
            <div
              key={workplace}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-full border text-[#757575] text-sm md:text-base cursor-pointer ${
                selectedWorkplace === workplace ? "bg-white text-black" : "border-[#757575] border-[0.5px]"
              }`}
              onClick={() => handleWorkplaceSelect(workplace)}
            >
              {workplace}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}

<div className="flex justify-between w-full mt-6 mb-6 gap-6">
  <button 
    className="bg-[#1D1C1C] text-white font-bold py-2 px-4 rounded-[10px] text-lg w-[34%] ml-4"
    onClick={() => navigate(-1)}
  >
    Back
  </button>
  <button 
    className="bg-white text-black font-bold py-3 px-4 rounded-[10px] text-lg w-[65%]"
    onClick={() => navigate("/explore/prefernce")}
  >
    Continue
  </button>
</div>


      </div>
    </div>
  </Layout>
);
}