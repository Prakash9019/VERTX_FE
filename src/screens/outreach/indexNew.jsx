// import "./style.css";
"use client"
import { useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import { industries, Country, investorType } from "./filters.js";
import { Lock, Search, Target, Users, Grid } from 'lucide-react';
import API_KEY from "../../../key";
import axios from "axios";
import { Header, Sidebar, NavIconFooter, Layout, MainContent, FilterButton, MobileFooter } from "../layout/barsNew.jsx";
import Card from "../../components/investorCard/component";
import gify from "./gify.gif";
import "./style.css"
import Select from "react-select";

const MultiSelectDropdown = ({ options, onChange, placeholder }) => {
  return (
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
              /* Custom scrollbar styles */
              scrollbarWidth: "none", /* Firefox */
              "&::-webkit-scrollbar": {
                  display: "none" /* Chrome, Safari, and Opera */
              }
          }),
          option: (base, { isFocused }) => ({
              ...base,
              backgroundColor: isFocused ? "#75757569" : "#161616",
              color: "#fff",
          }),
      }}
    />
  );
};


export default function Outreach2() {
  const navigate = useNavigate();
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  
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
    bookmarked: "",
  });
  
  // Create a ref for the scrollable content
  const scrollableContentRef = useRef(null);
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
  
  useEffect(() => {
    console.log("Updated isMobile:", isMobile, window.innerWidth);
  }, [isMobile]);  // Log when isMobile changes
  
  
  // Set current page for navigation highlighting
  useEffect(() => {
    // Check if the path includes "explore" to keep the bar active
    if (location.pathname.includes("explore")) {
      setCurrentPageNav("explore");
    } else {
      setCurrentPageNav(location.pathname.split("/").pop()); // Fallback for other pages
    }
  }, [location.pathname]);

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
        
        // Scroll to top after data is loaded
        if (scrollableContentRef.current) {
          scrollableContentRef.current.scrollTop = 0;
        } else {
          window.scrollTo(0, 0);
        }
      } catch (err) {
        setError('Failed to fetch investors');
      } finally {
        setLoading(false);
      }
    }

    const fetchBookmarks = async () => {
      try {
        const res = await axios.get(`${API_KEY}/bookmarks`, { headers: { token : localStorage.getItem("token") } });
        console.log(res.data.map(b => b.investor));
        setBookmarks(res.data.map(b => b.investor)); // Store only investor IDs
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    getInvestors();
    fetchBookmarks();
  }, [currentPage, pageSize, filters]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    
    // Scroll to top immediately
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setCurrentPage(1);
    
    // Also scroll to top when filters change
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }
  };

  const toggleBookmarked = () => {
    const newBookmarked = !bookmarked;
    setBookmarked(newBookmarked);
    
    // Scroll to top when toggling bookmarked
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalRecords / pageSize);
  const isUpgradeRequired = currentPage * 20 > totalPageSize;
  
  const toggleBookmark = async (investorId) => {
    try {
      const isBookmarked = bookmarks.includes(investorId);
      const url = isBookmarked ? `${API_KEY}/bookmarks/remove/${investorId}` : `${API_KEY}/bookmarks/add`;
      const method = isBookmarked ? "DELETE" : "POST";
      const body = isBookmarked ? { id :investorId } : { id :investorId };
      const res = await axios({
        method,
        url,
        headers: { "Content-Type": "application/json", "token" : localStorage.getItem("token") },
        data: body,
      });
      if (res.status === 200 || res.status === 201) {
        setBookmarks((prev) => 
          isBookmarked ? prev.filter((id) => id !== investorId) : [...prev, investorId]
        );
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };
  
  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="flex flex-col min-h-screen">
        <div 
          ref={scrollableContentRef}
          className={`${isMobile ? 'px-4 mt-10 pb-24 flex-grow' : ' w-full px-4 mx-auto'} overflow-y-auto scrollable-content fixed-height-container scrollbar-hide`}

        >
          <div className={`text-left ${isMobile ? 'ml-0' : ''}`}>
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold -mt-1 mb-1`}>
              Explore Investors
            </h1>
            <p className="text-xl text-[#CAC5C5] mb-4">
              Find and connect with potential investors
            </p>
          </div>
          
          {/* Filters */}
          <div className="filter mb-4 grid grid-rows-4 md:grid-rows-2 lg:grid-rows-1 gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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

              {/* Bookmarked Button */}
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
                {!bookmarked && investors.map((item, index) => (
                  <div key={item._id || index} >
                    <Card
                      key={item._id || index}
                      data={item}
                      toggleBookmark={toggleBookmark}
                      isBookmarked={bookmarks.includes(item._id)}
                    />
                  </div>
                ))}
                {
                  bookmarked && bookmarks.map((item, index) => (
                    <div key={item._id || index} >
                      <Card
                        key={item._id || index}
                        data={item}
                        toggleBookmark={toggleBookmark}
                        isBookmarked={bookmarks.includes(item._id)}
                      />
                    </div>
                  ))
                }
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
        {isMobile && <MobileFooter currentPage={currentPageNav} />}
      </div>
    </Layout>
  );
}