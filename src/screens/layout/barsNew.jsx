"use client"

import { useState, useEffect } from "react"
import { Search, Target, Grid, Settings, Lock } from "lucide-react"
import logo from "../../logo.png"
import { useNavigate } from "react-router"
import LandingAuth from "../landing/index"
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

  const handleShowSignupFromAuth = () => {
    setShowAuthPage(false)
    setShowSignupPopup(true)
  }

  const handleCloseSignupPopup = () => {
    setShowSignupPopup(false)
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
    navigate("/explore/bio")
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
              <svg width="469" height="469" viewBox="0 0 469 469" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
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
                          <path fill="#FBFAF4" />
                        </svg>
                      ),
                      label: "Overview",
                      action: handleOverviewClick,
                    },
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
              <LandingAuth onClose={handleCloseAuthPage} isPopup={false} onCreateAccount={handleShowSignupFromAuth} />
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

  const handleShowSignupFromAuth = () => {
    setShowAuthPopup(false)
    setShowSignupPopup(true)
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
    navigate("/explore/bio")
    setShowDesktopProfilePopup(false)
  }

  // Updated navigation handler
  const handleNavigation = (route) => {
    if (route === "explore" && !window.localStorage.getItem("token")) {
      // Show auth popup if user is not logged in and trying to access explore
      setShowAuthPopup(true)
    } else if (route === "explore" && window.localStorage.getItem("exe")) {
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

  // Only show sidebar on desktop

  // const [username1,setUsernamee1] =useState("@username")

  // const handleUsername = async () => {
  //   try {
  //     const token = window.localStorage.getItem("token");
  //     if (!token) return; // Prevent request if token is missing

  //     const response = await axios.get(`${API_KEY}/auth/getUser`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         token: token, // Send token in headers
  //       },
  //     });

  //     // console.log(response.data);
  //     setUsernamee1(response.data.user.username); // Update the username state with the fetched username
  //     window.localStorage.setItem("user",response.data.user.username);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     handleUsername(); // Call the function inside useEffect
  //   }
  // }, []); // Ensures it runs only once on mount

  // Listen for the back button press
  useEffect(() => {
    const handleBackButton = (event) => {
      // Check if user is not logged in
      if (!window.localStorage.getItem("token")) {
        // Redirect to outreach page
        navigate("/outreach")
      }
    }

    window.addEventListener("popstate", handleBackButton)

    return () => {
      window.removeEventListener("popstate", handleBackButton)
    }
  }, [navigate])

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
                <path fill="white" />
              </svg>

              <button onClick={toggleSidebar} className="ml-2 mb-4 bg-black p-1 rounded-full">
                <svg
                  height="22"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-5 -mb-4 font-bold text-xl"
                >
                  <path fill="white" />
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
                        <svg
                          width="469"
                          height="469"
                          viewBox="0 0 469 469"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        ></svg>
                      </div>
                      <div>
                        <p className="text-white text-sm">{window.localStorage.getItem("user") || "@username"}</p>
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
                <svg
                  width="469"
                  height="469"
                  viewBox="0 0 469 469"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>
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
                          <path fill="#FBFAF4" />
                        </svg>
                      ),
                      label: "Overview",
                      action: handleOverviewClick,
                    },
                    {
                      icon: (
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        ></svg>
                      ),
                      label: "Settings",
                    },
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
            <LandingAuth onClose={handleCloseAuthPopup} isPopup={true} onCreateAccount={handleShowSignupFromAuth} />
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

