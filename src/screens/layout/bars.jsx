import { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from 'react-router-dom';
import Button from "../../components/button/component";
import PrivacyPolicy from "../More/PrivacyPolicy"; 
import TermsAndConditions from "../More/TermsandConditions";
import LandingAuth from "../landing/index"; 

export function Header({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Function to close the login modal
  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  // Function to close the profile modal
  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  return (
    <header className="top-bar">
      <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>
        
      <div className="logo">
      <svg width="140" height="32" viewBox="0 0 92 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M56.2V3.8Z" fill="white"/>
          <path d="M6.72 3.8Z" fill="white"/>
        </svg>
      </div>
     
      <div className="btwrap mb">
        {!window.localStorage.getItem("token") ? (
          <Button
            context={"Login"}
            theme={"dark"}
            callback={() => {
              setShowLoginModal(true);
            }}
          />
        ) : (
          <div className="header-right">
            <button className="profile-button" onClick={() => setShowProfileModal(true)}>Profile</button>
          </div>
        )}
      </div>

      {/* Login Modal with backdrop */}
      {showLoginModal && (
        
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-[#111111] opacity-90"
            onClick={closeLoginModal}
          ></div>
          <div className="relative z-10 w-auto max-w-4xl">
            <LandingAuth onClose={closeLoginModal} />
          </div>
        </div>
      )}

      {/* Profile Modal with backdrop */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-[#111111] opacity-90"
            onClick={closeProfileModal}
          ></div>
          <div className="relative z-10 w-auto max-w-3xl">
            <LandingAuth onClose={closeProfileModal} />
          </div>
        </div>
      )}
    </header>
  );
}

export function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const [More, setMore] = useState(false);
  const [activeNav, setActiveNav] = useState("Explore");
  const [currentPage, setPage] = useState("Explore");
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  
  useEffect(() => {
    // Check if the path includes "explore" to keep the bar active
    if (location.pathname.includes("explore")) {
      setPage("explore");
    } else {
      setPage(location.pathname.split("/").pop()); // Fallback for other pages
    }
  }, [location.pathname]); // Dependency ensures it updates when URL changes
  
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
    //     <path d="M5.73333 15L4.46667 12.8667L2.06667 12.3333L2.3 9.86667L0.666667 8L2.3 6.13333L2.06667 3.66667L4.46667 3.13333L5.73333 1L8 1.96667L10.2667 1L11.5333 3.13333L13.9333 3.66667L13.7 6.13333L15.3333 8L13.7 9.86667L13.9333 12.3333L11.5333 12.8667L10.2667 15L8 14.0333L5.73333 15ZM6.3 13.3L8 12.5667L9.73333 13.3L10.6667 11.7L12.5 11.2667L12.3333 9.4L13.5667 8L12.3333 6.56667L12.5 4.7L10.6667 4.3L9.7 2.7L8 3.43333L6.26667 2.7L5.33333 4.3L3.5 4.7L3.66667 6.56667L2.43333 8L3.66667 9.4L3.5 11.3L5.33333 11.7L6.3 13.3ZM7.3 10.3667L11.0667 6.6L10.1333 5.63333L7.3 8.46667L5.86667 7.06667L4.93333 8L7.3 10.3667Z" fill="white"/>
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

  // Function to close the privacy policy modal
  const closePrivacyModal = () => {
    setShowPrivacyModal(false);
  };

  const closePopup = () => {
    setShowSearchModal(false);
  }
  
  // Function to handle More button click
  const handleMoreClick = () => {
    // If sidebar is collapsed, expand it first
    if (!sidebarOpen) {
      setSidebarOpen(true);
    }
    // Toggle the More state
    setMore(!More);
  };

  return (
    <>
      <aside className={`sidebar ${sidebarOpen ? "expanded" : "collapsed"}`}>
        <nav>
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

            <li key={123} className="w-full">
              <button
                onClick={handleMoreClick}
                className={`nav-button w-full ${More ? "active" : ""}`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.99984 9.33332C3.63317 9.33332 3.31928 9.20277 3.05817 8.94166C2.79706 8.68055 2.6665 8.36666 2.6665 7.99999C2.6665 7.63332 2.79706 7.31943 3.05817 7.05832C3.31928 6.79721 3.63317 6.66666 3.99984 6.66666C4.3665 6.66666 4.68039 6.79721 4.9415 7.05832C5.20262 7.31943 5.33317 7.63332 5.33317 7.99999C5.33317 8.36666 5.20262 8.68055 4.9415 8.94166C4.68039 9.20277 4.3665 9.33332 3.99984 9.33332ZM7.99984 9.33332C7.63317 9.33332 7.31928 9.20277 7.05817 8.94166C6.79706 8.68055 6.6665 8.36666 6.6665 7.99999C6.6665 7.63332 6.79706 7.31943 7.05817 7.05832C7.31928 6.79721 7.63317 6.66666 7.99984 6.66666C8.3665 6.66666 8.68039 6.79721 8.9415 7.05832C9.20262 7.31943 9.33317 7.63332 9.33317 7.99999C9.33317 8.36666 9.20262 8.68055 8.9415 8.94166C8.68039 9.20277 8.3665 9.33332 7.99984 9.33332ZM11.9998 9.33332C11.6332 9.33332 11.3193 9.20277 11.0582 8.94166C10.7971 8.68055 10.6665 8.36666 10.6665 7.99999C10.6665 7.63332 10.7971 7.31943 11.0582 7.05832C11.3193 6.79721 11.6332 6.66666 11.9998 6.66666C12.3665 6.66666 12.6804 6.79721 12.9415 7.05832C13.2026 7.31943 13.3332 7.63332 13.3332 7.99999C13.3332 8.36666 13.2026 8.68055 12.9415 8.94166C12.6804 9.20277 12.3665 9.33332 11.9998 9.33332Z" fill="white"/>
</svg>

                <span className="nav-text">More</span>
              </button>
            </li>
          </ul>
        </nav>

        {More && (
          <div className="py-4 bg-[#171717] m-4 rounded-xl flex flex-col justify-center align-center text-center py-2">
            <button onClick={() => setShowPrivacyModal(true)} className="hover:text-white py-2">Privacy Policy</button>
            <button onClick={() => setShowSearchModal(true)} className="hover:text-white py-2">Terms Of use</button>
            <a className="hover:text-white py-2">Community</a>
            <hr className="w-1/3 border-t-2 border-gray-400 mx-auto" />

            <button onClick={() =>  {window.localStorage.removeItem("token");    navigate("/authentication");}} className="hover:text-white py-4">Get Out</button>
           
          </div>
        )}

          <div className={`w-4/5 flex flex-col gap-[15px] absolute bottom-[15%] left-1/2 transform -translate-x-1/2`}>
 
            <Button
              theme={"light"}
              context={"VERTX FLOW"}
              callback={() => {
                navigate("/flow/match flow");
              }}
            />
          </div>
       

        <div className="sidebar-toggle-wrapper">
          <button 
            className="sidebar-toggle" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? (
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M19 12H5M11 18l-6-6 6-6" />
           </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 18l6-6-6-6" />
            </svg>
            )}
          </button>
        </div>
      </aside>

      {/* Privacy Policy Modal with backdrop */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-[#111111] opacity-90"
            onClick={closePrivacyModal}
          ></div>
          <div className="relative z-10 w-auto max-w-3xl">
            <PrivacyPolicy onClose={closePrivacyModal} />
          </div>
        </div>
      )}

     { showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-[#111111] opacity-90"
            onClick={closePopup}
          ></div>
          <div className="relative z-10 w-auto max-w-3xl">
            <TermsAndConditions onClose={closePopup} />
          </div>
        </div>
      )}
    </>
  );
}