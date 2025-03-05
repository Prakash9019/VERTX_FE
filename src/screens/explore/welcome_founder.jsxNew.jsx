"use client"

import React, { useState, useEffect } from "react"
import { Header, Sidebar, Layout, NavIconFooter, MobileFooter } from "../layout/barsNew"
import { useNavigate } from "react-router"
import axios from "axios"
import API_KEY from "../../../key"
import { Search, Target, Users, Grid,Info } from "lucide-react"


export default function Welcome_founder() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    headline: "",
    portfolioLink: "",
    linkedinLink: "",
    github: "",
    twitter: ""
  });

  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState("explore");

  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 768);
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState({}); // For toggling error messages
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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Remove error when the user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    // Required fields
    ["firstName", "lastName", "city", "headline"].forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required.";
      }
    });

    // At least one link must be provided
    if (
      !formData.portfolioLink.trim() &&
      !formData.linkedinLink.trim() &&
      !formData.github.trim() &&
      !formData.twitter.trim()
    ) {
      newErrors.links = "At least one link must be provided.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_KEY}/profile/fetch`, {
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token')
          }
        });
        // console.log(response.data[0]);
        if (response.data.length > 0) {
          setFormData(response.data[0]);
          // setIsEditing(true); // Enable edit mode if data exists
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } 
    };

    fetchUserData();
  }, []);

  // Handle Form Submission
  const handleSubmit = async () => {
    // e.preventDefault();
    if (validateForm()) {
    
    try {
      const response = await fetch(`${API_KEY}/profile`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          token: localStorage.getItem('token')
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Successfully submitted!");
        navigate("/explore/putaface")
      } else {
        setMessage(result.error || "Something went wrong!");
      }
    } catch (error) {
      setMessage("Server error! Try again later.");
    }
  }
  };
  
  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="flex flex-col min-h-screen">
        <div className={`${isMobile ? 'px-4 mt-10 pb-24 flex-grow' : 'max-w-3xl w-full px-4 mx-auto mt-16'} overflow-y-auto`}>
          <div className={`text-left ${isMobile ? 'ml-0' : 'ml-10'}`}>
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold -mt-1  mb-1`}>Welcome founder.</h1>
            <p className="text-xl text-[#CAC5C5] mb-4">Introduce yourself</p>
          </div>

          <form
      // onSubmit={handleSubmit}
      className="bg-black rounded-[20px] p-4 shadow-xl border border-[#1D1C1C] w-full max-w-2xl mx-auto mb-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        {/* First Name */}
        <div>
          <label
            className={`block text-lg font-semibold ${
              errors.firstName ? "text-red-500" : "text-[#CAC5C5]"
            }`}
          >
            First Name{" "}
            {errors.firstName && (
              <Info
                size={16}
                className="inline cursor-pointer text-red-500 ml-1"
                onClick={() => setShowError({ ...showError, firstName: !showError.firstName })}
              />
            )}
          </label>
          <div
            className={`border-b-[1px] ${
              errors.firstName ? "border-red-500" : "border-[#1D1C1C]"
            }`}
          >
            <input
              name="firstName"
              type="text"
              onChange={handleChange}
              value={formData.firstName}
              placeholder="E.g Mark"
              className="w-full py-1 bg-transparent text-[#424242] placeholder-[#424242] focus:outline-none"
            />
          </div>
          {showError.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label
            className={`block text-lg font-semibold ${
              errors.lastName ? "text-red-500" : "text-[#CAC5C5]"
            }`}
          >
            Last Name{" "}
            {errors.lastName && (
              <Info
                size={16}
                className="inline cursor-pointer text-red-500 ml-1"
                onClick={() => setShowError({ ...showError, lastName: !showError.lastName })}
              />
            )}
          </label>
          <div
            className={`border-b-[1px] ${
              errors.lastName ? "border-red-500" : "border-[#1D1C1C]"
            }`}
          >
            <input
              name="lastName"
              type="text"
              onChange={handleChange}
              value={formData.lastName}
              placeholder="E.g Zuckerberg"
              className="w-full py-1 bg-transparent text-[#424242] placeholder-[#424242] focus:outline-none"
            />
          </div>
          {showError.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>
      </div>

      {/* City */}
      <div className="mb-3">
        <label
          className={`block text-lg font-semibold ${
            errors.city ? "text-red-500" : "text-[#CAC5C5]"
          }`}
        >
          City{" "}
          {errors.city && (
            <Info
              size={16}
              className="inline cursor-pointer text-red-500 ml-1"
              onClick={() => setShowError({ ...showError, city: !showError.city })}
            />
          )}
        </label>
        <div
          className={`border-b-[1px] ${errors.city ? "border-red-500" : "border-[#1D1C1C]"}`}
        >
          <input
            name="city"
            type="text"
            onChange={handleChange}
            value={formData.city}
            placeholder="Type and select your residing city."
            className="w-full py-1 bg-transparent text-[#424242] placeholder-[#424242] focus:outline-none"
          />
        </div>
        {showError.city && <p className="text-red-500 text-sm">{errors.city}</p>}
      </div>

      {/* Links Section */}
      <div>
        <label className="block text-lg font-semibold mb-1 text-[#CAC5C5]">Links</label>
        <div className="space-y-2">
          {[
            { name: "portfolioLink", placeholder: "https://portfolio.com/..." },
            { name: "linkedinLink", placeholder: "https://linkedin.com/..." },
            { name: "github", placeholder: "https://github.com/..." },
            { name: "twitter", placeholder: "https://x.com/..." },
          ].map((link) => (
            <div key={link.name} className="flex items-center border-b-[1px] border-[#1D1C1C] pb-1">
              <input
                name={link.name}
                type="text"
                onChange={handleChange}
                value={formData[link.name]}
                placeholder={link.placeholder}
                className="w-full bg-transparent text-[#424242] placeholder-[#424242] focus:outline-none"
              />
            </div>
          ))}
        </div>
        {errors.links && (
          <p className="text-red-500 text-sm mt-2">{errors.links}</p>
        )}
      </div>

      {/* Submit Button */}
      {/* <div className="mt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
        >
          Submit
        </button>
      </div> */}
    </form>
          
          <div className={`flex ${isMobile ? 'justify-center' : 'justify-end'} mt-8 mb-16`}>
            <button 
              className={`bg-white text-black font-bold py-3 ${isMobile ? 'px-8 w-full' : 'px-12'} rounded-[10px] text-lg`} 
              onClick={() => handleSubmit()}
            >
              Continue
            </button>
          </div>

          {message && (
            <div className="mt-4 text-center text-green-500">
              {message}
            </div>
          )}
        </div>
      </div>

      {/* Using the MobileFooter component instead of inline code */}
      {isMobile && <MobileFooter currentPage={currentPage} />}
    </Layout>
  )
}
