// "use client";

// import { useState } from "react";
// import "./style.css";
// import FinancialModeling from "../AandF/AandF";
// import { Header, Sidebar } from "../../layout/bars";

// function Categories() {
//   // const [sidebarOpen, setSidebarOpen] = useState(true)
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const tools = [
//     {
//       title: "Equity and Cap Table Management",
//       link: "/cal1",
//     },
//     {
//       title: "Startup Valuation",
//       link: "/cal2",
//     },
//     {
//       title: "Accounting and Finance",
//       link: "/cal3",
//     },
//     {
//       title: "Convertible Notes & SAFE",
//       link: "/cal4",
//     },
//     {
//       title: "Break-Even Analysis",
//       link: "/breakeven",
//     },
//     {
//       title: "Pitch Deck Templates",
//       link: "/pitch-deck",
//     },
//   ];
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const openPopup = (index) => {
//     if (index === 2) {
//       setIsPopupOpen(true);
//       document.body.style.overflow = "hidden"; // Prevent scrolling
//     }
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     document.body.style.overflow = "auto"; // Restore scrolling
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col">
//       <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <div className="flex flex-1 relative">
//         <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//         <main
//           className={`flex-1 p-3 pt-20 transition-all duration-300 ${
//             sidebarOpen ? "ml-64" : "-ml-30"
//           }`}
//         >
//           <div className="main-content2">
//             <div className="content2">
//               <div className="tools-grid">
//                 {tools.map((tool, index) => (
//                   <a
//                     key={index}
//                     href={index === 2 ? "#" : tool.link}
//                     className="tool-card"
//                     onClick={(e) => {
//                       if (index === 2) {
//                         e.preventDefault();
//                         openPopup(index);
//                       }
//                     }}
//                   >
//                     <h2 className="tool-title">{tool.title}</h2>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Popup */}
//           {isPopupOpen && (
//   <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-[2px] flex justify-center items-center z-50">
//     <div className="w-[70%] bg-black rounded-2xl border border-[#75757569] p-6 pb-10 h-[95%] overflow-hidden relative">
      
//       {/* Close Button (X) - Ensure it is always visible */}
      
//       <button
//         className="absolute top-4 right-6 text-white text-2xl z-50 w-[10%]"
//         onClick={closePopup}
//       >
//         ✖
//       </button>

//       {/* Back Button */}
//       <button
//         className="absolute top-4 left-6 text-gray-400 flex items-center gap-2 bg-black p-2 rounded-md z-150"
//         onClick={closePopup}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <polyline points="15 18 9 12 15 6"></polyline>
//         </svg>
//         Back
//       </button>

//       {/* Popup Content */}
//       <main className="overflow-y-scroll h-full scrollbar-hide pt-12"> 
//         <div className="max-w-5xl mx-auto">
//           <FinancialModeling />
//         </div>
//       </main>
//     </div>
//   </div>
// )}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default Categories;

"use client";

import { useState } from "react";
import "./style.css";
import FinancialModeling from "../AandF/AandF";
import EquityManagement from "../Equity_table/Equity_table"; // Example component for another tool
import ValuationCalculator from "../Startup-valuation/Startup-valuation"; // Example component for another tool
import DocandSa from "../DOCandSA/DocandSa"; // Example component for another tool
import { Header, Sidebar } from "../../layout/bars";

function Categories() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);

  const tools = [
    { title: "Equity and Cap Table Management", link: "/cal1", component: <EquityManagement /> },
    { title: "Startup Valuation", link: "/cal2", component: <ValuationCalculator /> },
    { title: "Accounting and Finance", link: "/cal3", component: <FinancialModeling /> },
    { title: "Convertible Notes & SAFE", link: "/cal4", component: <DocandSa /> },
  ];

  const openPopup = (index) => {
    setSelectedTool(index);
    setIsPopupOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedTool(null);
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 relative">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className={`flex-1 p-3 pt-20 transition-all duration-300 ${sidebarOpen ? "ml-64" : "-ml-30"}`}>
          <div className="main-content2">
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

          {/* Popup */}
          {isPopupOpen && selectedTool !== null && (
            <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-[2px] flex justify-center items-center z-50">
              <div className="w-[70%] bg-black rounded-2xl border border-[#75757569] p-6 pb-10 h-[95%] overflow-hidden relative">
                
                {/* Close Button (X) */}
                <button
                  className="absolute top-4 right-6 text-white text-2xl z-50 w-[10%]"
                  onClick={closePopup}
                >
                  ✖
                </button>

                {/* Back Button */}
                <button
                  className="absolute top-4 left-6 text-gray-400 flex items-center gap-2 bg-black p-2 rounded-md z-50"
                  onClick={closePopup}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  Back
                </button>

                {/* Popup Content */}
                <main className="overflow-y-scroll h-full scrollbar-hide pt-12"> 
                  <div className="max-w-5xl mx-auto">
                    {tools[selectedTool].component} {/* Render the selected component */}
                  </div>
                </main>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Categories;
