"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import API_KEY from "../../../key";
import { Layout, MobileFooter } from "../layout/bars";

import { ChevronDown, Send } from "lucide-react"
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

export default function List() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [more , setMore ] =useState(false);
  const handleClick2 =() =>{
    setMore(!more);
  }
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
        console.error("Error fetching user data:", error);
      }
    //   finally {
    //     setLoading(false);
    //   }
    };

    fetchUserData();
  }, []);

  const [projects, setProjects] = useState([]); 
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

  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div
        className={`${
          isMobile ? "px-4 pb-24 pt-3" : "w-full px-4 mx-auto mt-16"
        } overflow-y-auto`}
        style={{ fontFamily: "Manrope", letterSpacing: "-4%" }}
      >
        <div className="max-w-3xl w-full mx-auto">
          <div className="bg-black rounded-[2rem] shadow-lg overflow-hidden border border-[#757575] w-full max-w-[48rem] md:w-auto">
           {/* Card  */}
            <div className="pt-6 px-6 border-b border-gray-800">
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
                  <div className="rounded-full w-28 h-28 overflow-hidden border border-[#757575] bg-gray-800 flex items-center justify-center">
                    {localStorage.getItem("dip") || formData.avatar ? (
                      <img
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                        src={formData.avatar || localStorage.getItem("dip")}
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
                </div>
              </div>
              <button
            onClick={() => setMore(!more)}
            className="flex w-full items-center justify-center border-t-2 border-gray-800 p-2 text-xl text-[#D9D9D9] font-bold transition hover:text-white"
          >
            More <ChevronDown className={`ml-1 h-4 w-4 transition ${more ? "rotate-180" : ""}`} />
          </button>
            </div>

            {/* Background Section */}
{ more && <>
            <div
              className="shadow-lg overflow-hidden border-t pt-5 pl-4 pr-4 sm:pl-6 sm:pr-6"
              style={{ background: "#111111", borderColor: "#757575" }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl sm:text-2xl font-bold">Background</h2>
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
        
      {/* Projects Section */}
      <div
        className="p-4 sm:p-6 "
        style={{
          background: "#111111",
          borderColor: "#757575",
          borderBottomLeftRadius: "2rem",
          borderBottomRightRadius: "2rem",
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-bold">Projects</h2>
        </div>

        <div className="mb-6">
          <div className="flex flex-col items-center justify-between">
            {projects.map((project, index) => (
              <div className="flex flex-col gap-4 w-full " key={index}>
                <div className="flex flex-row justify-between items-center ">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-left flex-grow">
                    {project.name}
                  </h3>
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
      </div>
        </>}
</div>
       </div>
       <div className="flex justify-between mt-8 max-w-[680px] mx-auto mb-16">
            <div className={`flex ${isMobile ? 'w-full' : 'w-full'}`}>
              <button 
                className={`bg-[#1D1C1C] text-white font-bold py-3 ${isMobile ? 'px-4' : 'px-8'} rounded-[10px] text-lg ${isMobile ? 'w-[100px]' : 'w-[160px]'}`}
                onClick={() => navigate(-1)}>
                Mark
              </button>
              <button 
                className="bg-white text-black font-bold py-3 px-8 rounded-[10px] text-lg ml-4 flex-1" 
                onClick={() => navigate("/explore/skills")}>
                Connect
              </button>
              <button 
                className="bg-white text-black font-bold py-3 px-8 rounded-[10px] text-lg ml-4 flex-1" 
                onClick={() => navigate("/explore/skills")}>
                Skip
              </button>
            </div>
          </div>
       </div>
       
      {isMobile && <MobileFooter currentPage={currentPage} />}
    </Layout>
  );
}
