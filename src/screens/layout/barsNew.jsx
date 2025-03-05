import { useState, useEffect } from "react"
import { Search, Target, Users, User, Grid, Settings, LogOut, UserCircle, ShieldQuestion, Shield, Lock } from "lucide-react"
import logo from "../../logo.png"
import { useNavigate } from "react-router"
import LandingAuth from "../landing/index"
import Signup from "../auth/index"
import TermsAndConditions from "../More/TermsandConditions"
import PrivacyPolicy from "../More/PrivacyPolicy"
import API_KEY from "../../../key"
import axios from "axios"

// Header Component
export function Header({ sidebarOpen, setSidebarOpen }) {
  const [isMobile, setIsMobile] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);

  // Check if device is mobile based on screen width
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkIsMobile()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const handleProfileClick = () => {
    setShowProfilePopup(!showProfilePopup);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  const handleTermsClick = () => {
    setShowTermsPopup(true);
    setShowProfilePopup(false);
  }

  const handlePrivacyClick = () => {
    setShowPrivacyPopup(true);
    setShowProfilePopup(false);
  }

  return (
    <>
      {/* Header for Mobile - fixed at top */}
      {isMobile && (
        <>
          <div className="flex justify-between items-center p-4 bg-[#111] fixed top-0 left-0 right-0 z-20">
            <div className="flex items-center">
              <img src={logo} alt="logo" className="w-10 h-10"/>
            </div>
            {window.localStorage.getItem('token') ?
             <div 
              className="w-10 h-10 bg-white text-gray-700 flex items-center justify-center rounded-full border border-gray-300 font-bold cursor-pointer"
              onClick={handleProfileClick}
            >
               <User  />
            </div> :
                <div 
                className="w-10 h-10 bg-white text-gray-700 flex items-center justify-center rounded-full border border-gray-300 font-bold cursor-pointer"
              >
                 <User  />
              </div>            
            }
            
          </div>
          {/* Adding the horizontal line below the header */}
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-20 h-[0.5px] w-11/12 bg-[#4B4B4B]"></div>

          {/* Profile Popup */}
          {showProfilePopup && (
            <>
              {/* Overlay with 757575 color and low opacity */}
              <div 
                className="fixed inset-0 bg-[#000000]/80 z-30"
                onClick={() => setShowProfilePopup(false)}
              ></div>

              {/* Popup menu */}
              <div className="fixed top-20 right-4 z-40 bg-black rounded-[20px] shadow-lg w-64 border border-[#1E1E1E] py-4">
                <div className="py-2">
                  {[
                    { icon: "👤", label: "Overview" },
                    { icon: "⚙️", label: "Settings" },
                    { icon: "❤️", label: "Community" },
                    { icon: "🛡️", label: "Privacy Policy", action: handlePrivacyClick },
                    { icon: "📜", label: "Terms of Service", action: handleTermsClick },
                    { icon: "🚪", label: "Log out", action: handleLogout },
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

          {/* Terms and Conditions Popup */}
          {showTermsPopup && (
            <TermsAndConditions onClose={() => setShowTermsPopup(false)} />
          )}

          {/* Privacy Policy Popup */}
          {showPrivacyPopup && (
            <PrivacyPolicy onClose={() => setShowPrivacyPopup(false)} />
          )}
        </>
      )}
    </>
  )
}

// Sidebar Component
export function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setPage] = useState("explore");
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showDesktopProfilePopup, setShowDesktopProfilePopup] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);

  // Check if device is mobile based on screen width
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkIsMobile()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleLogin = () => {
    setShowAuthPopup(true);
  }

  const handleSignup = () => {
    setShowSignupPopup(true);
  }

  const handleCloseAuthPopup = () => {
    setShowAuthPopup(false);
  }

  const handleCloseSignupPopup = () => {
    setShowSignupPopup(false);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  const handlePrivacyClick = () => {
    setShowPrivacyPopup(true);
    setShowDesktopProfilePopup(false);
  }

  const handleTermsClick = () => {
    setShowTermsPopup(true);
    setShowDesktopProfilePopup(false);
  }

  useEffect(() => {
    // Check if the path includes "explore" to keep the bar active
    if (location.pathname.includes("explore")) {
      setPage("explore");
    } else {
      setPage(location.pathname.split("/").pop()); // Fallback for other pages
    }
  }, [location.pathname]);

  // Only show sidebar on desktop
  if (isMobile) return null;

  const handleGoogleLogout = async () => {
    try {
      localStorage.removeItem('token');
      window.location.href = '/';  // Redirect to the homepage after logout
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <>
      <div className={`flex flex-col h-full bg-black transition-all duration-300 ${sidebarOpen ? "w-64" : "w-24"} fixed left-0 top-0 bottom-0 z-10`}>
        {/* Logo */}
        <div className="p-5 pb-2 flex items-center">
          <div className={`${sidebarOpen ? "ml-3 " : "-ml-2"} mt-4 pt-3 text-white`}>
            <img src={logo} alt="image"  className={`w-12 ml-3  ${sidebarOpen ? "h-10" : "h-12"}`}/>
          </div>
          {sidebarOpen && (
            <div className="flex items-center">
              <svg height="25" viewBox="0 0 47 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="-mb-5 font-bold text-xl">
                <path d="M6.72 0.7799999Z" fill="white"/>
              </svg>

              <button onClick={toggleSidebar} className="ml-2 bg-black p-1 rounded-full">
                <svg height="22" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-5 -mb-4 font-bold text-xl">
                  <path d="M11.017 0.383523V12.3438H12.9347V0.383523H11.017ZM4.03917 10.206L5.04769 9.20455L2.94542 7.10227H7.50508V5.625H2.94542L5.04769 3.52273L4.03917 2.52131L0.19684 6.36364L4.03917 10.206Z" fill="white"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="ml-3 flex flex-col flex-grow mt-10">
          <NavItem icon={<Search />} active={currentPage} name="explore" label="Explore" expanded={sidebarOpen} />
          <NavItem icon={<Target />} active={currentPage} name="outreach" label="Outreach" expanded={sidebarOpen} />
          <NavItem icon={<Grid />} active={currentPage} name="resources" label="Resources" expanded={sidebarOpen} />
        </div>

        {/* User Profile Section */}
        <div className="flex flex-col items-center mb-6 mt-auto relative">
          {sidebarOpen ? (
            <div className="flex flex-col w-full px-4 space-y-4 mb-4">
              {window.localStorage.getItem('token') ? (
                <>
                  <div className="flex items-center justify-between w-full bg-[#1a1a1a] rounded-md p-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white text-gray-700 flex items-center justify-center rounded-full border border-gray-300 font-bold">
                        <User />
                      </div>
                      <div>
                        <p className="text-white text-sm">Mark Zuckerberg</p>    
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowDesktopProfilePopup(!showDesktopProfilePopup)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Settings size={20} />
                    </button>
                  </div>
                  <div className="flex justify-center items-center ">
                    <button className="w-40 h-10 bg-white text-gray-700 border border-gray-300 rounded-md font-bold" 
                      onClick={() => handleGoogleLogout()}>
                      Vertex Flow
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
                  <path d="M3.77273 0.613636V19.75H0.704545V0.613636H3.77273ZM14.9373 16.3295L13.3237 14.7273L16.6873 11.3636H9.39188V9H16.6873L13.3237 5.63636L14.9373 4.03409L21.0851 10.1818L14.9373 16.3295Z" fill="white"/>
                </svg>
              </button>
              <div className="w-10 h-10 bg-white text-gray-700 flex items-center justify-center rounded-full border border-gray-300 font-bold">
                <User />
              </div>
            </div>
          )}

        {/* Desktop Profile Popup (Bottom Right) */}
        {showDesktopProfilePopup && (
            <div className="absolute bottom-[120px] right-[-200px] z-50 w-64 bg-[#1E1E1E] rounded-lg shadow-lg border border-[#333] p-4">
              <div className="space-y-2">
                {[
                  { icon: "👤", label: "Overview" },
                  { icon: "⚙️", label: "Settings" },
                  { icon: "❤️", label: "Community" },
                  { icon: "🛡️", label: "Privacy Policy", action: handlePrivacyClick },
                  { icon: "📜", label: "Terms of Service", action: handleTermsClick },
                  { icon: "🚪", label: "Log out", action: handleLogout }
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
          )}
        </div>
      </div>

      {/* Auth Popup */}
      {showAuthPopup && (
        <LandingAuth onClose={handleCloseAuthPopup} />
      )}

      {/* Signup Popup */}
      {showSignupPopup && (
        <Signup onClose={handleCloseSignupPopup} />
      )}

      {/* Terms and Conditions Popup */}
      {showTermsPopup && (
        <TermsAndConditions onClose={() => setShowTermsPopup(false)} />
      )}

      {/* Privacy Policy Popup */}
      {showPrivacyPopup && (
        <PrivacyPolicy onClose={() => setShowPrivacyPopup(false)} />
      )}
    </>
  );
}

// Main Content Component
export function MainContent({ sidebarOpen, children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return (
    <div className={`flex-1 ${isMobile ? "pt-16 pb-16" : `ml-${sidebarOpen ? "64" : "24"} pt-9 pr-6 pb-6`}`}>
      <div className={`${!isMobile ? "bg-[#111] rounded-[10px] p-6" : "bg-[#111]"} h-full flex flex-col`}>
        {children}
      </div>
    </div>
  );
}

// Navigation Item Component for sidebar
function NavItem({ icon, label, expanded, active, name }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        console.log(`/${name}`);
        navigate(`/${name}`);
      }}
      className={`flex items-center py-4 px-4 relative ${active === name ? "text-white" : "text-gray-400"} hover:text-white cursor-pointer`}
    >
      <div className="w-6 h-6">{icon}</div>
      {expanded && <span className="ml-4 text-lg">{label}</span>}
      {active === name && !expanded && (
        <div className="absolute right-0 w-1 h-8 bg-white rounded-md"></div>
      )}
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
  const navigate = useNavigate();
  
  const handleNavigation = (route) => {
    navigate(`/${route}`);
  };
  
  return (
    <div className="flex justify-around items-center py-3 border-t border-gray-800 bg-[#111] fixed bottom-0 left-0 right-0 z-20">
      <div className="flex flex-col items-center" onClick={() => handleNavigation('explore')}>
        <NavIconFooter icon={<Search />} label="Home" active={currentPage === "explore"} />
      </div>
      <div className="flex flex-col items-center relative" onClick={() => handleNavigation('outreach')}>
        {currentPage === "outreach" && (
          <div className="absolute -top-3 w-12 h-1 bg-white rounded-full"></div>
        )}
        <NavIconFooter icon={<Target />} label="Outreach" active={currentPage === "outreach"} />
      </div>
      {/* <div className="flex flex-col items-center" onClick={() => handleNavigation('enagage')}>
        <NavIconFooter icon={<Users />} label="Engage" active={currentPage === "enagage"} />
      </div> */}
      <div className="flex flex-col items-center" onClick={() => handleNavigation('resources')}>
        <NavIconFooter icon={<Grid />} label="Resources" active={currentPage === "resources"} />
      </div>
    </div>
  );
}

// Filter Button Component
export function FilterButton({ label, mobile = false }) {
  return (
    <button className={`flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] rounded-md border border-[#333] text-gray-300 ${mobile ? "text-xs" : ""}`}>
      {label}
      <Lock size={mobile ? 12 : 16} />
    </button>
  )
}

// Layout Component
export function Layout({ sidebarOpen, setSidebarOpen, children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState("explore");
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])
  
  useEffect(() => {
    // Check if the path includes specific routes to set current page
    if (location.pathname.includes("explore")) {
      setCurrentPage("explore");
    } else if (location.pathname.includes("outreach")) {
      setCurrentPage("outreach");
    } else if (location.pathname.includes("enagage")) {
      setCurrentPage("enagage");
    } else if (location.pathname.includes("resources")) {
      setCurrentPage("resources");
    } else {
      setCurrentPage(location.pathname.split("/").pop()); // Fallback for other pages
    }
  }, [location.pathname]);
  
  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {isMobile && <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
      
      <div className="flex flex-1 overflow">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <MainContent sidebarOpen={sidebarOpen}>
          {children}
        </MainContent>
      </div>
      
      {isMobile && <MobileFooter currentPage={currentPage} />}
    </div>
  );
}