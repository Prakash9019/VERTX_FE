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
import Select from "react-select";

const MultiSelectDropdown = ({ options, onChange, placeholder }) => {
  return (
    // <div className="MultiSelectDropdown w-full min-w-[150px]">
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
    // </div>
  );
};


export default function Outreach() {
  const navigate = useNavigate();
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
 
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPageSize, setTotalPageSize] = useState(20);
  
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

  
    const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 768);
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

  // Ensure the body and html have black background
  // useEffect(() => {
  //   // Set black background color
  //   document.body.style.backgroundColor = "black";
  //   document.documentElement.style.backgroundColor = "black";
    
  //   // Cleanup function to reset styles when component unmounts
  //   return () => {
  //     document.body.style.backgroundColor = "";
  //     document.documentElement.style.backgroundColor = "";
  //   };
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
  
  // Mobile layout

  // Desktop layout
  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="h-full -ml-5 p-6">
        {/* Content container with #111111 background and border-radius: 10px */}
        <div className="h-full bg-[#111111] rounded-[10px] overflow-hidden flex flex-col">
          <div className="scrollable-content p-6">
          <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold -mt-1 mb-1`}>
              Explore Investors
            </h1>
            <p className="text-xl text-[#CAC5C5] mb-4">
              Find and connect with potential investors
            </p>
            {/* Filters */}
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
        {isMobile && <MobileFooter currentPage={currentPageNav} />}
      </div>
    </Layout>
  );
}