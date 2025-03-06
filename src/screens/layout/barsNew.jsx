"use client"

import { useState, useEffect } from "react"
import { Search, Target, User, Grid, Settings, Lock } from "lucide-react"
import logo from "../../logo.png"
import { useNavigate } from "react-router"
import LandingAuth from "../landing/index"
import Signup from "../auth/signup"
import TermsAndConditions from "../More/TermsandConditions"
import PrivacyPolicy from "../More/PrivacyPolicy"
import axios from "axios";
import API_KEY from "../../../key"
// Header Component
export function Header({ sidebarOpen, setSidebarOpen }) {
  const [isMobile, setIsMobile] = useState(false)
  const [showProfilePopup, setShowProfilePopup] = useState(false)
  const [showTermsPopup, setShowTermsPopup] = useState(false)
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false)
  const [showAuthPage, setShowAuthPage] = useState(false)
  const navigate = useNavigate()

  // Check if device is mobile based on screen width
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIsMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  const handleProfileClick = () => {
    if (window.localStorage.getItem("token")) {
      setShowProfilePopup(!showProfilePopup)
    } else {
      // Show full screen auth page instead of popup when not logged in
      setShowAuthPage(true)
    }
  }

  const handleCloseAuthPage = () => {
    setShowAuthPage(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  const handleTermsClick = () => {
    setShowTermsPopup(true)
    setShowProfilePopup(false)
  }

  const handlePrivacyClick = () => {
    setShowPrivacyPopup(true)
    setShowProfilePopup(false)
  }

  const handleOverviewClick = () => {
    navigate('/explore/bio')
    setShowProfilePopup(false)
  }

  return (
    <>
      {/* Header for Mobile - fixed at top */}
      {isMobile && (
        <>
          <div className="flex justify-between items-center p-4 bg-[#111] fixed top-0 left-0 right-0 z-20">
            <div className="flex items-center">
              <img src={logo || "/placeholder.svg"} alt="logo" className="w-10 h-10" />
            </div>
            <div
              className="w-10 h-10 bg-white text-gray-700 flex items-center justify-center rounded-full border border-gray-300 font-bold cursor-pointer"
              onClick={handleProfileClick}
            >
              <User />
            </div>
          </div>
          {/* Adding the horizontal line below the header */}
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-20 h-[0.5px] w-11/12 bg-[#4B4B4B]"></div>

          {/* Profile Popup - only shown for logged in users */}
          {showProfilePopup && window.localStorage.getItem("token") && (
            <>
              {/* Overlay with 757575 color and low opacity */}
              <div className="fixed inset-0 bg-[#000000]/80 z-30" onClick={() => setShowProfilePopup(false)}></div>

              {/* Popup menu */}
              <div className="fixed top-20 right-4 z-40 bg-black rounded-[20px] shadow-lg w-64 border border-[#1E1E1E] py-4">
                <div className="py-2">
                  {[
                    {
                      icon: (
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6.82467 19.95C7.81634 19.1917 8.92467 18.5938 10.1497 18.1563C11.3747 17.7188 12.658 17.5 13.9997 17.5C15.3413 17.5 16.6247 17.7188 17.8497 18.1563C19.0747 18.5938 20.183 19.1917 21.1747 19.95C21.8552 19.1528 22.3851 18.2487 22.7643 17.2375C23.1434 16.2264 23.333 15.1473 23.333 14C23.333 11.4139 22.424 9.21185 20.6059 7.39379C18.7879 5.57574 16.5858 4.66671 13.9997 4.66671C11.4136 4.66671 9.21148 5.57574 7.39342 7.39379C5.57537 9.21185 4.66634 11.4139 4.66634 14C4.66634 15.1473 4.85592 16.2264 5.23509 17.2375C5.61426 18.2487 6.14412 19.1528 6.82467 19.95ZM13.9997 15.1667C12.8525 15.1667 11.8851 14.773 11.0976 13.9855C10.3101 13.198 9.91634 12.2306 9.91634 11.0834C9.91634 9.93615 10.3101 8.96879 11.0976 8.18129C11.8851 7.39379 12.8525 7.00004 13.9997 7.00004C15.1469 7.00004 16.1143 7.39379 16.9018 8.18129C17.6893 8.96879 18.083 9.93615 18.083 11.0834C18.083 12.2306 17.6893 13.198 16.9018 13.9855C16.1143 14.773 15.1469 15.1667 13.9997 15.1667ZM13.9997 25.6667C12.3858 25.6667 10.8691 25.3605 9.44967 24.748C8.03023 24.1355 6.79551 23.3042 5.74551 22.2542C4.69551 21.2042 3.86426 19.9695 3.25176 18.55C2.63926 17.1306 2.33301 15.6139 2.33301 14C2.33301 12.3862 2.63926 10.8695 3.25176 9.45004C3.86426 8.0306 4.69551 6.79587 5.74551 5.74587C6.79551 4.69587 8.03023 3.86462 9.44967 3.25212C10.8691 2.63962 12.3858 2.33337 13.9997 2.33337C15.6136 2.33337 17.1302 2.63962 18.5497 3.25212C19.9691 3.86462 21.2038 4.69587 22.2538 5.74587C23.3038 6.79587 24.1351 8.0306 24.7476 9.45004C25.3601 10.8695 25.6663 12.3862 25.6663 14C25.6663 15.6139 25.3601 17.1306 24.7476 18.55C24.1351 19.9695 23.3038 21.2042 22.2538 22.2542C21.2038 23.3042 19.9691 24.1355 18.5497 24.748C17.1302 25.3605 15.6136 25.6667 13.9997 25.6667Z"
                          fill="#FBFAF4"
                        />
                      </svg>
                      ),
                      label: "Overview",
                      action: handleOverviewClick
                    },
                    { icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.7921 25.6667L10.3254 21.9334C10.0726 21.8362 9.83442 21.7195 9.61081 21.5834C9.3872 21.4473 9.16845 21.3014 8.95456 21.1459L5.48372 22.6042L2.27539 17.0625L5.27956 14.7875C5.26011 14.6514 5.25039 14.5202 5.25039 14.3938V13.6063C5.25039 13.4799 5.26011 13.3487 5.27956 13.2125L2.27539 10.9375L5.48372 5.39587L8.95456 6.85421C9.16845 6.69865 9.39206 6.55282 9.62539 6.41671C9.85872 6.2806 10.0921 6.16393 10.3254 6.06671L10.7921 2.33337H17.2087L17.6754 6.06671C17.9282 6.16393 18.1664 6.2806 18.39 6.41671C18.6136 6.55282 18.8323 6.69865 19.0462 6.85421L22.5171 5.39587L25.7254 10.9375L22.7212 13.2125C22.7407 13.3487 22.7504 13.4799 22.7504 13.6063V14.3938C22.7504 14.5202 22.7309 14.6514 22.6921 14.7875L25.6962 17.0625L22.4879 22.6042L19.0462 21.1459C18.8323 21.3014 18.6087 21.4473 18.3754 21.5834C18.1421 21.7195 17.9087 21.8362 17.6754 21.9334L17.2087 25.6667H10.7921ZM14.0587 18.0834C15.1865 18.0834 16.149 17.6848 16.9462 16.8875C17.7434 16.0903 18.1421 15.1278 18.1421 14C18.1421 12.8723 17.7434 11.9098 16.9462 11.1125C16.149 10.3153 15.1865 9.91671 14.0587 9.91671C12.9115 9.91671 11.9441 10.3153 11.1566 11.1125C10.3691 11.9098 9.97539 12.8723 9.97539 14C9.97539 15.1278 10.3691 16.0903 11.1566 16.8875C11.9441 17.6848 12.9115 18.0834 14.0587 18.0834Z" fill="#FBFAF4"/>
                      </svg>
                      , label: "Settings" },
                    { icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.9997 24.5L12.308 22.9833C10.3441 21.2139 8.72051 19.6875 7.43717 18.4042C6.15384 17.1208 5.13301 15.9688 4.37467 14.9479C3.61634 13.9271 3.08648 12.9889 2.78509 12.1333C2.4837 11.2778 2.33301 10.4028 2.33301 9.50834C2.33301 7.68056 2.94551 6.15417 4.17051 4.92917C5.39551 3.70417 6.9219 3.09167 8.74967 3.09167C9.76079 3.09167 10.7233 3.30556 11.6372 3.73334C12.5511 4.16112 13.3386 4.7639 13.9997 5.54167C14.6608 4.7639 15.4483 4.16112 16.3622 3.73334C17.2761 3.30556 18.2386 3.09167 19.2497 3.09167C21.0775 3.09167 22.6038 3.70417 23.8288 4.92917C25.0538 6.15417 25.6663 7.68056 25.6663 9.50834C25.6663 10.4028 25.5156 11.2778 25.2143 12.1333C24.9129 12.9889 24.383 13.9271 23.6247 14.9479C22.8663 15.9688 21.8455 17.1208 20.5622 18.4042C19.2788 19.6875 17.6552 21.2139 15.6913 22.9833L13.9997 24.5Z" fill="#FBFAF4"/>
                      </svg>
                      , label: "Community" },
                    { icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.0003 25.6667C11.2975 24.9862 9.0663 23.4355 7.30658 21.0146C5.54685 18.5938 4.66699 15.9056 4.66699 12.95V5.83337L14.0003 2.33337L23.3337 5.83337V12.95C23.3337 15.9056 22.4538 18.5938 20.6941 21.0146C18.9344 23.4355 16.7031 24.9862 14.0003 25.6667Z" fill="#FBFAF4"/>
                      </svg>
                      , label: "Privacy Policy", action: handlePrivacyClick },
                    { icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.66699 24.5V22.1667H18.667V24.5H4.66699ZM11.2587 18.8417L4.66699 12.25L7.11699 9.74171L13.767 16.3334L11.2587 18.8417ZM18.667 11.4334L12.0753 4.78337L14.5837 2.33337L21.1753 8.92504L18.667 11.4334ZM24.0337 23.3334L8.80866 8.10837L10.442 6.47504L25.667 21.7L24.0337 23.3334Z" fill="#FBFAF4"/>
                      </svg>
                      , label: "Terms of Service", action: handleTermsClick },
                    { icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.83333 24.5C5.19167 24.5 4.64236 24.2715 4.18542 23.8146C3.72847 23.3576 3.5 22.8083 3.5 22.1667V5.83333C3.5 5.19167 3.72847 4.64236 4.18542 4.18542C4.64236 3.72847 5.19167 3.5 5.83333 3.5H14V5.83333H5.83333V22.1667H14V24.5H5.83333ZM18.6667 19.8333L17.0625 18.1417L20.0375 15.1667H10.5V12.8333H20.0375L17.0625 9.85833L18.6667 8.16667L24.5 14L18.6667 19.8333Z" fill="#FBFAF4"/>
                      </svg>
                      , label: "Log out", action: handleLogout }

                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`px-4 py-3 cursor-pointer flex items-center text-[#d4d4d4] transition-colors duration-200 hover:text-white`}
                      onClick={item.action}
                    >
                      <span className="mr-2">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Full screen Auth Page - for non-logged in users */}
          {showAuthPage && (
            <div className="fixed inset-0 z-50 bg-black">
              <LandingAuth onClose={handleCloseAuthPage} isPopup={false} />
            </div>
          )}

          {/* Terms and Conditions Popup */}
          {showTermsPopup && <TermsAndConditions onClose={() => setShowTermsPopup(false)} />}

          {/* Privacy Policy Popup */}
          {showPrivacyPopup && <PrivacyPolicy onClose={() => setShowPrivacyPopup(false)} />}
        </>
      )}
    </>
  )
}

// Sidebar Component
export function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()
  const [currentPage, setPage] = useState("explore")
  const [showAuthPopup, setShowAuthPopup] = useState(false)
  const [showSignupPopup, setShowSignupPopup] = useState(false)
  const [showDesktopProfilePopup, setShowDesktopProfilePopup] = useState(false)
  const [showTermsPopup, setShowTermsPopup] = useState(false)
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false)

  // Check if device is mobile based on screen width
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIsMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleLogin = () => {
    setShowAuthPopup(true)
  }

  const handleSignup = () => {
    setShowSignupPopup(true)
  }

  const handleCloseAuthPopup = () => {
    setShowAuthPopup(false)
  }

  const handleCloseSignupPopup = () => {
    setShowSignupPopup(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  const handlePrivacyClick = () => {
    setShowPrivacyPopup(true)
    setShowDesktopProfilePopup(false)
  }

  const handleTermsClick = () => {
    setShowTermsPopup(true)
    setShowDesktopProfilePopup(false)
  }

  const handleOverviewClick = () => {
    navigate('/explore/bio')
    setShowDesktopProfilePopup(false)
  }

  // Updated navigation handler
  const handleNavigation = (route) => {
    if (route === "explore" && !window.localStorage.getItem("token")) {
      // Show auth popup if user is not logged in and trying to access explore
      setShowAuthPopup(true)
    } else if(route === "explore" && window.localStorage.getItem("exe")){
      navigate("/explore/break")
    }
    else{
      navigate(`/${route}`)
    }
  }

  useEffect(() => {
    // Check if the path includes "explore" to keep the bar active
    if (location.pathname.includes("explore")) {
      setPage("explore")
    } else {
      setPage(location.pathname.split("/").pop()) // Fallback for other pages
    }
  }, [location.pathname])

  // Only show sidebar on desktop
  

  const [username1,setUsernamee1] =useState("@username")

  const handleUsername = async () => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) return; // Prevent request if token is missing
  
      const response = await axios.get(`${API_KEY}/auth/getUser`, {
        headers: {
          "Content-Type": "application/json",
          token: token, // Send token in headers
        },
      });
  
      // console.log(response.data);
      setUsernamee1(response.data.user.username); // Update the username state with the fetched username
      window.localStorage.setItem("user",response.data.user.username);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      handleUsername(); // Call the function inside useEffect
    }
  }, []); // Ensures it runs only once on mount

  // Listen for the back button press
  useEffect(() => {
    const handleBackButton = (event) => {
      // Check if user is not logged in
      if (!window.localStorage.getItem("token")) {
        // Redirect to outreach page
        navigate("/outreach");
      }
    };

    window.addEventListener('popstate', handleBackButton);
    
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);

  // Only show sidebar on desktop
  if (isMobile) return null

  const handleGoogleLogout = async () => {
    try {
      localStorage.removeItem("token")
      window.location.href = "/" // Redirect to the homepage after logout
    } catch (error) {
      console.error("Error during logout", error)
    }
  }

  if (isMobile) return null;

  return (
    <>
      <div
        className={`flex flex-col h-full bg-black transition-all duration-300 ${sidebarOpen ? "w-64" : "w-24"} fixed left-0 top-0 bottom-0 z-10`}
      >
        {/* Logo */}
        <div className="p-5 pb-2 flex items-center">
          <div className={`${sidebarOpen ? "ml-3 " : "-ml-2"} mt-4 pt-3 text-white`}>
            <img src={logo || "/placeholder.svg"} alt="image" className={`w-12   ${sidebarOpen ? "h-10" : "h-12"}`} />
          </div>
          {sidebarOpen && (
            <div className=" mt-8   flex items-center">
             <svg width="100" viewBox="0 0 47 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.72 0.799999H8.656V8.176L5.008 12H3.584L0.944 8.096V0.799999H2.88V7.728L4.416 10.016L6.72 7.6V0.799999ZM11.8498 0.799999H18.0898V2.608H12.5858L12.2978 2.928V5.44H15.9938V7.248H12.2978V9.488L12.7618 10.192H18.0898V12H11.8018L10.3618 9.856V2.32L11.8498 0.799999ZM20.1155 0.799999H25.9875L27.8595 3.536V5.408L26.3875 6.928L27.8595 9.088V12H25.9235V9.424L24.4675 7.296H22.8995L22.0515 6.768V12H20.1155V0.799999ZM22.0515 2.608V5.488H25.2995L25.9235 4.848V3.92L25.0115 2.608H22.0515ZM29.4053 0.799999H37.7573V2.608H33.5013L34.5573 3.552V12H32.6213V4L32.1573 2.608H29.4053V0.799999ZM44.791 0.799999H46.727V4.208L45.207 5.76L46.727 7.984V12H44.791V8.352L43.975 7.216H43.239L41.559 8.976V12H39.623V8.368L41.143 6.816L39.623 4.592V0.799999H41.559V4.224L42.343 5.408H43.111L44.791 3.648V0.799999Z"
                  fill="white"
                />
              </svg>

              <button onClick={toggleSidebar} className="ml-2 mb-4 bg-black p-1 rounded-full">
              <svg
                  height="22"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-5 -mb-4 font-bold text-xl"
                >
                  <path
                    d="M11.017 0.383523V12.3438H12.9347V0.383523H11.017ZM4.03917 10.206L5.04769 9.20455L2.94542 7.10227H7.50508V5.625H2.94542L5.04769 3.52273L4.03917 2.52131L0.19684 6.36364L4.03917 10.206Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="ml-3 flex flex-col flex-grow mt-10">
          <NavItem 
            icon={<Search />} 
            active={currentPage} 
            name="explore" 
            label="Explore" 
            expanded={sidebarOpen} 
            onClick={() => handleNavigation("explore")}
          />
          <NavItem 
            icon={<Target />} 
            active={currentPage} 
            name="outreach" 
            label="Outreach" 
            expanded={sidebarOpen} 
            onClick={() => handleNavigation("outreach")}
          />
          <NavItem 
            icon={<Grid />} 
            active={currentPage} 
            name="resources" 
            label="Resources" 
            expanded={sidebarOpen} 
            onClick={() => handleNavigation("resources")}
          />
        </div>

        {/* User Profile Section */}
        <div className="flex flex-col items-center mb-6 mt-auto relative">
          {sidebarOpen ? (
            <div className="flex flex-col w-full px-4 space-y-4 mb-4">
              {window.localStorage.getItem("token") ? (
                <>
                  <div className="flex items-center justify-between w-full border border-[#111111] rounded-md p-3 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white text-gray-700 flex items-center justify-center rounded-full border border-gray-300 font-bold">
                        <User />
                      </div>
                      <div>
                        <p className="text-white text-sm">{username1 || "@username"}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowDesktopProfilePopup(!showDesktopProfilePopup)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Settings size={20} />
                    </button>
                  </div>
                  <div className="flex items-center justify-center w-full mb-4">
                    <button
                      className="flex items-center justify-center bg-[#1F1F1F] text-white rounded-md px-6 py-2 w-11/12"
                     // onClick={() => handleGoogleLogout()}
                      style={{
                        fontFamily: "Playfair Display",
                        fontSize: "16px",
                        lineHeight: "100%",
                        textAlign: "center",
                        height: "48px",
                        fontWeight: "bold", // Added fontWeight: 'bold'
                      }}
                    >
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span
                          className="text-black"
                          style={{
                            fontFamily: "Playfair Display",
                            fontSize: "12px",
                            lineHeight: "100%",
                            textAlign: "center",
                            fontWeight: "bold", // Added fontWeight: 'bold'
                          }}
                        >
                          Fl
                        </span>
                      </div>
                      <span className="ml-3 font-bold">FlowAI</span> {/* Added font-bold class */}
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-4">
                  <button
                    className="w-full h-10 bg-[#FBFAF4] text-black border border-gray-300 rounded-md font-bold"
                    onClick={handleSignup}
                  >
                    Sign Up
                  </button>
                  <button
                    className="w-full h-10 bg-[#1F1F1F] text-[#FBFAF4] border border-gray-300 rounded-md font-bold"
                    onClick={handleLogin}
                  >
                    Log in
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4 mb-4">
              <button onClick={toggleSidebar} className="mb-4 bg-black p-1 rounded-full">
              <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.77273 0.613636V19.75H0.704545V0.613636H3.77273ZM14.9373 16.3295L13.3237 14.7273L16.6873 11.3636H9.39188V9H16.6873L13.3237 5.63636L14.9373 4.03409L21.0851 10.1818L14.9373 16.3295Z"
                    fill="white"
                  />
                </svg>
              </button>
              <div className="w-10 h-10 bg-white text-gray-700 flex items-center justify-center rounded-full border border-gray-300 font-bold">
                <User />
              </div>
            </div>
          )}

{showDesktopProfilePopup && (
  <>
    {/* Add overlay to capture clicks outside the popup */}
    <div className="fixed inset-0 z-40" onClick={() => setShowDesktopProfilePopup(false)}></div>
    
    <div className="absolute bottom-[130px] right-[-210px] z-50 w-64 bg-[black] rounded-lg shadow-lg border border-[#333] p-4">
      <div className="space-y-2">
        {[
          {
            icon: (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.82467 19.95C7.81634 19.1917 8.92467 18.5938 10.1497 18.1563C11.3747 17.7188 12.658 17.5 13.9997 17.5C15.3413 17.5 16.6247 17.7188 17.8497 18.1563C19.0747 18.5938 20.183 19.1917 21.1747 19.95C21.8552 19.1528 22.3851 18.2487 22.7643 17.2375C23.1434 16.2264 23.333 15.1473 23.333 14C23.333 11.4139 22.424 9.21185 20.6059 7.39379C18.7879 5.57574 16.5858 4.66671 13.9997 4.66671C11.4136 4.66671 9.21148 5.57574 7.39342 7.39379C5.57537 9.21185 4.66634 11.4139 4.66634 14C4.66634 15.1473 4.85592 16.2264 5.23509 17.2375C5.61426 18.2487 6.14412 19.1528 6.82467 19.95ZM13.9997 15.1667C12.8525 15.1667 11.8851 14.773 11.0976 13.9855C10.3101 13.198 9.91634 12.2306 9.91634 11.0834C9.91634 9.93615 10.3101 8.96879 11.0976 8.18129C11.8851 7.39379 12.8525 7.00004 13.9997 7.00004C15.1469 7.00004 16.1143 7.39379 16.9018 8.18129C17.6893 8.96879 18.083 9.93615 18.083 11.0834C18.083 12.2306 17.6893 13.198 16.9018 13.9855C16.1143 14.773 15.1469 15.1667 13.9997 15.1667ZM13.9997 25.6667C12.3858 25.6667 10.8691 25.3605 9.44967 24.748C8.03023 24.1355 6.79551 23.3042 5.74551 22.2542C4.69551 21.2042 3.86426 19.9695 3.25176 18.55C2.63926 17.1306 2.33301 15.6139 2.33301 14C2.33301 12.3862 2.63926 10.8695 3.25176 9.45004C3.86426 8.0306 4.69551 6.79587 5.74551 5.74587C6.79551 4.69587 8.03023 3.86462 9.44967 3.25212C10.8691 2.63962 12.3858 2.33337 13.9997 2.33337C15.6136 2.33337 17.1302 2.63962 18.5497 3.25212C19.9691 3.86462 21.2038 4.69587 22.2538 5.74587C23.3038 6.79587 24.1351 8.0306 24.7476 9.45004C25.3601 10.8695 25.6663 12.3862 25.6663 14C25.6663 15.6139 25.3601 17.1306 24.7476 18.55C24.1351 19.9695 23.3038 21.2042 22.2538 22.2542C21.2038 23.3042 19.9691 24.1355 18.5497 24.748C17.1302 25.3605 15.6136 25.6667 13.9997 25.6667Z"
                fill="#FBFAF4"
              />
            </svg>
            ),
            label: "Overview",
            action: handleOverviewClick
          },
          { icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7921 25.6667L10.3254 21.9334C10.0726 21.8362 9.83442 21.7195 9.61081 21.5834C9.3872 21.4473 9.16845 21.3014 8.95456 21.1459L5.48372 22.6042L2.27539 17.0625L5.27956 14.7875C5.26011 14.6514 5.25039 14.5202 5.25039 14.3938V13.6063C5.25039 13.4799 5.26011 13.3487 5.27956 13.2125L2.27539 10.9375L5.48372 5.39587L8.95456 6.85421C9.16845 6.69865 9.39206 6.55282 9.62539 6.41671C9.85872 6.2806 10.0921 6.16393 10.3254 6.06671L10.7921 2.33337H17.2087L17.6754 6.06671C17.9282 6.16393 18.1664 6.2806 18.39 6.41671C18.6136 6.55282 18.8323 6.69865 19.0462 6.85421L22.5171 5.39587L25.7254 10.9375L22.7212 13.2125C22.7407 13.3487 22.7504 13.4799 22.7504 13.6063V14.3938C22.7504 14.5202 22.7309 14.6514 22.6921 14.7875L25.6962 17.0625L22.4879 22.6042L19.0462 21.1459C18.8323 21.3014 18.6087 21.4473 18.3754 21.5834C18.1421 21.7195 17.9087 21.8362 17.6754 21.9334L17.2087 25.6667H10.7921ZM14.0587 18.0834C15.1865 18.0834 16.149 17.6848 16.9462 16.8875C17.7434 16.0903 18.1421 15.1278 18.1421 14C18.1421 12.8723 17.7434 11.9098 16.9462 11.1125C16.149 10.3153 15.1865 9.91671 14.0587 9.91671C12.9115 9.91671 11.9441 10.3153 11.1566 11.1125C10.3691 11.9098 9.97539 12.8723 9.97539 14C9.97539 15.1278 10.3691 16.0903 11.1566 16.8875C11.9441 17.6848 12.9115 18.0834 14.0587 18.0834Z" fill="#FBFAF4"/>
            </svg>
            , label: "Settings" },
          { icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.9997 24.5L12.308 22.9833C10.3441 21.2139 8.72051 19.6875 7.43717 18.4042C6.15384 17.1208 5.13301 15.9688 4.37467 14.9479C3.61634 13.9271 3.08648 12.9889 2.78509 12.1333C2.4837 11.2778 2.33301 10.4028 2.33301 9.50834C2.33301 7.68056 2.94551 6.15417 4.17051 4.92917C5.39551 3.70417 6.9219 3.09167 8.74967 3.09167C9.76079 3.09167 10.7233 3.30556 11.6372 3.73334C12.5511 4.16112 13.3386 4.7639 13.9997 5.54167C14.6608 4.7639 15.4483 4.16112 16.3622 3.73334C17.2761 3.30556 18.2386 3.09167 19.2497 3.09167C21.0775 3.09167 22.6038 3.70417 23.8288 4.92917C25.0538 6.15417 25.6663 7.68056 25.6663 9.50834C25.6663 10.4028 25.5156 11.2778 25.2143 12.1333C24.9129 12.9889 24.383 13.9271 23.6247 14.9479C22.8663 15.9688 21.8455 17.1208 20.5622 18.4042C19.2788 19.6875 17.6552 21.2139 15.6913 22.9833L13.9997 24.5Z" fill="#FBFAF4"/>
            </svg>
            , label: "Community" },
          { icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.0003 25.6667C11.2975 24.9862 9.0663 23.4355 7.30658 21.0146C5.54685 18.5938 4.66699 15.9056 4.66699 12.95V5.83337L14.0003 2.33337L23.3337 5.83337V12.95C23.3337 15.9056 22.4538 18.5938 20.6941 21.0146C18.9344 23.4355 16.7031 24.9862 14.0003 25.6667Z" fill="#FBFAF4"/>
            </svg>
            , label: "Privacy Policy", action: handlePrivacyClick },
          { icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.66699 24.5V22.1667H18.667V24.5H4.66699ZM11.2587 18.8417L4.66699 12.25L7.11699 9.74171L13.767 16.3334L11.2587 18.8417ZM18.667 11.4334L12.0753 4.78337L14.5837 2.33337L21.1753 8.92504L18.667 11.4334ZM24.0337 23.3334L8.80866 8.10837L10.442 6.47504L25.667 21.7L24.0337 23.3334Z" fill="#FBFAF4"/>
            </svg>
            , label: "Terms of Service", action: handleTermsClick },
          { icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.83333 24.5C5.19167 24.5 4.64236 24.2715 4.18542 23.8146C3.72847 23.3576 3.5 22.8083 3.5 22.1667V5.83333C3.5 5.19167 3.72847 4.64236 4.18542 4.18542C4.64236 3.72847 5.19167 3.5 5.83333 3.5H14V5.83333H5.83333V22.1667H14V24.5H5.83333ZM18.6667 19.8333L17.0625 18.1417L20.0375 15.1667H10.5V12.8333H20.0375L17.0625 9.85833L18.6667 8.16667L24.5 14L18.6667 19.8333Z" fill="#FBFAF4"/>
            </svg>
            , label: "Log out", action: handleLogout }

        ].map((item, index) => (
          <div
            key={index}
            className="px-4 py-3 cursor-pointer flex items-center text-[#d4d4d4] transition-colors duration-200 hover:text-white"
            onClick={item.action}
          >
            <span className="mr-2">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  </>
)}
        </div>
      </div>

      {/* Auth Popup with Backdrop */}
      {showAuthPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={handleCloseAuthPopup}></div>
          <div className="z-50">
            <LandingAuth onClose={handleCloseAuthPopup} isPopup={true} />
          </div>
        </div>
      )}

      {/* Signup Popup */}
      {showSignupPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={handleCloseSignupPopup}></div>
          <div className="z-50">
            <Signup onClose={handleCloseSignupPopup} isPopup={true} />
          </div>
        </div>
      )}

      {/* Terms and Conditions Popup */}
      {showTermsPopup && <TermsAndConditions onClose={() => setShowTermsPopup(false)} />}

      {/* Privacy Policy Popup */}
      {showPrivacyPopup && <PrivacyPolicy onClose={() => setShowPrivacyPopup(false)} />}
    </>
  )
}


// Main Content Component
export function MainContent({ sidebarOpen, children }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return (
    <div className={`flex-1 ${isMobile ? "pt-16 pb-16" : `ml-${sidebarOpen ? "64" : "24"} pt-9 pr-6 pb-6`}`}>
      <div className={`${!isMobile ? "bg-[#111] rounded-[10px] p-6" : "bg-[#111]"} h-full flex flex-col`}>
        {children}
      </div>
    </div>
  )
}

// Navigation Item Component for sidebar
function NavItem({ icon, label, expanded, active, name, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center py-4 px-4 relative ${active === name ? "text-white" : "text-gray-400"} hover:text-white cursor-pointer`}
    >
      <div className="w-6 h-6">{icon}</div>
      {expanded && <span className="ml-4 text-lg">{label}</span>}
      {active === name && !expanded && <div className="absolute right-0 w-1 h-8 bg-white rounded-md"></div>}
    </button>
  )
}

// Navigation Icon for Mobile Footer
export function NavIconFooter({ icon, label, active = false }) {
  return (
    <div className={`flex flex-col items-center ${active ? "text-white" : "text-gray-400"}`}>
      <div className="w-6 h-6">{icon}</div>
      <span className="text-xs mt-1">{label}</span>
    </div>
  )
}

// Mobile Footer Component
export function MobileFooter({ currentPage }) {
  const navigate = useNavigate()
  const [showAuthPage, setShowAuthPage] = useState(false)

  const handleNavigation = (route) => {
    // Check if trying to access explore while not logged in
    if (route === "explore" && !window.localStorage.getItem("token")) {
      setShowAuthPage(true)
    } else {
      navigate(`/${route}`)
    }
  }

  const handleCloseAuthPage = () => {
    setShowAuthPage(false)
  }

  return (
    <>
      <div className="flex justify-around items-center py-3 border-t border-gray-800 bg-[#111] fixed bottom-0 left-0 right-0 z-20">
        <div className="flex flex-col items-center" onClick={() => handleNavigation("explore")}>
          <NavIconFooter icon={<Search />} label="Home" active={currentPage === "explore"} />
        </div>
        <div className="flex flex-col items-center relative" onClick={() => handleNavigation("outreach")}>
          {currentPage === "outreach" && <div className="absolute -top-3 w-12 h-1 bg-white rounded-full"></div>}
          <NavIconFooter icon={<Target />} label="Outreach" active={currentPage === "outreach"} />
        </div>
        <div className="flex flex-col items-center" onClick={() => handleNavigation("resources")}>
          <NavIconFooter icon={<Grid />} label="Resources" active={currentPage === "resources"} />
        </div>
      </div>

      {/* Full-screen Auth Page */}
      {showAuthPage && (
        <div className="fixed inset-0 z-50 bg-black">
          <LandingAuth onClose={handleCloseAuthPage} isPopup={false} />
        </div>
      )}
    </>
  )
}

// Filter Button Component
export function FilterButton({ label, mobile = false }) {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] rounded-md border border-[#333] text-gray-300 ${mobile ? "text-xs" : ""}`}
    >
      {label}
      <Lock size={mobile ? 12 : 16} />
    </button>
  )
}
// Layout Component
export function Layout({ sidebarOpen, setSidebarOpen, children }) {
  const [isMobile, setIsMobile] = useState(false)
  const [currentPage, setCurrentPage] = useState("explore")

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  useEffect(() => {
    // Check if the path includes specific routes to set current page
    if (location.pathname.includes("explore")) {
      setCurrentPage("explore")
    } else if (location.pathname.includes("outreach")) {
      setCurrentPage("outreach")
    } else if (location.pathname.includes("enagage")) {
      setCurrentPage("enagage")
    } else if (location.pathname.includes("resources")) {
      setCurrentPage("resources")
    } else {
      setCurrentPage(location.pathname.split("/").pop()) // Fallback for other pages
    }
  }, [location.pathname])

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {isMobile && <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}

      <div className="flex flex-1 overflow">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <MainContent sidebarOpen={sidebarOpen}>{children}</MainContent>
      </div>

      {isMobile && <MobileFooter currentPage={currentPage} />}
    </div>
  )
}