"use client";

import React, { useState, useEffect } from "react";
import {
  Header,
  Sidebar,
  Layout,
  NavIconFooter,
  MobileFooter,
} from "../layout/bars";
import { useNavigate } from "react-router";
import axios from "axios";
import API_KEY from "../../../key";
import gify from "../outreach/gify.gif";

export default function Put_a_face() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [userId, setUserId] = useState(null);

  const [currentPage, setCurrentPage] = useState("explore");

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Run check immediately
    checkIsMobile();

    // Listen for resize events
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
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
  const [username1, setUsernamee1] = useState("");
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
        if (response.data) {
          setUserId(response.data[0].user);
          setUserData(response.data[0]);
          setAvatar(response.data[0].avatar);
          if (response.data[0].avatar) {
            localStorage.setItem("dip", response.data[0].avatar);
          }

        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    // handleUsername();
  }, []);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    //  console.log(reader.result);
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

    window.location.reload();
  };

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
        <img src={gify} alt="Loading..." className="w-20 h-20" />
      </div>
    );

  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div
        className="flex-1 flex flex-col min-h-screen"
        style={{ fontFamily: "Manrope", letterSpacing: "-0.04em" }}
      >
        <div
          className={`${
            isMobile ? "px-4 mt-6 pb-24" : "max-w-3xl w-full px-4 mx-auto mt-16"
          } overflow-y-auto flex-grow`}
        >
          <div className={`text-left ${isMobile ? "ml-0" : "ml-10"}`}>
            <h1
              className={`${isMobile ? "text-3xl" : "text-4xl"} font-bold mb-1`}
            >
              Put a face to your name.
            </h1>
            <p
              className={`${
                isMobile ? "text-lg" : "text-xl"
              } text-[#CAC5C5] mb-4`}
            >
              Add your avatar
            </p>
          </div>

          <div className="bg-[black] rounded-[2rem] p-4 md:p-8 shadow-xl border border-[#757575] w-full max-w-[680px] mx-auto">
            <div className="flex flex-col items-start">
              {/* Modified this section for mobile responsiveness */}
              <div className="flex flex-row items-center justify-between w-full">
                <div className={`${isMobile ? "flex-1" : ""}`}>
                  <h2
                    className={`${
                      isMobile ? "text-2xl" : "text-4xl"
                    } font-bold mb-2`}
                  >
                    {userData?.firstName + userData?.lastName}
                  </h2>
                  <p
                    className={`${
                      isMobile ? "text-lg" : "text-xl"
                    } text-[#CAC5C5] mb-1`}
                  >
                    {userData?.city || "Location not provided"}
                  </p>
                  <p
                    className={`${
                      isMobile ? "text-lg" : "text-xl"
                    } text-[#757575] mb-4`}
                  >
                    @{localStorage.getItem("user") || "username"}
                  </p>
                  <p
                    className={`${isMobile ? "text-lg" : "text-xl"} mt-3 mb-6`}
                  >
                    {userData?.headline || "Role not defined"}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {/* <div className="bg-black rounded-full px-3 py-1 border-[0.5px] border-[#757575] text-sm">#New here</div> */}
                    {/*          <div className="bg-black rounded-full px-3 py-1 border-[0.5px] border-[#757575] flex items-center text-sm">
                      <svg className="mr-1 w-4 h-4" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
                        <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      {time}
                    </div>       */}
                  </div>
                </div>

                {/* Profile image now positioned to the right on mobile */}
                <div className="relative ml-4">
                  <div
                    className={`rounded-full ${
                      isMobile ? "w-20 h-20" : "w-32 h-32"
                    } overflow-hidden border border-[#757575] bg-[#111111] flex items-center justify-center`}
                  >
                    {localStorage.getItem("dip") || avatar ? (
                      <img
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                        src={localStorage.getItem("dip") || avatar}
                      />
                    ) : (
                      <svg
                        width="469"
                        height="469"
                        viewBox="0 0 469 469"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M468.37 234.186C468.37 308.459 433.796 374.655 379.86 417.556C339.877 449.37 289.26 468.37 234.186 468.37C179.112 468.37 128.496 449.37 88.5096 417.556C34.5767 374.655 0 308.459 0 234.186C0 104.851 104.853 -3.05176e-05 234.186 -3.05176e-05C363.519 -3.05176e-05 468.37 104.851 468.37 234.186Z"
                          fill="#111111"
                        />
                        <path
                          d="M234.184 308.838C284.45 308.838 325.199 268.089 325.199 217.823C325.199 167.557 284.45 126.808 234.184 126.808C183.918 126.808 143.169 167.557 143.169 217.823C143.169 268.089 183.918 308.838 234.184 308.838Z"
                          fill="#EEEEEE"
                          fill-opacity="0.933333"
                        />
                        <path
                          d="M379.86 417.556C339.877 449.371 289.26 468.37 234.186 468.37C179.112 468.37 128.496 449.371 88.5095 417.556C117.79 374.542 172.07 345.654 234.186 345.654C296.302 345.654 350.587 374.535 379.86 417.556Z"
                          fill="#EEEEEE"
                          fill-opacity="0.933333"
                        />
                      </svg>
                      //<User  />
                    )}
                  </div>

                  <label
                    htmlFor="avatarUpload"
                    className="absolute bottom-0 right-0 bg-white rounded-md p-1 cursor-pointer"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_2217_6)">
                        <path
                          d="M1.33337 16V13.3333H14.6667V16H1.33337ZM4.00004 10.6667H4.93337L10.1334 5.48334L9.65004 5.00001L9.18337 4.53334L4.00004 9.73334V10.6667ZM2.66671 12V9.16668L10.1334 1.71668C10.2556 1.59445 10.3973 1.50001 10.5584 1.43334C10.7195 1.36668 10.8889 1.33334 11.0667 1.33334C11.2445 1.33334 11.4167 1.36668 11.5834 1.43334C11.75 1.50001 11.9 1.60001 12.0334 1.73334L12.95 2.66668C13.0834 2.7889 13.1806 2.93334 13.2417 3.10001C13.3028 3.26668 13.3334 3.4389 13.3334 3.61668C13.3334 3.78334 13.3028 3.94723 13.2417 4.10834C13.1806 4.26945 13.0834 4.41668 12.95 4.55001L5.50004 12H2.66671ZM10.1334 5.48334L9.65004 5.00001L9.18337 4.53334L10.1334 5.48334Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2217_6">
                          <rect width="16" height="16" fill="white" />
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
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8 max-w-[680px] mx-auto mb-16">
            <div className={`flex ${isMobile ? "w-full" : "w-full"}`}>
              <button
                className={`bg-[#1D1C1C] text-white font-bold py-3 ${
                  isMobile ? "px-4" : "px-8"
                } rounded-[10px] text-lg ${
                  isMobile ? "w-[100px]" : "w-[160px]"
                }`}
                onClick={() => navigate(-1)}
              >
                Back
              </button>
              <button
                className="bg-white text-black font-bold py-3 px-8 rounded-[10px] text-lg ml-4 flex-1"
                onClick={() => navigate("/explore/skills")}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      {isMobile && <MobileFooter currentPage={currentPage} />}
    </Layout>
  );
}
