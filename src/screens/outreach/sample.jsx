import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { industries, Country, investorType } from "./filters.js";
import { Lock, Search, Target, Users, Grid, X } from 'lucide-react';
import API_KEY from "../../../key";
import axios from "axios";
import { Header, Sidebar, NavIconFooter, Layout, MainContent, FilterButton, MobileFooter } from "../layout/barsNew.jsx";
import Card from "../../components/investorCard/component";
import gify from "./gify.gif";
import "./styleNew.css"

export default function Outreach() {
  const navigate = useNavigate();
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // New state for selected investor details
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPageSize, setTotalPageSize] = useState(20);
  const [model, setModel] = useState("EXPLORE");
  const [maxLimit, setmaxLimit] = useState(0);
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Current page for navigation highlighting
  const [currentPageNav, setCurrentPageNav] = useState("outreach");

  // Filters state
  const [filters, setFilters] = useState({
    country: "",
    industry: "",
    investorType: "",
    bookmarked: false,
  });

  // ... [previous useEffect hooks remain the same]

  // Function to handle investor card click
  const handleInvestorCardClick = (investor) => {
    setSelectedInvestor(investor);
  };

  // Function to close investor details
  const closeInvestorDetails = () => {
    setSelectedInvestor(null);
  };

  // Mobile Investor Details Modal
  const MobileInvestorDetailsModal = ({ investor, onClose }) => {
    if (!investor) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black overflow-y-auto">
        <div className="relative w-full h-full">
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-50 text-white p-2 rounded-full bg-[#222] hover:bg-[#333]"
          >
            <X size={24} />
          </button>

          {/* Investor Card Component */}
          <div className="px-4 pt-16 pb-4">
            <Card data={investor} fullDetails={true} />
          </div>
        </div>
      </div>
    );
  };

  // Modify mobile render to include investor details modal
  if (isMobile) {
    return (
      <div className="h-screen bg-black overflow-hidden flex flex-col">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {/* Filter options - mobile version */}
        <div className="p-4 pt-20">
          <div className="flex overflow-x-auto gap-2 pb-3 hide-scrollbar">
            <FilterButton label="Type" mobile={true} />
            <FilterButton label="Industry" mobile={true} />
            <FilterButton label="Country" mobile={true} />
            <FilterButton label="Ticket" mobile={true} />
          </div>
        </div>

        {/* Mobile main content */}
        <div className="flex-1 overflow-y-auto bg-black px-4 pb-20">
          {loading ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
              <img src={gify} alt="Loading..." className="w-20 h-20" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {investors.map((item, index) => (
                <div 
                  key={item._id || index} 
                  className="bg-[#111111] p-4 rounded-lg border border-[#222]"
                  onClick={() => handleInvestorCardClick(item)}
                >
                  <div className="mb-2 flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-bold">{item.name || "First Check VC"}</h3>
                      <p className="text-gray-400 text-sm">{item.type || "VC Firm"}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-transparent border border-[#333] text-white rounded-full px-4 py-1 text-sm">
                        Mark
                      </button>
                      <button 
                        className="bg-transparent border border-[#333] text-white rounded-full px-4 py-1 text-sm"
                        onClick={() => handleInvestorCardClick(item)}
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Pagination for mobile */}
          <div className="flex justify-center items-center my-6 px-4">
            <button 
              className="px-4 py-2 bg-[#222] text-white rounded-md disabled:opacity-50"
              disabled={currentPage === 1} 
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <span className="mx-4 text-white">
              {currentPage} / {totalPages}
            </span>
            <button 
              className="px-4 py-2 bg-[#222] text-white rounded-md disabled:opacity-50"
              disabled={currentPage === totalPages} 
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
        
        {/* Mobile footer using MobileFooter component */}
        <MobileFooter currentPage={currentPageNav} />

        {/* Investor Details Modal */}
        {selectedInvestor && (
          <MobileInvestorDetailsModal 
            investor={selectedInvestor} 
            onClose={closeInvestorDetails} 
          />
        )}
      </div>
    );
  }


  // Desktop layout
  return (
    <div className="h-screen bg-black overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {/* Main content area */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-24"} h-full overflow-hidden`}>
          <div className="h-full -ml-5 p-6">
            {/* Content container with #111111 background and border-radius: 10px */}
            <div className="h-full bg-[#111111] rounded-[10px] overflow-hidden flex flex-col">
              <div className="scrollable-content p-6">
                <p className="head mt-14 text-white font-bold">Explore and connect.</p>

                {/* Filters */}
                {/* <div className="filter"> */}
                <div className="flex gap-3 overflow-x-auto p-2 w-full">
  <div className="flex flex-row justify-between items-center min-w-[150px] px-4 py-2 text-[#adadad] font-manrope bg-[#161616] border border-[#75757569] rounded-md">
    <select
      className="w-full bg-transparent text-[#adadad] outline-none"
      onChange={(e) => handleFilterChange("country", e.target.value)}
    >
      <option value="" disabled selected>Country</option>
      {Country.map((country, i) => (
        <option key={i} value={country} className="text-black">{country}</option>
      ))}
    </select>
  </div>

  <select
    className="min-w-[150px] px-4 py-2 text-[#adadad] bg-[#161616] border border-[#75757569] rounded-md"
    onChange={(e) => handleFilterChange("investorType", e.target.value)}
  >
    <option value="" disabled selected>Investor Type</option>
    {investorType.map((investorType, i) => (
      <option key={i} value={investorType}>{investorType}</option>
    ))}
  </select>

  <select
    className="min-w-[150px] px-4 py-2 text-[#adadad] bg-[#161616] border border-[#75757569] rounded-md"
    onChange={(e) => handleFilterChange("industry", e.target.value)}
  >
    <option value="" disabled selected>Industries</option>
    {industries.map((industry, i) => (
      <option key={i} value={industry}>{industry}</option>
    ))}
  </select>

  <button className="min-w-[150px] px-4 py-2 text-[#adadad] bg-[#161616] border border-[#75757569] rounded-md">
    Ticket
  </button>

  <button
    className={`min-w-[150px] px-4 py-2 border border-[#75757569] rounded-md ${bookmarked ? 'bg-[#75757569] text-white' : 'text-[#adadad] bg-[#161616]'}`}
    onClick={toggleBookmarked}
  >
    Bookmarked
  </button>
</div>

                {/* </div> */}

                {error && <div className="error-message">{error}</div>}

                {/* Investor Cards */}
                 <div className="profilecards">
                                {loading ? (
                                  <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
                                    <img src={gify} alt="Loading..." className="w-20 h-20" />
                                  </div>
                                ) : (
                                  <>
                                  
                                    {investors.map((item, index) => (
                                      <div key={item._id || index} >
                                        <Card data={item} />
                                      </div>
                                    ))}
                                  </>
                                )}
                              </div>
                
                {/* Pagination Controls */}
                <div className="pagination mt-8 mb-12">
                  <button 
                    className="pagination-button"
                    disabled={currentPage === 1} 
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                  <span className="page-info">Page {currentPage} </span>
                  <button 
                    className="pagination-button"
                    disabled={currentPage === totalPages} 
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}