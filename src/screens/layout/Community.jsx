"use client";

import React, { useState, useEffect } from "react";
import {
  Header,
  Sidebar,
  MainContent,
  Layout,
  NavIconFooter,
  MobileFooter,
} from "./bars";
import API_KEY from "../../../key";

const CommunityPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("community");
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
  const [email, setEmail] = useState("");
  const handleSubscribe = async () => {
    try {
      const response = await fetch(`${API_KEY}/comm/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      //console.log(data);
      alert(data.message);
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  const [feedback, setFeedback] = useState("");
  const [btnColor, setBtnColor] = useState("gray"); // Default color

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
    setBtnColor(e.target.value ? "white" : "gray"); // Change color on typing
  };

  const handleSendFeedback = async () => {
    try {
      const response = await fetch(`${API_KEY}/comm/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ feedback }),
      });

      const data = await response.json();
      //console.log(response);
      alert(data.message);
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };

  // return (
  //     <div>
  //         <input type="text" value={feedback} onChange={handleFeedbackChange} placeholder="Type your feedback" />
  //         <button onClick={handleSendFeedback} style={{ backgroundColor: btnColor }}>Send</button>
  //     </div>
  // );

  // Set current page for navigation highlighting
  useEffect(() => {
    if (location.pathname.includes("community")) {
      setCurrentPage("community");
    } else {
      setCurrentPage(location.pathname.split("/").pop());
    }
  }, [location.pathname]);

  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="flex flex-col min-h-screen">
        <div
          className={`${
            isMobile ? "px-4 -mt-5 pb-24 flex-grow" : "w-full px-4 mx-auto "
          } overflow-y-auto`}
        >
          <div className="text-white">
            {/* Header */}

            {/* Main Content */}
            <main className="flex-1 ">
              <div className="container mx-auto max-w-4xl">
                <header className="py-8 border-b-[0.5px] border-[#FBFAF40F]">
                  <div className="container mx-auto">
                    <h1 className="text-4xl mt-4 sm:mt-0 font-bold">
                      Community
                    </h1>
                  </div>
                </header>
                {/* Newsletter Section */}
                <div className="border-[2px] bg-[#000000] border-white rounded-[10px] p-8 mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
                    Subscribe weekly newsletter
                  </h2>

                  {/* Email Input */}
                  <div className="relative max-w-lg mx-auto mb-6">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-transparent border-[2px] border-white rounded-[100px] py-3 px-5 text-white placeholder:text-[#FBFAF4]"
                    />

                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => handleSubscribe()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mr-2"
                        fill="none"
                        viewBox="0 0 20 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Newsletter Description */}
                  <p className="text-center text-[#FBFAF4] text-[15px] max-w-lg mx-auto">
                    No spam. One Investor digest every Monday and
                    <br className="hidden md:block" /> founder digest every
                    Tuesday for free.
                  </p>
                </div>

                {/* Social Media Icons */}
                <div className="flex justify-center space-x-6 mb-12">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/govertx/ "
                    className="text-white"
                  >
                    <svg
                      className="w-8 h-8"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                    </svg>
                  </a>

                  {/* Gmail */}
                  <a href="hello@govertx.com" className="text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="35"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.104.897 2 2 2h16c1.103 0 2-.896 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zm-16 12V8.489l7.386 4.924a1 1 0 001.228 0L20 8.489V18H4z" />
                    </svg>
                  </a>

                  {/* <a href="hello@govertx.com" className="text-white">
                    <svg
                      width="40"
                      viewBox="0 0 28 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_2948_589)">
                        <path
                          d="M1.90909 21H6.36364V10.1818L0 5.40906V19.0909C0 20.1472 0.855909 21 1.90909 21Z"
                          fill="white"
                        />
                        <path
                          d="M21.6364 21H26.0909C27.1473 21 28 20.1441 28 19.0909V5.40906L21.6364 10.1818"
                          fill="#FBFAF4"
                        />
                        <path
                          d="M21.6364 1.90914V10.1819L28 5.40914V2.86368C28 0.502772 25.305 -0.843137 23.4182 0.572772"
                          fill="#1F1F1F"
                        />
                        <path
                          d="M6.36365 10.1818V1.90906L14 7.63633L21.6364 1.90906V10.1818L14 15.9091"
                          fill="#4B4B4B"
                        />
                        <path
                          d="M0 2.86368V5.40914L6.36364 10.1819V1.90914L4.58182 0.572772C2.69182 -0.843137 0 0.502772 0 2.86368Z"
                          fill="#1F1F1F"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2948_589">
                          <rect width="28" height="21" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a> */}

                  {/* WhatsApp */}
                  <a
                    href="https://chat.whatsapp.com/B5G68k1ipkO95OnQusvIq8 "
                    className="text-white"
                  >
                    <svg
                      className="w-8 h-8"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 01-1.516-5.26c0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"></path>
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/vertx4founders/ "
                    className="text-white"
                  >
                    <svg
                      className="w-8 h-8"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                    </svg>
                  </a>

                  {/* Twitter/X */}
                  <a href="https://x.com/Vertx_AI " className="text-white">
                    <svg
                      className="w-8 h-8"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                  </a>

                  {/* Discord */}
                  <a href="https://lnkd.in/gRdvFYKz " className="text-white">
                    <svg
                      className="w-8 h-8"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path>
                    </svg>
                  </a>
                </div>

                {/* Feedback Form */}
                <div className="border-[2px] bg-[#000000] border-white rounded-[10px] p-6">
                  <div className="relative">
                    <textarea
                      value={feedback}
                      onChange={handleFeedbackChange}
                      placeholder="Enter your feedback here."
                      className="w-full h-32 bg-transparent text-white resize-none focus:outline-none placeholder:text-[#4B4B4B]"
                    ></textarea>
                    <button
                      className="absolute bottom-0 right-0 bg-[#4B4B4B] text-[#1F1F1F] font-bold px-4 py-1 rounded"
                      onClick={handleSendFeedback}
                      style={{ backgroundColor: btnColor }}
                    >
                      SEND
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      {isMobile && <MobileFooter currentPage={currentPage} />}
    </Layout>
  );
};

export default CommunityPage;
