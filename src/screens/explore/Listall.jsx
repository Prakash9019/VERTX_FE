
import { useState, useEffect } from "react";
import axios from "axios";
import API_KEY from "../../../key";
import { Layout, MobileFooter } from "../layout/bars";

import { ChevronDown, Send } from "lucide-react"
export default function Listall() {

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [more , setMore ] =useState(false);
    const handleClick2 =() =>{
      setMore(!more);
    }

  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [skippedUsers, setSkippedUsers] = useState(new Set());

  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({});
  const [projects, setProjects] = useState([]);
  const [achievement, setAchievement] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  const [timeDiff, setTimeDifference] = useState("");


const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchUsers = async () => {
    if (loading) return; // Prevent multiple requests
    setLoading(true);

    try {
      const response = await axios.get(`${API_KEY}/list/users/list`, {
        headers: { "Content-Type": "application/json", token: localStorage.getItem("token") },
        params: { page, limit: 10 }, // ✅ Fetch only 10 users per request
      });

      let newUsers = response.data;
      const skippedUserIds = new Set(JSON.parse(localStorage.getItem("skippedUsers")) || []);
      setSkippedUsers(skippedUserIds);

      const filteredUsers = newUsers.filter(user => !skippedUserIds.has(user._id));
      setUsers(prevUsers => [...prevUsers, ...filteredUsers]); // ✅ Append new users instead of replacing
      console.log(page);
      console.log(users);
      setPage(prev => prev + 1); // Move to next page
      console.log(page);
    } catch (error) {
      console.error("Error fetching users:", error);
    } 
  };

  fetchUsers();
}, []);

  const current = users[currentIndex];
  console.log(current);
   const [empty,setEmpty] =useState(false);
  // Fetch user profile and projects dynamically when the current user changes
  useEffect(() => {
    if (!users.length || currentIndex >= users.length) return;
    
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_KEY}/profile/fetch`, {
            headers: { token: localStorage.getItem("token") },
            params: { uid: users[currentIndex]._id },
        });
        console.log(response.data);
        if (response.data.length > 0) {
          setEmpty(false);
          setUserId(response.data[0].user);
          setFormData(response.data[0]);
          setAchievement(response.data[0].achievement);
          setSelectedSkills(response.data[0].skills);
          setSelectedDisciplines(response.data[0].disciplines);
        }
        else{
          setEmpty(true);
          setCurrentIndex(prev => prev + 1);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    console.log("helllooo")
    fetchUserData();
}, [currentIndex, users]);  // ✅ Listen for changes in `currentIndex` and `users`

const handleProject = async () => {
  try {
    const response = await axios.get(`${API_KEY}/profile/projects/fetch`, {
        headers: { token: localStorage.getItem("token") },
        params: { uid: users[currentIndex]._id },
    });
    console.log(response.data)
    setProjects(response.data);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

  const handleSkip = async () => {
    if (currentIndex >= users.length) return;

    try {
      await axios.post(`${API_KEY}/list/users/skip`, 
        { skippedUserId: users[currentIndex]._id }, 
        { headers: { "Content-Type": "application/json", token: localStorage.getItem("token") } }
      );

      setCurrentIndex(prev => prev + 1);  // ✅ Triggers useEffect to load next user
    } catch (error) {
      console.error("Error skipping user:", error);
    }
};

const handleConnect = async () => {
    const selectedUserId = users[currentIndex]?._id;
    if (!selectedUserId) return;

    try {
      await axios.post(`${API_KEY}/list/users/connect`, {
        userId,
        selectedUserId,
      }, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });

      console.log("Connected successfully!");
      setCurrentIndex(prevIndex => prevIndex + 1);  // ✅ Triggers useEffect to load next user
    } catch (error) {
      console.error("Error connecting:", error);
    }
};


  if (empty || !users.length || currentIndex >= users.length || users.length<=0) {
    return <p className="text-center text-gray-500">No more users to show.</p>;
  }

 
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
          {!empty && <div className="pt-6 px-6 border-b border-gray-800">
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
                  @{formData.username}
                </p>         
                <p className="text-xl mb-6">{formData.headline}</p>
              </div>

              <div className="relative">
                <div className="rounded-full w-28 h-28 overflow-hidden border border-[#757575] bg-gray-800 flex items-center justify-center">
                  { formData.avatar ? (
                    <img
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                      src={formData.avatar}
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
          onClick={() => {setMore(!more); handleProject()} }
          className="flex w-full items-center justify-center border-t-2 border-gray-800 p-2 text-xl text-[#D9D9D9] font-bold transition hover:text-white"
        >
          More <ChevronDown className={`ml-1 h-4 w-4 transition ${more ? "rotate-180" : ""}`} />
        </button>
          </div>}

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
              onClick={() => handleConnect()}>
              Connect
            </button>
            <button 
              className="bg-white text-black font-bold py-3 px-8 rounded-[10px] text-lg ml-4 flex-1" 
              onClick={() => handleSkip()}>
              Skip
            </button>
          </div>
        </div>
     </div>
     
    {isMobile && <MobileFooter currentPage={currentPage} />}
  </Layout>
  );
}
