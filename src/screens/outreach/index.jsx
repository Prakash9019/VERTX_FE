import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import API_KEY from "../../../key"
import { Search, Target, Users, Grid } from "lucide-react"
import { Header, Sidebar, Layout, NavIconFooter, MobileFooter } from "../layout/barsNew"

import "./style.css"
import { industries, Country, investorType } from "./filters.js"
import gify from "./gify.gif"
import Card from "../../components/investorCard/component";

export default function Outreach() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPageSize, setTotalPageSize] = useState(20);
  const [model, setModel] = useState("EXPLORE");
  const [currentPageNav, setCurrentPageNav] = useState("explore");

  // Mobile responsiveness
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 768);

  // Filters state
  const [filters, setFilters] = useState({
    country: "",
    industry: "",
    investorType: "",
    bookmarked: false,
  });

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    // Check if the path includes "explore" to keep the bar active
    if (location.pathname.includes("explore")) {
      setCurrentPageNav("explore");
    } else {
      setCurrentPageNav(location.pathname.split("/").pop()); // Fallback for other pages
    }
  }, [location.pathname]);

  useEffect(() => {
    async function fetchUserPlan() {
      try {
        const userRes = await axios.get(`${API_KEY}/payment/me`, { 
          headers: { token: localStorage.getItem('token') } 
        });
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
  
  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="flex flex-col min-h-screen">
        <div className={`${isMobile ? 'px-4 mt-10 pb-24 flex-grow' : 'max-w-4xl w-full px-4 mx-auto mt-16'} overflow-y-auto`}>
          <div className={`text-left ${isMobile ? 'ml-0' : 'ml-10'}`}>
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold -mt-1 mb-1`}>
              Explore Investors
            </h1>
            <p className="text-xl text-[#CAC5C5] mb-4">
              Find and connect with potential investors
            </p>
          </div>

          {/* Filters */}
          <div className="filter mb-4">
            {model === "EXPLORE" ? (
              <>
                {["Country", "Investor Type", "Industries", "Ticket", "Bookmarked"].map((filter, index) => (
                  <div 
                    key={index} 
                    className="blur-4 flex flex-row justify-between gap-3 w-max h-max px-4 py-2 text-[#adadad] font-manrope bg-[#161616] border border-[#75757569] rounded-md"
                  >
                    {filter} <i className="material-icons text-white">lock</i>
                  </div>
                ))}
              </>
            ) : (
              <>
                <select 
                  className="sel" 
                  onChange={(e) => handleFilterChange("country", e.target.value)}
                >
                  <option value="" disabled selected>Country</option>
                  {Country.map((country, i) => (
                    <option key={i} value={country}>{country}</option>
                  ))}
                </select> 

                <select 
                  className="sel" 
                  onChange={(e) => handleFilterChange("investorType", e.target.value)}
                >
                  <option value="" disabled selected>Investor Type</option>
                  {investorType.map((type, i) => (
                    <option key={i} value={type}>{type}</option>
                  ))}
                </select>

                <select 
                  className="sel" 
                  onChange={(e) => handleFilterChange("industry", e.target.value)}
                >
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
                    <button 
                      className="bg-white p-4 rounded text-center text-black text-lg" 
                      onClick={() => navigate("/sub")}
                    >
                      🔒 Upgrade to unlock
                    </button>
                  </div>
                )}
                {investors.map((item, index) => (
                  <div 
                    key={item._id || index} 
                    className={`${isUpgradeRequired ? 'blur-sm' : ''}`}
                  >
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

        {/* Mobile Footer */}
        {isMobile && <MobileFooter currentPage={currentPageNav} />}
      </div>
    </Layout>
  );
}