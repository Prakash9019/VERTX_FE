"use client"
import { useState, useEffect } from "react"
import { Search, Target, Grid, Settings, Lock } from "lucide-react"
import logo from "../../logo.png"
import { useNavigate } from "react-router"
import LandingAuth from "../landing/index"
import axios from "axios"
import API_KEY from "../../../key"
import Signup from "../auth/signup"
import TermsAndConditions from "../More/TermsandConditions"
import PrivacyPolicy from "../More/PrivacyPolicy"
// Header Component
export function Header({ sidebarOpen, setSidebarOpen }) {
  const [isMobile, setIsMobile] = useState(false)
  const [showProfilePopup, setShowProfilePopup] = useState(false)
  const [showTermsPopup, setShowTermsPopup] = useState(false)
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false)
  const [showAuthPage, setShowAuthPage] = useState(false)
  const [showLoginPage, setShowLoginPage] = useState(false)
  const [showSignupPopup, setShowSignupPopup] = useState(false)
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
    if (localStorage.getItem("token")) {
      setShowProfilePopup(!showProfilePopup)
    } else {
      // Show full screen auth page instead of popup when not logged in
      setShowAuthPage(true)
    }
  }
  const handleCloseAuthPage = () => {
    setShowAuthPage(false)
    setShowLoginPage(false)
  }
  const handleShowSignupFromAuth = () => {
    setShowAuthPage(false)
    setShowLoginPage(false)
    setShowSignupPopup(true)
  }
  const handleCloseSignupPopup = () => {
    setShowSignupPopup(false)
  }
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("dip");
    localStorage.removeItem("user");
    localStorage.removeItem("exe");
    window.location.href = "/"
  }
  const handleTermsClick = () => {
    setShowTermsPopup(true)
    setShowProfilePopup(false)
  }

  const handleCommunityClick = () =>{
    navigate("/community")
 }
 
  const handlePrivacyClick = () => {
    setShowPrivacyPopup(true)
    setShowProfilePopup(false)
  }
  const handleOverviewClick = () => {
    navigate("/explore/bio")
    setShowProfilePopup(false)
  }
  
  const handleLogin = () => {
    setShowLoginPage(true)
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
  {localStorage.getItem("token") && localStorage.getItem("dip") ? (
    <img
      alt="User Avatar"
      className="w-10 h-10 bg-white text-gray-700 flex items-center justify-center rounded-full border border-gray-300 font-bold cursor-pointer"
      src={localStorage.getItem("dip")}
    />
  ) : (
<span class="material-symbols-outlined">
person
</span>
  )}
</div>
          </div>
          {/* Adding the horizontal line below the header */}
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-20 h-[0.5px] w-11/12 bg-[#4B4B4B]"></div>
          {/* Profile Popup - only shown for logged in users */}
          {showProfilePopup && localStorage.getItem("token") && (
            <>
              {/* Overlay with 757575 color and low opacity */}
              <div className="fixed inset-0 bg-[#000000]/80 z-30" onClick={() => setShowProfilePopup(false)}></div>
              {/* Popup menu */}
              <div className="fixed top-20 right-4 z-40 bg-black rounded-[20px] shadow-lg w-64 border border-[#1E1E1E] py-4">
  <div className="py-2">
    {[
      { icon: "account_circle", label: "Overview", action: handleOverviewClick },
      { icon: "settings", label: "Settings" },
      { icon: "favorite", label: "Community",action : handleCommunityClick },
      { icon: "shield", label: "Privacy Policy", action: handlePrivacyClick },
      { icon: "gavel", label: "Terms of Service", action: handleTermsClick },
      { icon: "logout", label: "Log out", action: handleLogout }
    ].map((item, index) => (
      <div
        key={index}
        className="px-4 py-3 cursor-pointer flex items-center text-[#d4d4d4] transition-colors duration-200 hover:text-white"
        onClick={item.action}
      >
        <span className="mr-2 material-symbols-outlined w-[28px] h-[28px] text-[28px] leading-[28px] text-white">
          {item.icon}
        </span>
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
              <LandingAuth onClose={handleCloseAuthPage} isPopup={false} onCreateAccount={handleShowSignupFromAuth} />
            </div>
          )}
          {/* Full screen Login Page */}
          {showLoginPage && (
            <div className="fixed inset-0 z-50 bg-black">
              <LandingAuth
                onClose={handleCloseAuthPage}
                isPopup={false}
                onCreateAccount={handleShowSignupFromAuth}
                initialView="login"
              />
            </div>
          )}
          {/* Signup Popup */}
          {showSignupPopup && (
            <div className="fixed inset-0 z-50 bg-black">
              <Signup onClose={handleCloseSignupPopup} isPopup={false} />
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
  const [showLoginPopup, setShowLoginPopup] = useState(false)
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
  // Load sidebar state from localStorage on component mount
  useEffect(() => {
    const savedSidebarState = localStorage.getItem("sidebarOpen")
    if (savedSidebarState !== null) {
      setSidebarOpen(savedSidebarState === "true")
    }
  }, [setSidebarOpen])
  const toggleSidebar = () => {
    const newState = !sidebarOpen
    setSidebarOpen(newState)
    // Save sidebar state to localStorage
    localStorage.setItem("sidebarOpen", newState.toString())
  }
  const handleLogin = () => {
    // Set a flag to identify this is coming from the bars page login button
    localStorage.setItem("fromBarsLogin", "true")
    setShowLoginPopup(true)
  }
  const handleSignup = () => {
    setShowAuthPopup(true)
  }
  const handleCloseAuthPopup = () => {
    setShowAuthPopup(false)
  }
  const handleCloseLoginPopup = () => {
    localStorage.removeItem("fromBarsLogin")
    setShowLoginPopup(false)
  }
  const handleShowSignupFromAuth = () => {
    setShowAuthPopup(false)
    setShowLoginPopup(false)
    setShowSignupPopup(true)
  }
  const handleCloseSignupPopup = () => {
    setShowSignupPopup(false)
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("dip");
    localStorage.removeItem("user");
    localStorage.removeItem("exe");
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
  const handleCommunityClick = () =>{
     navigate("/community")
  }
  const handleOverviewClick = () => {
    navigate("/explore/bio")
    setShowDesktopProfilePopup(false)
  }
  // Updated navigation handler
  const handleNavigation = async (route) => {
    if (route === "explore" && !localStorage.getItem("token")) {
      // Show auth popup if user is not logged in and trying to access explore
      setShowAuthPopup(true)
    } else if (route === "explore" && localStorage.getItem("exe")) {
      navigate("/explore/break")
    } else {
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

  // useEffect(async() => {
  //   if(localStorage.getItem("token")){
  //     const response = await axios.get(`${API_KEY}/profile/fetch`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         token: localStorage.getItem('token')
  //       }
  //     });
  //    // console.log(response.data);
  //     if (response.data.length > 0) {
  //       localStorage.setItem("exe",response.data[0].completed);
  //       // setIsEditing(true); // Enable edit mode if data exists
  //     }
  //   }
  // },[])

  // Listen for the back button press
  useEffect(() => {
    const handleBackButton = (event) => {
      // Check if user is not logged in
      if (!localStorage.getItem("token")) {
        // Redirect to outreach page
        navigate("/outreach")
      }
    }
    window.addEventListener("popstate", handleBackButton)
    return () => {
      window.removeEventListener("popstate", handleBackButton)
    }
  }, [navigate])
  // Add this useEffect after the other useEffect hooks in the Sidebar component
  useEffect(() => {
    const handlePopState = (event) => {
      // Check if this was a login initiated from the bars page
      if (localStorage.getItem("fromBarsLogin") === "true") {
        // Clear the flag
        localStorage.removeItem("fromBarsLogin")
        // Close the login popup
        setShowLoginPopup(false)
        // Prevent default navigation
        event.preventDefault()
        // Navigate directly to the starting page
        navigate("/")
      }
    }
    window.addEventListener("popstate", handlePopState)
    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [navigate])
  // Only show sidebar on desktop
  if (isMobile) return null
  const handleGoogleLogout = async () => {
    try {
      localStorage.removeItem("token")
      localStorage.removeItem("dip");
      localStorage.removeItem("user");
      window.location.href = "/" // Redirect to the homepage after logout
    } catch (error) {
      console.error("Error during logout", error)
    }
  }
  // Handle profile icon click when sidebar is collapsed
  const handleProfileIconClick = () => {
    // Check if user is logged in
    if (localStorage.getItem("token")) {
      // If logged in, show profile popup
      setShowDesktopProfilePopup(!showDesktopProfilePopup)
    } else {
      // If not logged in, show signup popup
      setShowAuthPopup(true)
    }
  }
  if (isMobile) return null
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
            <path d="M6.72 0.799999H8.656V8.176L5.008 12H3.584L0.944 8.096V0.799999H2.88V7.728L4.416 10.016L6.72 7.6V0.799999ZM11.8498 0.799999H18.0898V2.608H12.5858L12.2978 2.928V5.44H15.9938V7.248H12.2978V9.488L12.7618 10.192H18.0898V12H11.8018L10.3618 9.856V2.32L11.8498 0.799999ZM20.1155 0.799999H25.9875L27.8595 3.536V5.408L26.3875 6.928L27.8595 9.088V12H25.9235V9.424L24.4675 7.296H22.8995L22.0515 6.768V12H20.1155V0.799999ZM22.0515 2.608V5.488H25.2995L25.9235 4.848V3.92L25.0115 2.608H22.0515ZM29.4053 0.799999H37.7573V2.608H33.5013L34.5573 3.552V12H32.6213V4L32.1573 2.608H29.4053V0.799999ZM44.791 0.799999H46.727V4.208L45.207 5.76L46.727 7.984V12H44.791V8.352L43.975 7.216H43.239L41.559 8.976V12H39.623V8.368L41.143 6.816L39.623 4.592V0.799999H41.559V4.224L42.343 5.408H43.111L44.791 3.648V0.799999Z" fill="white"/>
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
        {/*console.log(localStorage.getItem("dip"))*/}
        {/* User Profile Section */}
        <div className="flex flex-col items-center mb-6 mt-auto relative">
          {sidebarOpen ? (
            <div className="flex flex-col w-full px-4 space-y-4 mb-4">
              {localStorage.getItem("token") ? (
                <>
<div className="flex items-center justify-between w-full border border-[#111111] rounded-md p-3 mb-4">
  <div className="flex items-center space-x-3">
    {localStorage.getItem("token") && localStorage.getItem("dip") ? (
      <img 
        src={localStorage.getItem("dip")} 
        alt="dp" 
        className="w-10 h-10 bg-white text-gray-700 flex items-center justify-center rounded-full border border-gray-300 font-bold" 
      />
    ) : (
      <div className="w-10 h-10 bg-white text-gray-700 flex items-center justify-center rounded-full border border-gray-300 font-bold">
        <svg width="24" height="24" viewBox="0 0 469 469" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M468.37 234.186C468.37 308.459 433.796 374.655 379.86 417.556C339.877 449.37 289.26 468.37 234.186 468.37C179.112 468.37 128.496 449.37 88.5096 417.556C34.5767 374.655 0 308.459 0 234.186C0 104.851 104.853 -3.05176e-05 234.186 -3.05176e-05C363.519 -3.05176e-05 468.37 104.851 468.37 234.186Z" fill="#111111"/>
<path d="M234.184 308.838C284.45 308.838 325.199 268.089 325.199 217.823C325.199 167.557 284.45 126.808 234.184 126.808C183.918 126.808 143.169 167.557 143.169 217.823C143.169 268.089 183.918 308.838 234.184 308.838Z" fill="#EEEEEE" fill-opacity="0.933333"/>
<path d="M379.86 417.556C339.877 449.371 289.26 468.37 234.186 468.37C179.112 468.37 128.496 449.371 88.5095 417.556C117.79 374.542 172.07 345.654 234.186 345.654C296.302 345.654 350.587 374.535 379.86 417.556Z" fill="#EEEEEE" fill-opacity="0.933333"/>
        </svg>
      </div>
    )}

    
    <div>
      <p className="text-white text-sm">{localStorage.getItem("user") || "@username"}</p>
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
              {/* Make profile image clickable when sidebar is collapsed */}
              {localStorage.getItem("token") && localStorage.getItem("dip") ? (
  <img 
    src={localStorage.getItem("dip")} 
    alt="dp" 
    className="w-10 h-10 bg-white text-gray-700 flex items-center justify-center rounded-full border border-gray-300 font-bold cursor-pointer" 
    onClick={handleProfileIconClick}
  />
) : (
  <div 
    className="w-10 h-10 bg-white text-gray-700 flex items-center justify-center rounded-full border border-gray-300 font-bold cursor-pointer"
    onClick={handleProfileIconClick}
  >
<span class="material-symbols-outlined">
person
</span>

  </div>
)}
              
              {/* Add FlowAI button below the profile pic when sidebar is collapsed */}
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center mt-4">
                <span
                  className="text-black"
                  style={{
                    fontFamily: "Playfair Display",
                    fontSize: "14px",
                    lineHeight: "100%",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Fl
                </span>
              </div>
            </div>
          )}

          {showDesktopProfilePopup && localStorage.getItem("token") && (
            <>
              {/* Add overlay to capture clicks outside the popup */}
              <div className="fixed inset-0 z-40" onClick={() => setShowDesktopProfilePopup(false)}></div>

              <div className={`absolute ${sidebarOpen ? 'bottom-[130px] right-[-210px]' : 'bottom-[100px] right-[-220px]'} z-50 w-64 bg-[black] rounded-lg shadow-lg border border-[#333] p-4`}>
                <div className="py-2">
                {[
      { icon: "account_circle", label: "Overview", action: handleOverviewClick },
      { icon: "settings", label: "Settings" },
      { icon: "favorite", label: "Community" , action: handleCommunityClick },
      { icon: "shield", label: "Privacy Policy", action: handlePrivacyClick },
      { icon: "gavel", label: "Terms of Service", action: handleTermsClick },
      { icon: "logout", label: "Log out", action: handleLogout }
    ].map((item, index) => (
      <div
        key={index}
        className="px-4 py-3 cursor-pointer flex items-center text-[#d4d4d4] transition-colors duration-200 hover:text-white"
        onClick={item.action}
      >
        <span className="mr-2 material-symbols-outlined w-[28px] h-[28px] text-[28px] leading-[28px] text-white">
          {item.icon}
        </span>
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
            <LandingAuth onClose={handleCloseAuthPopup} isPopup={true} onCreateAccount={handleShowSignupFromAuth} />
          </div>
        </div>
      )}

      {/* Login Popup with Backdrop */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={handleCloseLoginPopup}></div>
          <div className="z-50">
            <LandingAuth
              onClose={handleCloseLoginPopup}
              isPopup={true}
              onCreateAccount={handleShowSignupFromAuth}
              initialView="login"
            />
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
  const [showLoginPage, setShowLoginPage] = useState(false)
  const [showAuthPopup, setShowAuthPopup] = useState(false)

  const handleNavigation = (route) => {
    if (route === "explore" && !localStorage.getItem("token")) {
      // Show full-screen auth page (LandingAuth) if user is not logged in and trying to access explore
      setShowAuthPage(true)
    } else if (route === "explore" && localStorage.getItem("exe")) {
      navigate("/explore/break")
    } else {
      navigate(`/${route}`)
    }
  }

  const handleCloseAuthPage = () => {
    setShowAuthPage(false)
    setShowLoginPage(false)
  }

  const handleShowSignupFromAuth = () => {
    setShowAuthPage(false)
    setShowLoginPage(false)
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

      {/* Full-screen Auth Page for non-logged-in users clicking home */}
      {showAuthPage && (
        <div className="fixed inset-0 z-50 bg-black">
          <LandingAuth 
            onClose={handleCloseAuthPage} 
            isPopup={false} 
            onCreateAccount={handleShowSignupFromAuth}
          />
        </div>
      )}

      {/* Full-screen Login Page */}
      {showLoginPage && (
        <div className="fixed inset-0 z-50 bg-black">
          <LandingAuth 
            onClose={handleCloseAuthPage} 
            isPopup={false} 
            onCreateAccount={handleShowSignupFromAuth}
            initialView="login" 
          />
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
export function Layout({ children }) {
  const [isMobile, setIsMobile] = useState(false)
  const [currentPage, setCurrentPage] = useState("explore")
  // Initialize sidebar state from localStorage with a default value
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const savedState = localStorage.getItem("sidebarOpen")
    return savedState !== null ? savedState === "true" : true // Default to true if no saved state
  })

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






