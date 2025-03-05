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
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {/* Filter options - mobile version */}
        <div className="p-4 pt-0">
          <div className="flex overflow-x-auto gap-2 pb-3 hide-scrollbar">
            <FilterButton label="Type" mobile={true} />
            <FilterButton label="Industry" mobile={true} />
            <FilterButton label="Country" mobile={true} />
            <FilterButton label="Ticket" mobile={true} />
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
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="h-full -ml-5 p-6">
        <div className="h-full bg-[#111111] rounded-[10px] overflow-hidden flex flex-col">
          <div className="scrollable-content p-6">
            <p className="head mt-14 text-white font-bold">Explore and connect.</p>

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
    </Layout>
  );
}