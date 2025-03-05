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
import Select from "react-select";


const MultiSelectDropdown = ({ options, onChange, placeholder }) => {
  return (
    <div className="MultiSelectDropdown w-full min-w-[150px]">
      <Select
        isMulti
        options={options.map((option) => ({ value: option, label: option }))}
        onChange={(selected) => onChange(selected.map((s) => s.value))}
        placeholder={placeholder}
        className="w-full"
        classNamePrefix="react-select"
        menuPortalTarget={document.body}  // Ensures dropdown renders outside parent
        menuPosition="fixed"  // Prevents clipping issues
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "#161616",
            border: "1px solid #75757569",
            color: "#adadad",
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999, // Ensures dropdown appears above everything
            backgroundColor: "#161616",
            maxHeight: "250px", // Prevents overflow
            overflowY: "auto", // Enables scrolling inside dropdown
          }),
          option: (base, { isFocused }) => ({
            ...base,
            backgroundColor: isFocused ? "#75757569" : "#161616",
            color: "#fff",
          }),
        }}
      />
    </div>
  );
};

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
  const [isMobile, setIsMobile] = useState("");

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

  // useEffect(() => {
  //   async function fetchUserPlan() {
  //     try {
  //       const userRes = await axios.get(`${API_KEY}/payment/me`, { 
  //         headers: { token: localStorage.getItem('token') } 
  //       });
  //       const plan = userRes.data.plan;
  //       setModel(plan);
  //       let newTotalPageSize = 20;
  //       if (plan === 'EXPLORE' || plan === 'OUTREACH') newTotalPageSize = 40;
  //       else if (plan === 'ENTERPRISE') newTotalPageSize = 100;
  //       setTotalPageSize(newTotalPageSize);
  //     } catch (err) {
  //       console.error('Error fetching user plan:', err);
  //     }
  //   }
  //   fetchUserPlan();
  // }, []);

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
          <div className="flex gap-3 overflow-x-auto p-2 w-full">
      {/* Multi-Select Country */}
      <MultiSelectDropdown
        options={Country}
        onChange={(values) => handleFilterChange("country", values)}
        placeholder="Select Countries"
      />

      {/* Multi-Select Investor Type */}
      <MultiSelectDropdown
        options={investorType}
        onChange={(values) => handleFilterChange("investorType", values)}
        placeholder="Investor Type"
      />

      {/* Multi-Select Industry */}
      <MultiSelectDropdown
        options={industries}
        onChange={(values) => handleFilterChange("industry", values)}
        placeholder="Industries"
      />

      {/* Other Filters */}
      <button className="min-w-[150px] px-4 py-2 text-[#adadad] bg-[#161616] border border-[#75757569] rounded-md">
        Ticket
      </button>

      <button
        className={`min-w-[150px] px-4 py-2 border border-[#75757569] rounded-md ${
          bookmarked ? "bg-[#75757569] text-white" : "text-[#adadad] bg-[#161616]"
        }`}
        onClick={toggleBookmarked}
      >
        Bookmarked
      </button>
    </div>

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

        {/* Mobile Footer */}
        {isMobile && <MobileFooter currentPage={currentPageNav} />}
      </div>
    </Layout>
  );
}