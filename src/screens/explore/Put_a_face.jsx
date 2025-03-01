"use client"

import React, { useState, useEffect } from "react"
import { Header, Sidebar } from "../layout/bars"
import { useNavigate } from "react-router"

export default function Put_a_face() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const[userId, setUserId] = useState(null);
  const [time, setTimeDifference] = useState(null);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profile/fetch",{headers: {'Content-Type': 'application/json',
          token: localStorage.getItem('token')
        }});
        // console.log(response.data[0]);
        if (response.data) {
          setUserId(response.data[0]._id);
          setTimeDifference(timeDifference(response.data[0].createdAt)); // Update time difference when data is fetched
          setUserData(response.data[0]);
          setAvatar(response.data[0].avatar);
          console.log(response.data[0]);
          // setIsEditing(true); // Enable edit mode if data exists
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } 
    };

    fetchUserData();
  }, []);

  const [image, setImage] = useState(null);
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // Convert image to Base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
  
      // Instantly show the image in frontend
      setAvatar(base64Image);
  
      try {
        const response = await axios.post(`http://localhost:5000/profile/${userId}/upload-avatar`, 
          { avatar: base64Image }, // Send Base64 directly
          { headers: { "Content-Type": "application/json" } }
        );
  
        // console.log(response);
        setAvatar(response.data.avatar); // Update avatar with response from backend
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    };
  };
  

  // if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 relative">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className={`flex-1 flex items-center justify-center transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-40'}`}>
          <div className="max-w-4xl w-full px-4">
            <h1 className="text-4xl font-bold mb-2">Put a face to your name.</h1>
            <p className="text-xl text-[#CAC5C5] mb-8">Add your avatar</p>
            
            <div className="bg-[#151515] rounded-[20px] p-8 shadow-xl border border-[#757575] w-full max-w-[680px]">
              <div className="flex flex-col items-start">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h2 className="text-4xl font-bold mb-2">Mark Zuckerburg</h2>
                    <p className="text-xl text-[#CAC5C5] mb-1">San Francisco, CA, USA</p>
                    <p className="text-xl text-[#757575] mb-4">@markzuckerberg</p>
                    <p className="text-xl mt-5 mb-8">CEO, Facebook</p>
                    
                    <div className="flex space-x-4">
                    <div className="bg-black rounded-full px-3 py-1 border-[0.5px] border-[#757575] text-sm">#New here</div>
<div className="bg-black rounded-full px-3 py-1 border-[0.5px] border-[#757575] flex items-center text-sm">
  <svg className="mr-1 w-4 h-4" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
    <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
  2m
</div>
</div>
                  </div>
                  
                  <div className="relative  mb-20">
                    <div className="rounded-full w-32 h-32 overflow-hidden border border-[#757575] bg-gray-800 flex items-center justify-center -mt-30">
                    {avatar ?   <img
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                        src={avatar || "/api/placeholder/128/128"}
                      /> :
                      <input type="file" accept="image/*"  className="w-full h-full object-cover" onChange={(e) => setImage(e.target.files[0])}  />
                        }
                    
                    </div>

                    <div className="absolute bottom-0 right-0 bg-white rounded-md p-1">
                      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_2217_6)">
                          <path d="M1.33337 16V13.3333H14.6667V16H1.33337ZM4.00004 10.6667H4.93337L10.1334 5.48334L9.65004 5.00001L9.18337 4.53334L4.00004 9.73334V10.6667ZM2.66671 12V9.16668L10.1334 1.71668C10.2556 1.59445 10.3973 1.50001 10.5584 1.43334C10.7195 1.36668 10.8889 1.33334 11.0667 1.33334C11.2445 1.33334 11.4167 1.36668 11.5834 1.43334C11.75 1.50001 11.9 1.60001 12.0334 1.73334L12.95 2.66668C13.0834 2.7889 13.1806 2.93334 13.2417 3.10001C13.3028 3.26668 13.3334 3.4389 13.3334 3.61668C13.3334 3.78334 13.3028 3.94723 13.2417 4.10834C13.1806 4.26945 13.0834 4.41668 12.95 4.55001L5.50004 12H2.66671ZM10.1334 5.48334L9.65004 5.00001L9.18337 4.53334L10.1334 5.48334Z" fill="black"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_2217_6">
                            <rect width="16" height="16" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8 max-w-[680px]">
              <div className="flex w-full">
                <button className="bg-[#1D1C1C] text-white font-bold py-3 px-8 rounded-[10px] text-lg w-[160px]">
                  Back
                </button>
                <button className="bg-white text-black font-bold py-3 px-8 rounded-[10px] text-lg ml-4 flex-1" onClick={() => navigate("/skills")}>
                  Continue
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
