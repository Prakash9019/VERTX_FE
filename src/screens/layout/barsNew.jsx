"use client"

import { useState, useEffect } from "react"
import { Search, Target, Users, Grid, ChevronLeft, ChevronRight, Lock } from "lucide-react"
import logo from "../../logo.png"
import { useNavigate } from "react-router"
import LandingAuth from "../landing/index" // Update this path to match your project structure

// Header Component
export function Header({ sidebarOpen, setSidebarOpen }) {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <>
      {/* Header for Mobile */}
      {isMobile && (
        <div className="flex justify-between items-center p-4 bg-black">
          <div className="flex items-center">
            <svg viewBox="0 0 24 24" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L22 18H2L12 3Z" stroke="white" strokeWidth="2" />
            </svg>
            <svg height="25" viewBox="0 0 47 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
              <path d="M6.72 0.799999H8.699Z" fill="white"/>
            </svg>
          </div>
          <div className="w-10 h-10 bg-white text-gray-700 flex items-center justify-center rounded-full border border-gray-300 font-bold">
            P
          </div>
        </div>
      )}
    </>
  )
}

// Sidebar Component
export function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [More, setMore] = useState(false);
  const [activeNav, setActiveNav] = useState("Explore");
  const [currentPage, setPage] = useState("explore");
  const [showAuthPopup, setShowAuthPopup] = useState(false);

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

  const handleCloseAuthPopup = () => {
    setShowAuthPopup(false);
  }
  
  useEffect(() => {
    // Check if the path includes "explore" to keep the bar active
    if (location.pathname.includes("explore")) {
      setPage("explore");
    } else {
      setPage(location.pathname.split("/").pop()); // Fallback for other pages
    }
    // console.log(currentPage)
  }, [location.pathname]); // Dependency ensures it updates when URL changes
  // {console.log(currentPage)}

  // Only show sidebar on desktop
  if (isMobile) return null;

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
          <NavItem icon={<Users />} active={currentPage} name="enagage" label="Engage" expanded={sidebarOpen} />
          <NavItem icon={<Grid />} active={currentPage} name="resources" label="Resources" expanded={sidebarOpen} />
        </div>

        {/* User profiles */}
        <div className="flex flex-col items-center mb-6">
          {sidebarOpen ? (
            <>
              <div className="flex flex-col items-center space-y-4 mb-4">
                {window.localStorage.getItem('token') ?
                <>
                  <button className="w-40 h-10 bg-white text-gray-700 border border-gray-300 rounded-md font-bold">Profile</button>
                  <button className="w-40 h-10 bg-white text-gray-700 border border-gray-300 rounded-md font-bold">Vertex Flow</button>
                </> :
                <>
                  <button className="w-40 h-10 bg-[#FBFAF4] text-black border border-gray-300 rounded-md font-bold">Sign Up</button>
                  <button 
                    className="w-40 h-10 bg-[##1F1F1F] text-[#FBFAF4] border border-gray-300 rounded-md font-bold" 
                    onClick={handleLogin}
                  >
                    Log in
                  </button>
                </>
                }
              </div>
            </>
          ) : (
            <>
              <button onClick={toggleSidebar} className="mb-4 bg-black p-1 rounded-full">
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.77273 0.613636V19.75H0.704545V0.613636H3.77273ZM14.9373 16.3295L13.3237 14.7273L16.6873 11.3636H9.39188V9H16.6873L13.3237 5.63636L14.9373 4.03409L21.0851 10.1818L14.9373 16.3295Z" fill="white"/>
                </svg>
              </button>
              <div className="flex flex-col items-center space-y-4 mb-4">
                <div className="w-10 h-10 bg-white text-gray-700 flex items-center justify-center rounded-full border border-gray-300 font-bold">P</div>
                <div className="w-10 h-10 bg-white text-gray-700 flex items-center justify-center rounded-full border border-gray-300 font-bold">VF</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Auth Popup */}
      {showAuthPopup && (
        <LandingAuth onClose={handleCloseAuthPopup} />
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
    <div className={`flex-1 ${isMobile ? "pt-0" : `ml-${sidebarOpen ? "64" : "24"} pt-9 pr-6 pb-6`}`}>
      <div className={`${!isMobile ? "bg-[#111] rounded-[10px] p-6" : "bg-black"} h-full flex flex-col`}>
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
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])
  
  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {isMobile && <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <MainContent sidebarOpen={sidebarOpen}>
          {children}
        </MainContent>
      </div>
    </div>
  );
}