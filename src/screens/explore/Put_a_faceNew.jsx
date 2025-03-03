"use client";

import React, { useState, useEffect } from "react";
import { Header, Sidebar, Layout, NavIconFooter } from "../layout/barsNew";
import { useNavigate } from "react-router";
import axios from "axios";
import API_KEY from "../../../key";
import { User, Search, Target, Users, Grid } from "lucide-react";
import gify from "../outreach/gify.gif";

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

export default function Put_a_face() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [userId, setUserId] = useState(null);
  const [time, setTimeDifference] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_KEY}/profile/fetch`,{
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token')
          }
        });
        if (response.data) {
          setUserId(response.data[0]._id);
          setTimeDifference(timeDifference(response.data[0].createdAt));
          setUserData(response.data[0]);
          setAvatar(response.data[0].avatar);
          console.log(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append("avatar", file);
    console.log(userId);
    await axios.post(`${API_KEY}/profile/${userId}/upload-avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(res => console.log("Avatar Updated:", res.data))
    .catch(err => console.error("Error:", err));
  };

  if (loading) return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
      <img src={gify} alt="Loading..." className="w-20 h-20" />
    </div>
  );

  const ProfileContent = () => (
    <div className="max-w-4xl w-full px-4">
      <h1 className="text-4xl font-bold mb-2">Put a face to your name.</h1>
      <p className="text-xl text-gray-400 mb-8">Add your avatar</p>

      <div className={`bg-[#151515] rounded-3xl p-12 shadow-xl border border-white-600 ${isMobile ? 'w-full' : 'w-[800px]'}`}>
        <div className="flex flex-col items-start">
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-between w-full`}>
            <div>
              <h2 className="text-4xl font-bold mb-2">{userData?.firstName + userData?.lastName}</h2>
              <p className="text-xl text-gray-400 mb-1">{userData?.city || "Location not provided"}</p>
              <p className="text-xl text-gray-400 mb-4">@{userData?.username || "username"}</p>
              <p className="text-xl mb-8">{userData?.headline || "Role not defined"}</p>

              <div className="flex space-x-4">
                <div className="bg-black rounded-full px-4 py-2 border-[0.5px] border-[#757575]">#New here</div>
                <div className="bg-black rounded-full px-4 py-2 border-[0.5px] border-[#757575] flex items-center">
                  <svg className="mr-1" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
                    <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {time}
                </div>
              </div>
            </div>

            <div className={`relative ${isMobile ? 'mt-8' : ''}`}>
              <div className="rounded-full w-32 h-32 overflow-hidden border border-[#757575] bg-gray-800 flex items-center justify-center">
                {avatar ? (
                  <img
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                    src={avatar}
                  />
                ) : (
                  <User className="w-16 h-16 text-gray-400" />
                )}
              </div>

              <label htmlFor="avatarUpload" className="absolute bottom-0 right-0 bg-white rounded-md p-1 cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.33337 16V13.3333H14.6667V16H1.33337ZM4.00004 10.6667H4.93337L10.1334 5.48334L9.65004 5.00001L9.18337 4.53334L4.00004 9.73334V10.6667ZM2.66671 12V9.16668L10.1334 1.71668C10.2556 1.59445 10.3973 1.50001 10.5584 1.43334C10.7195 1.36668 10.8889 1.33334 11.0667 1.33334C11.2445 1.33334 11.4167 1.36668 11.5834 1.43334C11.75 1.50001 11.9 1.60001 12.0334 1.73334L12.95 2.66668C13.0834 2.7889 13.1806 2.93334 13.2417 3.10001C13.3028 3.26668 13.3334 3.4389 13.3334 3.61668C13.3334 3.78334 13.3028 3.94723 13.2417 4.10834C13.1806 4.26945 13.0834 4.41668 12.95 4.55001L5.50004 12H2.66671ZM10.1334 5.48334L9.65004 5.00001L9.18337 4.53334L10.1334 5.48334Z" fill="black"/>
                </svg>
              </label>
              <input type="file" id="avatarUpload" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button 
          className="bg-[#1D1C1C] text-white font-bold py-3 px-12 rounded-[10px] text-lg border border-gray-600" 
          onClick={() => navigate(-1)}>
          Back
        </button>
        <button 
          className="bg-white text-black font-bold py-3 px-12 rounded-[10px] text-lg ml-[20px]" 
          onClick={() => navigate("/explore/skills")}>
          Continue
        </button>
      </div>
    </div>
  );

  // Render with Layout component for desktop, custom layout for mobile
  return (
    <>
      {isMobile ? (
        <div className="min-h-screen bg-black text-white flex flex-col">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="flex-1 px-4 py-6 overflow-auto">
            <ProfileContent />
          </div>
          
          {/* Mobile Footer Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex justify-around py-3">
            <NavIconFooter icon={<Search />} label="Explore" active={true} />
            <NavIconFooter icon={<Target />} label="Outreach" />
            <NavIconFooter icon={<Users />} label="Engage" />
            <NavIconFooter icon={<Grid />} label="Resources" />
          </div>
        </div>
      ) : (
        <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
          <div className="flex-1 flex items-center justify-center">
            <ProfileContent />
          </div>
        </Layout>
      )}
    </>
  );
}