"use client"

import { useState, useEffect } from "react"
import { Search, Target, Users, Grid, ChevronLeft, ChevronRight, Lock } from "lucide-react"
import logo from "../../logo.png"
import { useNavigate } from "react-router"
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
  const navItems = [
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
      </svg>
      ), 
      text: "Explore",
      link: "/explore",
      name: "explore"
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 14.6667C7.07778 14.6667 6.21111 14.4917 5.4 14.1417C4.58889 13.7917 3.88333 13.3167 3.28333 12.7167C2.68333 12.1167 2.20833 11.4111 1.85833 10.6C1.50833 9.78889 1.33333 8.92222 1.33333 8C1.33333 7.07778 1.50833 6.21111 1.85833 5.4C2.20833 4.58889 2.68333 3.88334 3.28333 3.28334C3.88333 2.68334 4.58889 2.20834 5.4 1.85834C6.21111 1.50834 7.07778 1.33334 8 1.33334C9.62222 1.33334 11.0417 1.84167 12.2583 2.85834C13.475 3.875 14.2333 5.15 14.5333 6.68334H13.1667C12.9556 5.87222 12.575 5.14722 12.025 4.50834C11.475 3.86945 10.8 3.38889 10 3.06667V3.33334C10 3.7 9.86944 4.01389 9.60833 4.275C9.34722 4.53611 9.03333 4.66667 8.66667 4.66667H7.33333V6C7.33333 6.18889 7.26944 6.34722 7.14167 6.475C7.01389 6.60278 6.85556 6.66667 6.66667 6.66667H5.33333V8H6.66667V10H6L2.8 6.8C2.76667 7 2.73611 7.2 2.70833 7.4C2.68056 7.6 2.66667 7.8 2.66667 8C2.66667 9.45556 3.17778 10.7056 4.2 11.75C5.22222 12.7944 6.48889 13.3222 8 13.3333V14.6667ZM14.0667 14.3333L11.9333 12.2C11.7 12.3333 11.45 12.4444 11.1833 12.5333C10.9167 12.6222 10.6333 12.6667 10.3333 12.6667C9.5 12.6667 8.79167 12.375 8.20833 11.7917C7.625 11.2083 7.33333 10.5 7.33333 9.66667C7.33333 8.83334 7.625 8.125 8.20833 7.54167C8.79167 6.95834 9.5 6.66667 10.3333 6.66667C11.1667 6.66667 11.875 6.95834 12.4583 7.54167C13.0417 8.125 13.3333 8.83334 13.3333 9.66667C13.3333 9.96667 13.2889 10.25 13.2 10.5167C13.1111 10.7833 13 11.0333 12.8667 11.2667L15 13.4L14.0667 14.3333ZM10.3333 11.3333C10.8 11.3333 11.1944 11.1722 11.5167 10.85C11.8389 10.5278 12 10.1333 12 9.66667C12 9.2 11.8389 8.80556 11.5167 8.48334C11.1944 8.16111 10.8 8 10.3333 8C9.86667 8 9.47222 8.16111 9.15 8.48334C8.82778 8.80556 8.66667 9.2 8.66667 9.66667C8.66667 10.1333 8.82778 10.5278 9.15 10.85C9.47222 11.1722 9.86667 11.3333 10.3333 11.3333Z" fill="white"/>
        </svg>
      ), 
      text: "Outreach",
      link: "/outreach",
      name: "outreach"
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 10.6667C6.36667 10.6667 6.68055 10.5361 6.94167 10.275C7.20278 10.0139 7.33333 9.7 7.33333 9.33334C7.33333 8.96667 7.20278 8.65278 6.94167 8.39167C6.68055 8.13056 6.36667 8 6 8C5.63333 8 5.31944 8.13056 5.05833 8.39167C4.79722 8.65278 4.66667 8.96667 4.66667 9.33334C4.66667 9.7 4.79722 10.0139 5.05833 10.275C5.31944 10.5361 5.63333 10.6667 6 10.6667ZM10 10.6667C10.3667 10.6667 10.6806 10.5361 10.9417 10.275C11.2028 10.0139 11.3333 9.7 11.3333 9.33334C11.3333 8.96667 11.2028 8.65278 10.9417 8.39167C10.6806 8.13056 10.3667 8 10 8C9.63333 8 9.31944 8.13056 9.05833 8.39167C8.79722 8.65278 8.66667 8.96667 8.66667 9.33334C8.66667 9.7 8.79722 10.0139 9.05833 10.275C9.31944 10.5361 9.63333 10.6667 10 10.6667ZM8 7.33334C8.36667 7.33334 8.68055 7.20278 8.94167 6.94167C9.20278 6.68056 9.33333 6.36667 9.33333 6C9.33333 5.63334 9.20278 5.31945 8.94167 5.05834C8.68055 4.79722 8.36667 4.66667 8 4.66667C7.63333 4.66667 7.31944 4.79722 7.05833 5.05834C6.79722 5.31945 6.66667 5.63334 6.66667 6C6.66667 6.36667 6.79722 6.68056 7.05833 6.94167C7.31944 7.20278 7.63333 7.33334 8 7.33334ZM8 14.6667C7.07778 14.6667 6.21111 14.4917 5.4 14.1417C4.58889 13.7917 3.88333 13.3167 3.28333 12.7167C2.68333 12.1167 2.20833 11.4111 1.85833 10.6C1.50833 9.78889 1.33333 8.92222 1.33333 8C1.33333 7.07778 1.50833 6.21111 1.85833 5.4C2.20833 4.58889 2.68333 3.88334 3.28333 3.28334C3.88333 2.68334 4.58889 2.20834 5.4 1.85834C6.21111 1.50834 7.07778 1.33334 8 1.33334C8.92222 1.33334 9.78889 1.50834 10.6 1.85834C11.4111 2.20834 12.1167 2.68334 12.7167 3.28334C13.3167 3.88334 13.7917 4.58889 14.1417 5.4C14.4917 6.21111 14.6667 7.07778 14.6667 8C14.6667 8.92222 14.4917 9.78889 14.1417 10.6C13.7917 11.4111 13.3167 12.1167 12.7167 12.7167C12.1167 13.3167 11.4111 13.7917 10.6 14.1417C9.78889 14.4917 8.92222 14.6667 8 14.6667ZM8 13.3333C9.48889 13.3333 10.75 12.8167 11.7833 11.7833C12.8167 10.75 13.3333 9.48889 13.3333 8C13.3333 6.51111 12.8167 5.25 11.7833 4.21667C10.75 3.18334 9.48889 2.66667 8 2.66667C6.51111 2.66667 5.25 3.18334 4.21667 4.21667C3.18333 5.25 2.66667 6.51111 2.66667 8C2.66667 9.48889 3.18333 10.75 4.21667 11.7833C5.25 12.8167 6.51111 13.3333 8 13.3333Z" fill="white"/>
</svg>
      ), 
      text: "Enagage",
      link: "/enagage",
      name: "enagage"
    },
    // { 
    //   icon: (
    //     <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    //     <path d="M5.733330.3667Z" fill="white"/>
    //     </svg>
    //   ), 
    //   text: "Activity",
    //   link: "/activity",
    //   name: "activity"
    // },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 13.3333C3.63333 13.3333 3.31944 13.2028 3.05833 12.9417C2.79722 12.6806 2.66667 12.3667 2.66667 12C2.66667 11.6333 2.79722 11.3195 3.05833 11.0583C3.31944 10.7972 3.63333 10.6667 4 10.6667C4.36667 10.6667 4.68056 10.7972 4.94167 11.0583C5.20278 11.3195 5.33333 11.6333 5.33333 12C5.33333 12.3667 5.20278 12.6806 4.94167 12.9417C4.68056 13.2028 4.36667 13.3333 4 13.3333ZM8 13.3333C7.63333 13.3333 7.31945 13.2028 7.05833 12.9417C6.79722 12.6806 6.66667 12.3667 6.66667 12C6.66667 11.6333 6.79722 11.3195 7.05833 11.0583C7.31945 10.7972 7.63333 10.6667 8 10.6667C8.36667 10.6667 8.68056 10.7972 8.94167 11.0583C9.20278 11.3195 9.33333 11.6333 9.33333 12C9.33333 12.3667 9.20278 12.6806 8.94167 12.9417C8.68056 13.2028 8.36667 13.3333 8 13.3333ZM12 13.3333C11.6333 13.3333 11.3194 13.2028 11.0583 12.9417C10.7972 12.6806 10.6667 12.3667 10.6667 12C10.6667 11.6333 10.7972 11.3195 11.0583 11.0583C11.3194 10.7972 11.6333 10.6667 12 10.6667C12.3667 10.6667 12.6806 10.7972 12.9417 11.0583C13.2028 11.3195 13.3333 11.6333 13.3333 12C13.3333 12.3667 13.2028 12.6806 12.9417 12.9417C12.6806 13.2028 12.3667 13.3333 12 13.3333ZM4 9.33334C3.63333 9.33334 3.31944 9.20278 3.05833 8.94167C2.79722 8.68056 2.66667 8.36667 2.66667 8.00001C2.66667 7.63334 2.79722 7.31945 3.05833 7.05834C3.31944 6.79723 3.63333 6.66667 4 6.66667C4.36667 6.66667 4.68056 6.79723 4.94167 7.05834C5.20278 7.31945 5.33333 7.63334 5.33333 8.00001C5.33333 8.36667 5.20278 8.68056 4.94167 8.94167C4.68056 9.20278 4.36667 9.33334 4 9.33334ZM8 9.33334C7.63333 9.33334 7.31945 9.20278 7.05833 8.94167C6.79722 8.68056 6.66667 8.36667 6.66667 8.00001C6.66667 7.63334 6.79722 7.31945 7.05833 7.05834C7.31945 6.79723 7.63333 6.66667 8 6.66667C8.36667 6.66667 8.68056 6.79723 8.94167 7.05834C9.20278 7.31945 9.33333 7.63334 9.33333 8.00001C9.33333 8.36667 9.20278 8.68056 8.94167 8.94167C8.68056 9.20278 8.36667 9.33334 8 9.33334ZM12 9.33334C11.6333 9.33334 11.3194 9.20278 11.0583 8.94167C10.7972 8.68056 10.6667 8.36667 10.6667 8.00001C10.6667 7.63334 10.7972 7.31945 11.0583 7.05834C11.3194 6.79723 11.6333 6.66667 12 6.66667C12.3667 6.66667 12.6806 6.79723 12.9417 7.05834C13.2028 7.31945 13.3333 7.63334 13.3333 8.00001C13.3333 8.36667 13.2028 8.68056 12.9417 8.94167C12.6806 9.20278 12.3667 9.33334 12 9.33334ZM4 5.33334C3.63333 5.33334 3.31944 5.20278 3.05833 4.94167C2.79722 4.68056 2.66667 4.36667 2.66667 4.00001C2.66667 3.63334 2.79722 3.31945 3.05833 3.05834C3.31944 2.79723 3.63333 2.66667 4 2.66667C4.36667 2.66667 4.68056 2.79723 4.94167 3.05834C5.20278 3.31945 5.33333 3.63334 5.33333 4.00001C5.33333 4.36667 5.20278 4.68056 4.94167 4.94167C4.68056 5.20278 4.36667 5.33334 4 5.33334ZM8 5.33334C7.63333 5.33334 7.31945 5.20278 7.05833 4.94167C6.79722 4.68056 6.66667 4.36667 6.66667 4.00001C6.66667 3.63334 6.79722 3.31945 7.05833 3.05834C7.31945 2.79723 7.63333 2.66667 8 2.66667C8.36667 2.66667 8.68056 2.79723 8.94167 3.05834C9.20278 3.31945 9.33333 3.63334 9.33333 4.00001C9.33333 4.36667 9.20278 4.68056 8.94167 4.94167C8.68056 5.20278 8.36667 5.33334 8 5.33334ZM12 5.33334C11.6333 5.33334 11.3194 5.20278 11.0583 4.94167C10.7972 4.68056 10.6667 4.36667 10.6667 4.00001C10.6667 3.63334 10.7972 3.31945 11.0583 3.05834C11.3194 2.79723 11.6333 2.66667 12 2.66667C12.3667 2.66667 12.6806 2.79723 12.9417 3.05834C13.2028 3.31945 13.3333 3.63334 13.3333 4.00001C13.3333 4.36667 13.2028 4.68056 12.9417 4.94167C12.6806 5.20278 12.3667 5.33334 12 5.33334Z" fill="white"/>
        </svg>
      ), 
      text: "Resouces",
      link: "/resources",
      name: "resources",
    },
  ];
  // Only show sidebar on desktop
  if (isMobile) return null;

  return (
    <div className={`flex flex-col h-full bg-black transition-all duration-300 ${sidebarOpen ? "w-64" : "w-24"} fixed left-0 top-0 bottom-0 z-10`}>
      {/* Logo */}
      <div className="p-5 pb-2 flex items-center">
        <div className={`${sidebarOpen ? "ml-3 " : "-ml-2"} mt-4 pt-3 text-white`}>
          {/* <svg viewBox="0 0 24 24" height={sidebarOpen ? "30" : "50"} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3L22 18H2L12 3Z" stroke="white" strokeWidth="2" />
          </svg> */}

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


        {/* <nav>
          <ul className="nav-list">
            {navItems.map((item, index) => (
              <li key={index} className="w-full">
                <button
                  onClick={() => {
                    console.log(item.text);
                    setActiveNav(item.text);
                    navigate(item.link);
                  }}

                  className={`nav-button w-full ${!More && currentPage === item.name ? "active" : ""}`}
                >
                  {item.icon}
                  <span className="nav-text">{item.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav> */}

      </div>

      {/* User profiles */}
      <div className="flex flex-col items-center mb-6">
        {sidebarOpen ? (
          <>
            <div className="flex flex-col items-center space-y-4 mb-4">
              <button className="w-40 h-10 bg-white text-gray-700 border border-gray-300 rounded-md font-bold">Profile</button>
              <button className="w-40 h-10 bg-white text-gray-700 border border-gray-300 rounded-md font-bold">Vertex Flow</button>
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
  );
}

// Main Content Component (New)
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
function NavItem({ icon, label, expanded,active ,name }) {
  return (
    <div className={`flex items-center py-4 px-4 relative ${active === name ? "text-white" : "text-gray-400"} hover:text-white cursor-pointer`}>
    
      <div className="w-6 h-6">{icon}</div>
      {expanded && <span className="ml-4 text-lg">{label}</span>}
      {active === name && !expanded && (
        <div className="absolute right-0 w-1 h-8 bg-white rounded-md"></div>
      )}
    </div>
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

// Layout Component (New)
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