"use client";

import { useState, useEffect } from "react";
import { Header, Sidebar } from "../layout/bars";
import axios from "axios";
import API_KEY from "../../../key";
import { Layout, MobileFooter } from "../layout/bars";
import { User } from "lucide-react";
import NotificationSettings from "./Notification";
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingBackground, setEditingBackground] = useState(false);
  const [editingProject, setEditingProject] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
    github: "",
    avatar: "",
    twitter: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [userId, setUserId] = useState("");
  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_KEY}/profile/fetch`, {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        });
        // //console.log(response.data[0]);
        if (response.data.length > 0) {
          setUserId(response.data[0].user);
          setFormData(response.data[0]);
          localStorage.setItem("dip", response.data[0].avatar);
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
  const [imagePreview, setImagePreview] = useState("");
  // Fetch Projects from Backend
  useEffect(() => {
    fetch(`${API_KEY}/profile/projects/fetch`, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
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
    setImagePreview(project.img);
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
    setImagePreview("");
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
      img: imagePreview,
    };

    if (projectId) {
      // Update Existing Project
      fetch(`${API_KEY}/profile/projects/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
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
      fetch(`${API_KEY}/profile/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
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
      "Client Management",
      "E-commerce",
      "HR & Recruitment",
      "PR (Public Relations)",
      "Business Development",
      "Business Operations",
      "Business Strategy",
      "Customer Success",
      "Finance",
      "Business Analytics",
      "Program Management",
      "Sales",
    ],
    "Growth & Marketing": [
      "Brand Management",
      "Client Management",
      "Marketing Management",
      "Growth Analytics",
      "Growth Operations",
      "Growth Strategy",
      "Advertising",
      "Growth Hacking",
      "SEO",
    ],
    "Investment & Funding": [
      "Hedge Funds",
      "Angel Investment",
      "Investment",
      "Private Equity",
      "Fundraising",
      "Venture Capital",
    ],
    Leadership: [
      "CFO",
      "CMO",
      "CPO",
      "CEO",
      "Chief of Staff",
      "COO",
      "CTO",
      "Management",
      "Mentoring",
      "Team Management",
    ],
    Legal: [
      "Contract Law",
      "IP Law",
      "Property Law",
      "Corporate Law",
      "Law",
      "Risk Management",
    ],
    "Product & Design": [
      "Product Ownership",
      "UI Design",
      "Visual Design",
      "CX Design",
      "Product Management",
      "Service Design",
      "User Research",
      "UX Design",
    ],
    Science: [
      "Biomedical Science",
      "Chemistry",
      "Physics",
      "Biology",
      "Cancer Research",
      "Genetics",
      "Healthcare",
      "Medicine",
      "Neuroscience",
      "Nutrition",
      "Psychology",
    ],
    "Software Engineering": [
      "DevOps",
      "Frontend Dev",
      "Mobile Dev",
      "QA (Quality Assurance)",
      "Systems Engineering",
      "AI",
      "AR/VR",
      "Backend Dev",
      "Blockchain",
      "Cloud Computing",
      "Cybersecurity",
      "Data Engineering",
      "Game Dev",
      "Web Dev",
    ],
    Data: [
      "Data Visualisation",
      "AI",
      "Blockchain",
      "Data Analytics",
      "Database Administration",
      "Data Engineering",
      "Data Science",
      "Statistics",
    ],
    Other: [
      "Access To Grants And Incubators",
      "Agile",
      "AI Interviewing",
      "Algorithmic Trading",
      "Art Direction",
      "Automation",
      "Behavioral Science",
      "Biochemistry",
      "Biomedical Sciences",
      "Blockchain Strategy",
      "Blogging",
    ],
  };

  const stages = ["Idea", "Prototype", "Revenue", "Scale"];
  const workplaces = ["Remote", "Hybrid", "Office"];
  const [Eicon, setIcon] = useState(false);
  const [setting, setSetting] = useState(false);

  const handleSkillClick = (skill) => {
    setSelectedSkills(
      (prev) =>
        prev.includes(skill)
          ? prev.filter((s) => s !== skill) // Remove if already selected
          : [...prev, skill] // Add if not selected
    );
  };

  // Toggle discipline selection
  const handleDisciplineClick = (discipline) => {
    setSelectedDisciplines(
      (prev) =>
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
        token: localStorage.getItem("token"),
      };
      await axios.post(
        `${API_KEY}/profile/skills`,
        {
          achievement,
          skills: selectedSkills,
          disciplines: selectedDisciplines,
        },
        { headers }
      );
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
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
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
      setEditingProfile(false);
    } else if (section === "background") {
      await BackgroundSave();
      setEditingBackground(false);
    } else if (section === "project") {
      await handleSave2();
      setEditingProject(false);
    }
  };

  const handleCancel = (section) => {
    if (section === "profile") {
      setEditingProfile(false);
    } else if (section === "background") {
      setEditingBackground(false);
    } else if (section === "project") {
      setEditingProject(false);
    }
  };
  const handleStageSelect = (stage) => {
    setProjectStage(stage);
  };

  const handleEdit2 = () => {
    setIcon(!Eicon);
  };

  const handleSetting = () => {
    setSetting(!setting);
  };
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append("avatar", file);
    // console.log(userId);
    const response = await axios.post(
      `${API_KEY}/profile/${userId}/upload-avatar`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    localStorage.setItem("dip", response.data.avatar);
    // console.log(response.data)
  };

  const handleWorkplaceSelect = (workplace) => {
    setProjectWorkplace(workplace);
  };
  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div
        className={`${
          isMobile ? "px-4 pb-24 pt-3" : "w-full px-4 mx-auto " //mt-16 removed
        } overflow-y-auto`}
        style={{ fontFamily: "Manrope", letterSpacing: "-4%" }}
      >
        <div className="max-w-3xl w-full mx-auto">
          <div className="flex justify-end space-x-2 mb-4 pr-12">
            <button onClick={() => handleEdit2()}>
              <svg
                width="21"
                height="21"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33333 14C2.96667 14 2.65278 13.8694 2.39167 13.6083C2.13056 13.3472 2 13.0333 2 12.6667V3.33333C2 2.96667 2.13056 2.65278 2.39167 2.39167C2.65278 2.13056 2.96667 2 3.33333 2H9.28333L7.95 3.33333H3.33333V12.6667H12.6667V8.03333L14 6.7V12.6667C14 13.0333 13.8694 13.3472 13.6083 13.6083C13.3472 13.8694 13.0333 14 12.6667 14H3.33333ZM6 10V7.16667L12.1167 1.05C12.25 0.916668 12.4 0.816668 12.5667 0.750002C12.7333 0.683335 12.9 0.650002 13.0667 0.650002C13.2444 0.650002 13.4139 0.683335 13.575 0.750002C13.7361 0.816668 13.8833 0.916668 14.0167 1.05L14.95 2C15.0722 2.13333 15.1667 2.28056 15.2333 2.44167C15.3 2.60278 15.3333 2.76667 15.3333 2.93333C15.3333 3.1 15.3028 3.26389 15.2417 3.425C15.1806 3.58611 15.0833 3.73333 14.95 3.86667L8.83333 10H6ZM7.33333 8.66667H8.26667L12.1333 4.8L11.6667 4.33333L11.1833 3.86667L7.33333 7.71667V8.66667Z"
                  fill="white"
                />
              </svg>
            </button>
            <button onClick={() => handleSetting()}>
              <svg
                width="21"
                height="21"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.5" y="0.5" width="15" height="15" stroke="black" />
                <path
                  d="M6.16647 14.6667L5.89981 12.5333C5.75536 12.4778 5.61925 12.4111 5.49147 12.3333C5.36369 12.2556 5.23869 12.1722 5.11647 12.0833L3.13314 12.9167L1.2998 9.75L3.01647 8.45C3.00536 8.37222 2.9998 8.29722 2.9998 8.225V7.775C2.9998 7.70278 3.00536 7.62778 3.01647 7.55L1.2998 6.25L3.13314 3.08334L5.11647 3.91667C5.23869 3.82778 5.36647 3.74445 5.4998 3.66667C5.63314 3.58889 5.76647 3.52222 5.89981 3.46667L6.16647 1.33334H9.83314L10.0998 3.46667C10.2442 3.52222 10.3804 3.58889 10.5081 3.66667C10.6359 3.74445 10.7609 3.82778 10.8831 3.91667L12.8665 3.08334L14.6998 6.25L12.9831 7.55C12.9942 7.62778 12.9998 7.70278 12.9998 7.775V8.225C12.9998 8.29722 12.9887 8.37222 12.9665 8.45L14.6831 9.75L12.8498 12.9167L10.8831 12.0833C10.7609 12.1722 10.6331 12.2556 10.4998 12.3333C10.3665 12.4111 10.2331 12.4778 10.0998 12.5333L9.83314 14.6667H6.16647ZM8.03314 10.3333C8.67758 10.3333 9.22758 10.1056 9.68314 9.65C10.1387 9.19445 10.3665 8.64445 10.3665 8C10.3665 7.35556 10.1387 6.80556 9.68314 6.35C9.22758 5.89445 8.67758 5.66667 8.03314 5.66667C7.37758 5.66667 6.8248 5.89445 6.3748 6.35C5.92481 6.80556 5.6998 7.35556 5.6998 8C5.6998 8.64445 5.92481 9.19445 6.3748 9.65C6.8248 10.1056 7.37758 10.3333 8.03314 10.3333Z"
                  fill="#757575"
                />
              </svg>
            </button>
          </div>
          <div className="bg-black rounded-[2rem] shadow-lg overflow-hidden border border-[#757575] w-full max-w-[48rem] md:w-auto">
            {setting ? (
              <NotificationSettings />
            ) : (
              <>
                {!editingProfile ? (
                  <div className="p-6 border-b border-gray-800">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <h1 className="text-4xl font-bold">
                            {formData.firstName + " " + formData.lastName}
                          </h1>
                        </div>
                        <p className="text-[25px] text-[#D9D9D9] mb-1">
                          {formData.city}
                        </p>
                        <p className="text-xl text-gray-400 mb-4">
                          @{localStorage.getItem("user") || "username"}
                        </p>
                        <p className="text-xl mb-6">{formData.headline}</p>
                      </div>

                      <div className="relative">
                        {Eicon && (
                          <button
                            className="ml-[3.5rem] flex items-center gap-1 text-gray-400 mb-[3rem]"
                            onClick={() => setEditingProfile(true)}
                          >
                            <svg
                              width="17"
                              height="17"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 12V10H11V12H1ZM3 8H3.7L7.6 4.1125L7.2375 3.75L6.8875 3.4L3 7.3V8ZM2 9V6.875L7.6 1.2875C7.69167 1.19583 7.79792 1.125 7.91875 1.075C8.03958 1.025 8.16667 1 8.3 1C8.43333 1 8.5625 1.025 8.6875 1.075C8.8125 1.125 8.925 1.2 9.025 1.3L9.7125 2C9.8125 2.09167 9.88542 2.2 9.93125 2.325C9.97708 2.45 10 2.57917 10 2.7125C10 2.8375 9.97708 2.96042 9.93125 3.08125C9.88542 3.20208 9.8125 3.3125 9.7125 3.4125L4.125 9H2ZM7.6 4.1125L7.2375 3.75L6.8875 3.4L7.6 4.1125Z"
                                fill="#CAC5C5"
                              />
                            </svg>
                            <span style={{ color: "#CAC5C5" }}>Edit</span>
                          </button>
                        )}

                        <div className="rounded-full w-28 h-28 overflow-hidden border border-[#757575] bg-gray-800 flex items-center justify-center">
                          {avatar ||
                          localStorage.getItem("dip") ||
                          formData.avatar ? (
                            <img
                              alt="User Avatar"
                              className="w-full h-full object-cover"
                              src={
                                avatar ||
                                formData.avatar ||
                                localStorage.getItem("dip")
                              }
                            />
                          ) : (
                            <svg
                              className="w-full h-full object-cover"
                              viewBox="0 0 469 469"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="234.5"
                                cy="234.5"
                                r="234.5"
                                fill="#111111"
                              />
                              <circle
                                cx="234.5"
                                cy="217.5"
                                r="91"
                                fill="#EEEEEE"
                                fillOpacity="0.93"
                              />
                              <path
                                d="M379.86 417.556C339.877 449.371 289.26 468.37 234.186 468.37C179.112 468.37 128.496 449.371 88.5095 417.556C117.79 374.542 172.07 345.654 234.186 345.654C296.302 345.654 350.587 374.535 379.86 417.556Z"
                                fill="#EEEEEE"
                                fillOpacity="0.933333"
                              />
                            </svg>
                          )}
                        </div>
                        {Eicon && (
                          <>
                            <label
                              htmlFor="avatarUpload"
                              className="absolute bottom-0 right-0 bg-white rounded-md p-1"
                            >
                              <svg
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="25"
                                  height="25"
                                  rx="4"
                                  fill="#CAC5C5"
                                />
                                <g clip-path="url(#clip0_2146_2)">
                                  <path
                                    d="M6.33301 19V16.3333H19.6663V19H6.33301ZM8.99967 13.6667H9.93301L15.133 8.48334L14.6497 8.00001L14.183 7.53334L8.99967 12.7333V13.6667ZM7.66634 15V12.1667L15.133 4.71668C15.2552 4.59445 15.3969 4.50001 15.558 4.43334C15.7191 4.36668 15.8886 4.33334 16.0663 4.33334C16.2441 4.33334 16.4163 4.36668 16.583 4.43334C16.7497 4.50001 16.8997 4.60001 17.033 4.73334L17.9497 5.66668C18.083 5.7889 18.1802 5.93334 18.2413 6.10001C18.3025 6.26668 18.333 6.4389 18.333 6.61668C18.333 6.78334 18.3025 6.94723 18.2413 7.10834C18.1802 7.26945 18.083 7.41668 17.9497 7.55001L10.4997 15H7.66634ZM15.133 8.48334L14.6497 8.00001L14.183 7.53334L15.133 8.48334Z"
                                    fill="black"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_2146_2">
                                    <rect
                                      width="16"
                                      height="16"
                                      fill="white"
                                      transform="translate(5 3)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </label>
                            <input
                              type="file"
                              id="avatarUpload"
                              accept="image/*"
                              onChange={handleAvatarChange}
                              className="hidden"
                            />
                          </>
                        )}
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
                        <label className="block text-base sm:text-lg font-bold mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none text-sm sm:text-base"
                          style={{ color: "white" }}
                        />
                      </div>
                      <div>
                        <label className="block text-base sm:text-lg font-bold mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          onChange={handleChange}
                          value={formData.lastName}
                          className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none text-sm sm:text-base"
                          style={{ color: "white" }}
                        />
                      </div>
                    </div>

                    <div className="mb-5">
                      <label className="block text-base sm:text-lg font-bold mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        onChange={handleChange}
                        value={formData.city}
                        className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none text-sm sm:text-base"
                        style={{ color: "white" }}
                      />
                    </div>

                    <div className="mb-5">
                      <label className="block text-base sm:text-lg font-bold mb-2">
                        Short headline
                      </label>
                      <input
                        type="text"
                        name="headline"
                        onChange={handleChange}
                        value={formData.headline}
                        className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none text-sm sm:text-base"
                        style={{ color: "white" }}
                      />
                    </div>

                    <div className="mb-5">
                      <label className="block text-base sm:text-lg font-bold mb-2">
                        Links
                      </label>

                      <div className="flex items-center mb-3">
                        <div className="w-8 mr-2">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.33334 12.25C2.01251 12.25 1.73785 12.1358 1.50938 11.9073C1.28091 11.6788 1.16667 11.4042 1.16667 11.0833V4.66666C1.16667 4.34582 1.28091 4.07117 1.50938 3.8427C1.73785 3.61423 2.01251 3.49999 2.33334 3.49999H4.66667V2.33332C4.66667 2.01249 4.78091 1.73784 5.00938 1.50936C5.23785 1.28089 5.51251 1.16666 5.83334 1.16666H8.16667C8.4875 1.16666 8.76216 1.28089 8.99063 1.50936C9.2191 1.73784 9.33334 2.01249 9.33334 2.33332V3.49999H11.6667C11.9875 3.49999 12.2622 3.61423 12.4906 3.8427C12.7191 4.07117 12.8333 4.34582 12.8333 4.66666V11.0833C12.8333 11.4042 12.7191 11.6788 12.4906 11.9073C12.2622 12.1358 11.9875 12.25 11.6667 12.25H2.33334ZM2.33334 11.0833H11.6667V4.66666H2.33334V11.0833ZM5.83334 3.49999H8.16667V2.33332H5.83334V3.49999Z"
                              fill="#757575"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="portfolioLink"
                          onChange={handleChange}
                          value={formData.portfolioLink}
                          className="flex-1 bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none text-sm sm:text-base"
                          style={{ color: "white" }}
                          placeholder="https://portfolio.com/"
                        />
                      </div>

                      <div className="flex items-center mb-3">
                        <div className="w-8 mr-2">
                          <svg
                            viewBox="0 0 24 24"
                            className="h-6 w-6 text-gray-400"
                            fill="currentColor"
                          >
                            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="linkedinLink"
                          onChange={handleChange}
                          value={formData.linkedinLink}
                          className="flex-1 bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none text-sm sm:text-base"
                          style={{ color: "white" }}
                          placeholder="https://www.linkedin.com/in/..."
                        />
                      </div>

                      <div className="flex items-center mb-3">
                        <div className="w-8 mr-2">
                          <svg
                            viewBox="0 0 24 24"
                            className="h-6 w-6 text-gray-400"
                            fill="currentColor"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="github"
                          onChange={handleChange}
                          value={formData.github}
                          className="flex-1 bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none text-sm sm:text-base"
                          style={{ color: "white" }}
                          placeholder="https://github.com/"
                        />
                      </div>

                      <div className="flex items-center">
                        <div className="w-8 mr-2">
                          <svg
                            viewBox="0 0 24 24"
                            className="h-6 w-6 text-gray-400"
                            fill="currentColor"
                          >
                            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="twitter"
                          onChange={handleChange}
                          value={formData.twitter}
                          className="flex-1 bg-transparent border-b border-[#1D1C1C] pb-1 text-white focus:outline-none"
                          style={{ color: "white" }}
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
                      <h2 className="text-xl sm:text-2xl font-bold">
                        Background
                      </h2>
                      {Eicon && (
                        <button
                          className="flex items-center gap-1 text-gray-400"
                          onClick={() => setEditingBackground(true)}
                        >
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 12V10H11V12H1ZM3 8H3.7L7.6 4.1125L7.2375 3.75L6.8875 3.4L3 7.3V8ZM2 9V6.875L7.6 1.2875C7.69167 1.19583 7.79792 1.125 7.91875 1.075C8.03958 1.025 8.16667 1 8.3 1C8.43333 1 8.5625 1.025 8.6875 1.075C8.8125 1.125 8.925 1.2 9.025 1.3L9.7125 2C9.8125 2.09167 9.88542 2.2 9.93125 2.325C9.97708 2.45 10 2.57917 10 2.7125C10 2.8375 9.97708 2.96042 9.93125 3.08125C9.88542 3.20208 9.8125 3.3125 9.7125 3.4125L4.125 9H2ZM7.6 4.1125L7.2375 3.75L6.8875 3.4L7.6 4.1125Z"
                              fill="#CAC5C5"
                            />
                          </svg>
                          <span style={{ color: "#CAC5C5" }}>Edit</span>
                        </button>
                      )}
                    </div>

                    <div className="mb-4 sm:mb-6">
                      <h3
                        className="text-lg sm:text-xl font-bold mb-2"
                        style={{ color: "#CAC5C5" }}
                      >
                        Achievement
                      </h3>
                      <p className="text-[#757575] text-sm sm:text-base">
                        {formData.achievement}
                      </p>
                    </div>

                    <div className="mb-4 sm:mb-6">
                      <h3
                        className="text-lg sm:text-xl font-bold mb-2"
                        style={{ color: "#CAC5C5" }}
                      >
                        Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills?.map((skill, index) => (
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
                      <h3
                        className="text-lg sm:text-xl font-bold mb-2"
                        style={{ color: "#CAC5C5" }}
                      >
                        Discipline
                      </h3>
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
                  <div
                    className="p-4 sm:p-6 border-t"
                    style={{ background: "#111111", borderColor: "#757575" }}
                  >
                    <div className="flex justify-between items-center mb-5">
                      <h2 className="text-xl sm:text-2xl font-bold">
                        Background
                      </h2>
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
                      <h3
                        className="text-base sm:text-xl font-bold mb-2"
                        style={{ color: "#CAC5C5" }}
                      >
                        Achievement
                      </h3>
                      <textarea
                        value={achievement}
                        onChange={(e) => setAchievement(e.target.value)}
                        className="w-full bg-black border border-gray-700 rounded-md p-2 text-white text-sm sm:text-base"
                        rows="3"
                        style={{ color: "white" }}
                      />
                    </div>

                    <div className="mb-5">
                      <h3
                        className="text-base sm:text-xl font-bold mb-2"
                        style={{ color: "#CAC5C5" }}
                      >
                        Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {Object.keys(skillsData).map((skill) => (
                          <div
                            className={`rounded-full px-3 py-1 border-[1px] border-[#757575] cursor-pointer text-xs sm:text-sm ${
                              selectedSkills.includes(skill)
                                ? "bg-white"
                                : "bg-black"
                            }`}
                            style={{
                              color: selectedSkills.includes(skill)
                                ? "#000000"
                                : "#CAC5C5",
                            }}
                            onClick={() => handleSkillClick(skill)}
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-5">
                      <h3
                        className="text-base sm:text-xl font-bold mb-2"
                        style={{ color: "#CAC5C5" }}
                      >
                        Discipline
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedSkills.flatMap((skill) =>
                          skillsData[skill].map((discipline) => (
                            <div
                              key={discipline}
                              className={`rounded-full px-3 py-1 border-[1px] border-[#757575] cursor-pointer text-xs sm:text-sm ${
                                selectedDisciplines.includes(discipline)
                                  ? "bg-white"
                                  : "bg-black"
                              }`}
                              style={{
                                color: selectedDisciplines.includes(discipline)
                                  ? "#000000"
                                  : "#CAC5C5",
                              }}
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
                <div
                  className="p-4 sm:px-6 sm:py-0 "
                  style={{
                    background: "#111111",
                    borderColor: "#757575",
                    borderBottomLeftRadius: "2rem",
                    borderBottomRightRadius: "2rem",
                  }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl sm:text-2xl font-bold">Projects</h2>
                    <button
                      className="text-white bg-transparent border rounded-md p-1 px-2 text-sm sm:text-base"
                      onClick={handleAddProject}
                    >
                      + Add Project
                    </button>
                  </div>

                  {!editingProject ? (
                    <div className="mb-6">
                      <div className="flex flex-col items-center justify-between">
                        {projects.map((project, index) => (
                          <div
                            className="flex flex-col gap-4 w-full "
                            key={index}
                          >
                            <div className="flex flex-row justify-between items-center ">
                              <h3 className="text-lg sm:text-xl font-bold mb-2 text-left flex-grow">
                                {project.name}
                              </h3>
                              {Eicon && (
                                <button
                                  className="flex items-center gap-1 text-gray-400"
                                  onClick={() => handleEdit(project)}
                                >
                                  <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M1 12V10H11V12H1ZM3 8H3.7L7.6 4.1125L7.2375 3.75L6.8875 3.4L3 7.3V8ZM2 9V6.875L7.6 1.2875C7.69167 1.19583 7.79792 1.125 7.91875 1.075C8.03958 1.025 8.16667 1 8.3 1C8.43333 1 8.5625 1.025 8.6875 1.075C8.8125 1.125 8.925 1.2 9.025 1.3L9.7125 2C9.8125 2.09167 9.88542 2.2 9.93125 2.325C9.97708 2.45 10 2.57917 10 2.7125C10 2.8375 9.97708 2.96042 9.93125 3.08125C9.88542 3.20208 9.8125 3.3125 9.7125 3.4125L4.125 9H2ZM7.6 4.1125L7.2375 3.75L6.8875 3.4L7.6 4.1125Z"
                                      fill="#CAC5C5"
                                    />
                                  </svg>
                                  <span style={{ color: "#CAC5C5" }}>Edit</span>
                                </button>
                              )}
                            </div>

                            <div className="bg-[#1D1C1C] w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center relative overflow-hidden">
                              <img
                                src={project.img}
                                alt="Project"
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="flex flex-row justify-between items-center ">
                              <h3 className="text-sm md:text-base font-extrabold text-[#CAC5C5]">
                                Stage
                              </h3>
                              <div className="px-4 py-1.5 rounded-full border border-[#757575] text-[#757575] text-xs md:text-sm cursor-pointer transition">
                                {project.stage}
                              </div>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                              <h3 className="text-sm md:text-base font-extrabold text-[#CAC5C5]">
                                Workplace
                              </h3>
                              <div className="px-4 py-1.5 rounded-full border border-[#757575] text-[#757575] text-xs md:text-sm cursor-pointer transition">
                                {project.workplace}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-5">
                        <h3 className="text-lg sm:text-xl font-bold">
                          {projectName}
                        </h3>
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
                        {/* <div className="bg-[#1D1C1C] w-16 h-16 rounded-lg mx-auto sm:mx-0 sm:mr-5 sm:mb-0 mb-4"></div> */}
                        <div className="bg-[#1D1C1C] w-16 h-16 rounded-lg mx-auto sm:mx-0 sm:mr-5 sm:mb-0 mb-4  flex items-center justify-center relative overflow-hidden">
                          {imagePreview ? (
                            <img
                              src={imagePreview}
                              alt="Project"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <label
                              htmlFor={`project-image-${projectId}`}
                              className="cursor-pointer w-full h-full flex items-center justify-center"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 1V15"
                                  stroke="#757575"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M1 8H15"
                                  stroke="#757575"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </label>
                          )}
                          <input
                            type="file"
                            id={`project-image-${projectId}`}
                            className="hidden"
                            accept="image/*"
                            // onChange={handleImageUpload}
                          />
                          {imagePreview && (
                            <label
                              htmlFor={`project-image-${projectId}`}
                              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 1V15"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M1 8H15"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </label>
                          )}
                        </div>

                        <div className="flex-1 space-y-3">
                          <div>
                            <h4 className="text-sm sm:text-base font-bold mb-1">
                              Project name
                            </h4>
                            <input
                              type="text"
                              placeholder="Pitch your idea in more detail.."
                              value={projectName}
                              onChange={(e) => setProjectName(e.target.value)}
                              className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white text-xs sm:text-sm placeholder:text-[#424242]"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-bold mb-1">
                              Idea description
                            </h4>
                            <input
                              type="text"
                              value={projectDescription}
                              onChange={(e) =>
                                setProjectDescription(e.target.value)
                              }
                              placeholder="Describe your idea in few words..."
                              className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white text-xs sm:text-sm placeholder:text-[#424242]"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-bold mb-1">
                              Link
                            </h4>
                            <input
                              type="text"
                              value={projectLink}
                              onChange={(e) => setProjectLink(e.target.value)}
                              placeholder="https://yourproject.com/"
                              className="w-full bg-transparent border-b border-[#1D1C1C] pb-1 text-white text-xs sm:text-sm placeholder:text-[#424242]"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-bold mb-1">
                              Pitch
                            </h4>
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
                        <h3 className="text-sm sm:text-xl font-bold mb-2">
                          Stage
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {editingProject ? (
                            <>
                              {["Idea", "Prototype", "Revenue", "Scale"].map(
                                (stage) => (
                                  <div
                                    key={stage}
                                    className={`rounded-full px-3 py-1 border-[1px] border-[#757575] cursor-pointer text-xs sm:text-sm ${
                                      projectStage === stage
                                        ? "bg-white"
                                        : "bg-black"
                                    }`}
                                    style={{
                                      color:
                                        projectStage === stage
                                          ? "#000000"
                                          : "#CAC5C5",
                                    }}
                                    onClick={() => handleStageSelect(stage)}
                                  >
                                    {stage}
                                  </div>
                                )
                              )}
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
                        <h3 className="text-sm sm:text-xl font-bold mb-2">
                          Workplace
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {editingProject ? (
                            <>
                              {["Remote", "Hybrid", "Office"].map(
                                (workplace) => (
                                  <div
                                    key={workplace}
                                    className={`rounded-full px-3 py-1 border-[1px] border-[#757575] cursor-pointer text-xs sm:text-sm ${
                                      projectWorkplace === workplace
                                        ? "bg-white"
                                        : "bg-black"
                                    }`}
                                    style={{
                                      color:
                                        projectWorkplace === workplace
                                          ? "#000000"
                                          : "#CAC5C5",
                                    }}
                                    onClick={() =>
                                      handleWorkplaceSelect(workplace)
                                    }
                                  >
                                    {workplace}
                                  </div>
                                )
                              )}
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
                </div>{" "}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      {isMobile && <MobileFooter currentPage={currentPage} />}
    </Layout>
  );
}
