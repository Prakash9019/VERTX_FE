"use client";

import { useState, useEffect } from "react";
import "./style.css";
import FinancialModeling from "../AandF/AandF";
import EquityManagement from "../Equity_table/Equity_table";
import ValuationCalculator from "../Startup-valuation/Startup-valuation";
import DocandSa from "../DOCandSA/DocandSa";
import {
  Header,
  Sidebar,
  MainContent,
  Layout,
  NavIconFooter,
  MobileFooter,
} from "../../layout/bars";
import { Search, Target, Users, Grid } from "lucide-react";

function Categories() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);

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

  const openPopup = (index) => {
    setSelectedTool(index);
    setIsPopupOpen(true);
    // Allow scrolling on mobile devices
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedTool(null);
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  // Create tools array with closePopup function passed to each component
  const tools = [
    {
      title: "Equity and Cap Table Management",
      link: "/cal1",
      component: <EquityManagement onClose={closePopup} />,
    },
    {
      title: "Startup Valuation",
      link: "/cal2",
      component: <ValuationCalculator onClose={closePopup} />,
    },
    {
      title: "Accounting and Finance",
      link: "/cal3",
      component: <FinancialModeling onClose={closePopup} />,
    },
    {
      title: "Convertible Notes & SAFE",
      link: "/cal4",
      component: <DocandSa onClose={closePopup} />,
    },
  ];

  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="flex flex-col min-h-screen">
        <div
          className={`${
            isMobile
              ? "px-4 -mt-5 pb-24 flex-grow"
              : "w-full px-4 mx-auto mt-16"
          } overflow-y-auto`}
        >
          <div className="main-content2 pt-[4rem] sm:pt-0">
            <div className="content2">
              <div className="tools-grid">
                {tools.map((tool, index) => (
                  <a
                    key={index}
                    href="#"
                    className="tool-card"
                    onClick={(e) => {
                      e.preventDefault();
                      openPopup(index);
                    }}
                  >
                    <h2 className="tool-title">{tool.title}</h2>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup with consistent scroll behavior across devices */}
      {isPopupOpen && selectedTool !== null && (
        <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-[2px] flex justify-center items-center z-50">
          <div className="w-[70%] max-sm:w-[95%] bg-black rounded-2xl border border-[#75757569] p-6 max-sm:p-2 h-[95%] max-sm:h-[85%] relative">
            {/* Single scrollable container for all content including close button */}
            <div className="overflow-y-auto h-full scrollbar-hide">
              {/* Close button that scrolls with content */}
              <div className="flex justify-end ">
                <button
                  onClick={closePopup}
                  className="mr-2"
                  // className="p-2  text-white bg-gray-800 rounded-full  hover:bg-gray-700 transition-colors"
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 32 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.25"
                      y="0.25"
                      width="31.5"
                      height="25.5"
                      rx="12.75"
                      stroke="#757575"
                      stroke-width="0.5"
                    />
                    <path
                      d="M12.9834 8.04688L15.7861 12.251L18.5957 8.04688H19.5938L16.2988 12.9482L19.6963 18H18.6914L15.7861 13.6592L12.8809 18H11.8828L15.2803 12.9482L11.9854 8.04688H12.9834Z"
                      fill="#757575"
                    />
                  </svg>
                </button>
              </div>

              {/* Popup Content */}
              <div className="max-w-5xl mx-auto pb-8">
                {tools[selectedTool].component}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Using the MobileFooter component */}
      {isMobile && <MobileFooter currentPage={currentPage} />}
    </Layout>
  );
}

export default Categories;
