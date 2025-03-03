// import "./style.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { industries, Country, investorType } from "./filters.js";
import { Lock, Search, Target, Users, Grid } from 'lucide-react';
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

  // Check if device is mobile based on screen width
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto close sidebar on mobile
      if (mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    }
    
    // Initial check
    checkIsMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [sidebarOpen]);
  
  // Set current page for navigation highlighting
  useEffect(() => {
    // This should be "outreach" for this page
    setCurrentPageNav("outreach");
  }, []);

  // Ensure the body and html have black background
  useEffect(() => {
    // Set black background color
    document.body.style.backgroundColor = "black";
    document.documentElement.style.backgroundColor = "black";
    
    // Cleanup function to reset styles when component unmounts
    return () => {
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    async function fetchUserPlan() {
      try {
        const userRes = await axios.get(`${API_KEY}/payment/me`, { headers: { token: localStorage.getItem('token') } });
        const plan = userRes.data.plan;
        setModel(plan);
        let newTotalPageSize = 20;
        if (plan === 'EXPLORE' || plan === 'OUTREACH') newTotalPageSize = 40;
        else if (plan === 'ENTERPRISE') newTotalPageSize = 100;
        setTotalPageSize(newTotalPageSize);
      } catch (err) {
        console.error('Error fetching user plan:', err);
      }
    }
    fetchUserPlan();
  }, []);

  useEffect(() => {
    async function getInvestors() {
      try {
        setLoading(true);
        const response = await axios.get(`${API_KEY}/investors`, {
          headers: { token: localStorage.getItem('token') },
          params: { 
            page: currentPage, 
            limit: pageSize,
            ...filters
          }
        });
        setInvestors(response.data.data);
        setTotalRecords(response.data.totalCount);
      } catch (err) {
        setError('Failed to fetch investors');
      } finally {
        setLoading(false);
      }
    }
    getInvestors();
  }, [currentPage, pageSize, filters]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    
    // Scroll to top of the scrollable container instead of the window
    const mainContent = document.querySelector('.scrollable-content');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setCurrentPage(1);
  };

  const toggleBookmarked = () => {
    const newBookmarked = !bookmarked;
    setBookmarked(newBookmarked);
    handleFilterChange("bookmarked", newBookmarked);
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalRecords / pageSize);
  const isUpgradeRequired = currentPage * 20 > totalPageSize;
  
  // Render different layouts for mobile and desktop
  if (isMobile) {
    return (
      <div className="h-screen bg-black overflow-hidden flex flex-col">
        {/* Mobile Header */}
        <div className="flex justify-between items-center p-4 bg-black">
          <div className="flex items-center">
            <svg viewBox="0 0 24 24" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L22 18H2L12 3Z" stroke="white" strokeWidth="2" />
            </svg>
            <span className="ml-2 text-white font-bold text-xl">VERTX</span>
          </div>
          <div className="w-10 h-10 bg-white text-gray-700 flex items-center justify-center rounded-full border border-gray-300 font-bold">
            P
          </div>
        </div>
        
        {/* Filter options - mobile version */}
        <div className="p-4 pt-0">
          <div className="flex overflow-x-auto gap-2 pb-3 hide-scrollbar">
            <div className="flex-shrink-0 bg-[#161616] border border-[#75757569] rounded-md px-3 py-2 text-[#adadad] flex items-center gap-2">
              Type <Lock size={14} className="text-white" />
            </div>
            <div className="flex-shrink-0 bg-[#161616] border border-[#75757569] rounded-md px-3 py-2 text-[#adadad] flex items-center gap-2">
              Industry <Lock size={14} className="text-white" />
            </div>
            <div className="flex-shrink-0 bg-[#161616] border border-[#75757569] rounded-md px-3 py-2 text-[#adadad] flex items-center gap-2">
              Country <Lock size={14} className="text-white" />
            </div>
            <div className="flex-shrink-0 bg-[#161616] border border-[#75757569] rounded-md px-3 py-2 text-[#adadad] flex items-center gap-2">
              Ticket <Lock size={14} className="text-white" />
            </div>
          </div>
        </div>

        {/* Mobile main content */}
        <div className="flex-1 overflow-y-auto bg-black px-4 pb-20">
          {/* Investor Cards - mobile layout */}
          {loading ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
              <img src={gify} alt="Loading..." className="w-20 h-20" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {investors.map((item, index) => (
                <div key={item._id || index} className="bg-[#111111] p-4 rounded-lg border border-[#222]">
                  <div className="mb-2 flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-bold">{item.name || "First Check VC"}</h3>
                      <p className="text-gray-400 text-sm">{item.type || "VC Firm"}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-transparent border border-[#333] text-white rounded-full px-4 py-1 text-sm">
                        Mark
                      </button>
                      <button className="bg-transparent border border-[#333] text-white rounded-full px-4 py-1 text-sm">
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
                <div className="filter">
                  {model === "EXPLORE" ? (
                    <>
                      <div className="blur-4 flex flex-row justify-between gap-3 w-max h-max px-4 py-2 text-[#adadad] font-manrope bg-[#161616] border border-[#75757569] rounded-md">
                        Country <i className="material-icons text-white">lock</i>
                      </div>
                      <div className="blur-4 flex flex-row justify-between gap-3 w-max h-max px-4 py-2 text-[#adadad] font-manrope bg-[#161616] border border-[#75757569] rounded-md">
                        Investor Type <i className="material-icons text-white">lock</i>
                      </div>
                      <div className="blur-4 flex flex-row justify-between gap-3 w-max h-max px-4 py-2 text-[#adadad] font-manrope bg-[#161616] border border-[#75757569] rounded-md">
                        Industries <i className="material-icons text-white">lock</i>
                      </div>
                      <div className="blur-4 flex flex-row justify-between gap-3 w-max h-max px-4 py-2 text-[#adadad] font-manrope bg-[#161616] border border-[#75757569] rounded-md">
                        Ticket <i className="material-icons text-white">lock</i>
                      </div>
                      <div className="blur-4 flex flex-row justify-between gap-3 w-max h-max px-4 py-2 text-[#adadad] font-manrope bg-[#161616] border border-[#75757569] rounded-md">
                        Bookmarked
                      </div>
                    </>
                  ) : (
                    <>
                      <select className="sel" onChange={(e) => handleFilterChange("country", e.target.value)}>
                        <option value="" disabled selected>Country</option>
                        {Country.map((country, i) => (
                          <option key={i} value={country}>{country}</option>
                        ))}
                      </select> 

                      <select className="sel" onChange={(e) => handleFilterChange("investorType", e.target.value)}>
                        <option value="" disabled selected>Investor Type</option>
                        {investorType.map((investorType, i) => (
                          <option key={i} value={investorType}>{investorType}</option>
                        ))}
                      </select>

                      <select className="sel" onChange={(e) => handleFilterChange("industry", e.target.value)}>
                        <option value="" disabled selected>Industries</option>
                        {industries.map((industry, i) => (
                          <option key={i} value={industry}>{industry}</option>
                        ))}
                      </select>
                      
                      <button className="sel">Ticket</button>
                      <button 
                        className={`sel ${bookmarked ? 'active-filter' : ''}`}
                        onClick={toggleBookmarked}
                        style={{ color: "#757575", borderColor: "#757575" }}
                      >
                        Bookmarked
                      </button>
                    </>
                  )}
                </div>

                {error && <div className="error-message">{error}</div>}

                {/* Investor Cards */}
                 <div className="profilecards">
                                {loading ? (
                                  <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
                                    <img src={gify} alt="Loading..." className="w-20 h-20" />
                                  </div>
                                ) : (
                                  <>
                                    {isUpgradeRequired && (
                                      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                        <button className="bg-white p-4 rounded text-center text-black text-lg" onClick={()=> navigate("/sub")}>
                                          🔒 Upgrade to unlock
                                        </button>
                                      </div>
                                    )}
                                    {investors.map((item, index) => (
                                      <div key={item._id || index} className={` ${isUpgradeRequired ? 'blur-sm' : ''}`}>
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
                  <span className="page-info">Page {currentPage} of {totalPages}</span>
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