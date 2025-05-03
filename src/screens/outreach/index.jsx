// import "./style.css";
"use client";
import { useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import {
  industries,
  Country,
  investorType,
  previousFunding,
  Global_hq,
} from "./filters.js";
import API_KEY from "../../../key";
import axios from "axios";
import { Layout, MobileFooter } from "../layout/bars.jsx";
import Card from "../../components/investorCard/component";
import gify from "./gify.gif";
import "./style.css";
import Select from "react-select";
import logo from "./womensDay.png";
import { Search } from "lucide-react";

const MultiSelectDropdown = ({
  options,
  onChange,
  placeholder,
  value,
  hideSelectedValues,
}) => {
  // Create a ref for manually handling input width
  const selectedValues = value || [];

  return (
    <div className="filter-dropdown-container">
      <Select
        isMulti
        options={options.map((option) => ({ value: option, label: option }))}
        onChange={(selected) =>
          onChange(selected ? selected.map((s) => s.value) : [])
        }
        placeholder={placeholder}
        value={selectedValues.map((val) => ({ value: val, label: val }))}
        className="w-full"
        classNamePrefix="react-select"
        menuPortalTarget={document.body} // Ensures dropdown renders outside parent
        menuPosition="fixed" // Prevents clipping issues
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "#161616",
            border: "1px solid #75757569",
            color: "#ffffff", // Changed text color to white
            minHeight: "36px",
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999, // Ensures dropdown appears above everything
            backgroundColor: "#161616",
            maxHeight: "250px", // Prevents overflow
            overflowY: "auto", // Enables scrolling inside dropdown
            /* Custom scrollbar styles */
            scrollbarWidth: "none" /* Firefox */,
            "&::-webkit-scrollbar": {
              display: "none" /* Chrome, Safari, and Opera */,
            },
          }),
          option: (base, { isFocused }) => ({
            ...base,
            backgroundColor: isFocused ? "#75757569" : "#161616",
            color: "#ffffff",
          }),
          valueContainer: (base) => ({
            ...base,
            padding: "0 8px",
            fontSize: window.innerWidth < 768 ? "12px" : "14px",
            color: "#ffffff", // Changed text color to white
          }),
          placeholder: (base) => ({
            ...base,
            fontSize: window.innerWidth < 768 ? "12px" : "14px",
            display: "block", // Always display the placeholder
            position: "relative",
            transform: "none",
            top: "auto",
            left: "auto",
            opacity: "1 !important",
            transition: "none",
            color: "#CAC5C5", // Keep placeholder gray
          }),
          input: (base) => ({
            ...base,
            color: "#ffffff", // Changed input text color to white
          }),
          singleValue: (base) => ({
            ...base,
            fontSize: window.innerWidth < 768 ? "12px" : "14px",
            color: "#ffffff", // Changed text color to white
          }),
          multiValue: (base) => ({
            ...base,
            display: "none", // Hide default multi-value display
            fontSize: window.innerWidth < 768 ? "11px" : "13px",
          }),
          multiValueLabel: (base) => ({
            ...base,
            display: "none", // Hide the multi-value labels
          }),
          multiValueRemove: (base) => ({
            ...base,
            display: "none", // Hide the multi-value remove buttons
          }),
          indicatorsContainer: (base) => ({
            ...base,
            // Keep the indicators container visible
          }),
        }}
        isClearable={false} // Disable the clear button
        controlShouldRenderValue={false} // Don't render selected values in the control
      />

      {/* Display selected values below the dropdown, but only if not from search */}
      {selectedValues.length > 0 && !hideSelectedValues && (
        <div className="selected-filters">
          {selectedValues.map((value) => (
            <div key={value} className="filter-chip">
              <span>{value}</span>
              <span
                className="remove-chip"
                onClick={() => {
                  onChange(selectedValues.filter((v) => v !== value));
                }}
              >
                ×
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Add city to country mapping
const cityToCountry = {
  // Major Indian cities
  delhi: "India",
  mumbai: "India",
  bangalore: "India",
  bengaluru: "India",
  hyderabad: "India",
  chennai: "India",
  kolkata: "India",

  // US cities
  "new york": "United States",
  "san francisco": "United States",
  "los angeles": "United States",
  chicago: "United States",
  boston: "United States",
  seattle: "United States",
  "silicon valley": "United States",

  // UK cities
  london: "United Kingdom",
  manchester: "United Kingdom",
  birmingham: "United Kingdom",

  // Singapore
  singapore: "Singapore",

  // China cities
  beijing: "China",
  shanghai: "China",
  shenzhen: "China",

  // Japan cities
  tokyo: "Japan",
  osaka: "Japan",

  // UAE cities
  dubai: "United Arab Emirates",
  "abu dhabi": "United Arab Emirates",

  // Add more cities as needed
};

export default function Outreach2() {
  const navigate = useNavigate();
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [womenLed, setWomenLed] = useState(false); // New state for women-led filter
  const [bookmarks, setBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResponse, setSearchResponse] = useState(null); // Add this state for Gemini response
  const [isSearchFiltering, setIsSearchFiltering] = useState(false); // New state to track if filters are from search

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(21);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [pageSize1, setPageSize1] = useState(21);
  const [totalRecords1, setTotalRecords1] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPageSize, setTotalPageSize] = useState(21);

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Current page for navigation highlighting
  const [currentPageNav, setCurrentPageNav] = useState("outreach");
  // Filters state
  const [filters, setFilters] = useState({
    country: [],
    industry: [],
    investorType: [],
    previousFunding: [],
    Global_hq: [],
    bookmarked: "",
  });

  // Create a ref for the scrollable content
  const scrollableContentRef = useRef(null);
  const filtersScrollRef = useRef(null);
  const layoutContentRef = useRef(null);
  const paginationScrollRef = useRef(null);
  const paginationScrollRef1 = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setScreenWidth(window.innerWidth);
    };

    // Run check immediately
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          params: {
            page: currentPage,
            limit: pageSize,
            country: filters.country.length
              ? filters.country.join(",")
              : undefined,
            industry: filters.industry.length
              ? filters.industry.join(",")
              : undefined,
            investorType: filters.investorType.length
              ? filters.investorType.join(",")
              : undefined,
            previousFunding: filters.previousFunding.length
              ? filters.previousFunding.join(",")
              : undefined,
            Global_hq: filters.Global_hq.length
              ? filters.Global_hq.join(",")
              : undefined,
            bookmarked: bookmarked ? true : undefined,
            womenLed: womenLed ? true : undefined,
          },
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
        setError("Check Your internet Connection");
        console.error("Error fetching investors:", err);
      } finally {
        setLoading(false);
      }
    }

    // const fetchBookmarks = async () => {
    //   try {
    //     const res = await axios.get(`${API_KEY}/bookmark`, {
    //       headers: { token: localStorage.getItem("token") },
    //   })
    //     // console.log(res.data);
    //     setBookmarks(res.data) // Assuming the API returns an array of investor IDs
    //   } catch (error) {
    //     console.error("Error fetching bookmarks:", error)
    //   }
    // }

    getInvestors();
    // if(localStorage.getItem("token")){
    //   fetchBookmarks();
    // }
  }, [currentPage, pageSize, filters, bookmarked, womenLed]);

  const [womenInv, setWomenInv] = useState([]);
  useEffect(() => {
    // Check if the path includes "explore" to keep the bar active
    const fetchList = async () => {
      try {
        const res = await axios.get(`${API_KEY}/investors/women`, {
          params: { page: currentPage1, limit: pageSize1 },
        });
        setTotalRecords1(res.data.totalCount);
        setWomenInv(res.data.data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };
    fetchList();
  }, [womenLed, currentPage1, pageSize1]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

    // Scroll to top immediately
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }
  };

  const handlePageChange1 = (newPage) => {
    setCurrentPage1(newPage);

    // Scroll to top immediately
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }
  };

  const handleFilterChange = (newFilters) => {
    // Set search filtering flag to false when manually changing filters
    setIsSearchFiltering(false);
    setFilters((prev) => ({
      ...prev,
      ...newFilters, // Merge new filters
    }));
    setCurrentPage(1);

    // Scroll to top when filters change
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }
  };

  // const toggleBookmarked = () => {
  //   const newBookmarked = !bookmarked
  //   setBookmarked(newBookmarked)
  //   // Scroll to top when toggling bookmarked
  //   if (scrollableContentRef.current) {
  //     scrollableContentRef.current.scrollTop = 0
  //   } else {
  //     window.scrollTo(0, 0)
  //   }
  // }

  // Toggle women-led filter
  const toggleWomenLed = () => {
    const newWomenLed = !womenLed;
    setWomenLed(newWomenLed);
    // Scroll to top when toggling women-led
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }
  };

  // Handle search input
  const handleSearch = async (query) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post(`${API_KEY}/investors/search`, {
        query: query,
      });

      setInvestors(response.data.investors);
      setTotalRecords(response.data.totalCount);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error:", error.message);
      setError("Failed to process search query");
    } finally {
      setLoading(false);
    }
  };

  // Add function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalRecords / pageSize);
  const isUpgradeRequired = currentPage * 20 > totalPageSize;

  const totalPages1 = Math.ceil(totalRecords1 / pageSize1);

  // const toggleBookmark = async (investorId) => {
  //   try {
  //     const isCurrentlyBookmarked = bookmarks.includes(investorId)

  //     if (isCurrentlyBookmarked) {
  //       // Remove bookmarkss
  //       await axios.delete(`${API_KEY}/bookmark/remove/${investorId}`, {
  //         headers: { token: localStorage.getItem("token") },
  //       })
  //       setBookmarks((prev) => prev.filter((id) => id !== investorId))
  //     } else {
  //       // Add bookmark
  //       await axios.post(
  //         `${API_KEY}/bookmark/add`,
  //         { id: investorId },
  //         { headers: { token: localStorage.getItem("token") } },
  //       )
  //       setBookmarks((prev) => [...prev, investorId])
  //     }
  //   } catch (error) {
  //     console.error("Error updating bookmark:", error)
  //   }
  // }

  // Determine the number of columns based on screen width
  const getGridColumns = () => {
    if (screenWidth < 600) return 1; // Mobile
    if (screenWidth < 900) return 2; // Tablet
    return 3; // Desktop
  };

  // Generate all pagination numbers without ellipsis for horizontal scroll
  const generateAllPaginationNumbers = (totalPages) => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      contentRef={layoutContentRef}
    >
      <div className="content-wrapper2 relative h-full w-full">
        {/* Fixed header section */}
        <div
          className={`fixed-header ${
            isMobile ? "px-2 sm:px-4 pt-6 sm:pt-10" : "px-4"
          } z-10 w-full`}
          style={{ maxWidth: "95%", boxSizing: "border-box" }}
        >
          <div className={`text-left ${isMobile ? "ml-0" : ""}`}>
            <h1
              className={`${
                isMobile ? "text-2xl sm:text-3xl" : "text-4xl"
              } font-bold -mt-1 mb-1`}
            >
              <strong>Explore Investors</strong>
            </h1>
            <p
              className={`${
                isMobile ? "text-base sm:text-lg" : "text-xl"
              } text-[#CAC5C5] mb-2 sm:mb-4`}
            >
              Find and connect with potential investors
            </p>
          </div>

          {/* Custom Search Bar with Reduced Width */}
          <div
            className={`search-container ${isMobile ? "mb-3" : "mb-4"}`}
            style={{ maxWidth: isMobile ? "100%" : "100%" }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search (e.g., 'Investors in United States who invest in Deep tech ')"
                className="w-full py-2.5 px-4 pr-12 bg-[#161616] border border-[#75757569] rounded-full text-white focus:outline-none focus:border-[#9e9e9e] transition-colors text-sm sm:text-base placeholder:text-[#CAC5C5] placeholder:text-sm"
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                value={searchQuery}
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[#252525] hover:bg-[#353535] transition-colors rounded-full flex items-center justify-center"
                onClick={() => handleSearch(searchQuery)}
              >
                <Search size={isMobile ? 18 : 20} className="text-white" />
              </button>
            </div>
          </div>

          {/* Display Gemini Response
          {searchResponse && searchQuery && (
            <div className="mt-4 mb-6 p-4 bg-[#161616] border border-[#75757569] rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Search Analysis</h3>
              <div className="text-sm text-[#CAC5C5]">
                <p className="mb-2"><strong>Vertx ai result :</strong> {searchResponse.summary}</p>
                <div className="flex flex-wrap gap-4">
                  <div>
                    <strong>Industries:</strong>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {searchResponse.industries?.map((industry, idx) => (
                        <span key={idx} className="px-2 py-1 bg-[#252525] rounded-full text-xs">
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong>Industry Types:</strong>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {searchResponse.industry_types?.map((type, idx) => (
                        <span key={idx} className="px-2 py-1 bg-[#252525] rounded-full text-xs">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong>Countries:</strong>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {searchResponse.countries?.map((country, idx) => (
                        <span key={idx} className="px-2 py-1 bg-[#252525] rounded-full text-xs">
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )} */}

          {/* Filters with horizontal scroll */}
          <div
            ref={filtersScrollRef}
            className="filters-container overflow-x-auto hide-scrollbar"
            style={{ width: "100%" }}
          >
            {/* new test component  */}

            <div className="mb-3">
              {!womenLed && (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3">
                  <div className="text-center">
                    <MultiSelectDropdown
                      options={Country}
                      onChange={(values) =>
                        handleFilterChange({ country: values })
                      }
                      placeholder="Select Geography"
                      value={filters.country}
                      hideSelectedValues={isSearchFiltering}
                    />
                  </div>

                  <div className="text-center">
                    <MultiSelectDropdown
                      options={investorType}
                      onChange={(values) =>
                        handleFilterChange({ investorType: values })
                      }
                      placeholder="Investor Type"
                      value={filters.investorType}
                      hideSelectedValues={isSearchFiltering}
                    />
                  </div>

                  <div className="text-center">
                    <MultiSelectDropdown
                      options={industries}
                      onChange={(values) =>
                        handleFilterChange({ industry: values })
                      }
                      placeholder="Industries"
                      value={filters.industry}
                      hideSelectedValues={isSearchFiltering}
                    />
                  </div>

                  <div className="text-center">
                    <MultiSelectDropdown
                      options={previousFunding}
                      onChange={(values) =>
                        handleFilterChange({ previousFunding: values })
                      }
                      placeholder="Previous Funding"
                      value={filters.previousFunding}
                      hideSelectedValues={isSearchFiltering}
                    />
                  </div>

                  <div className="text-center">
                    <button
                      className={`w-full px-2 sm:px-4 py-2 sm:py-2 border border-[#75757569] rounded-md text-xs sm:text-sm ${
                        womenLed
                          ? "bg-[#75757569] text-white"
                          : "text-[#adadad] bg-[#161616]"
                      }`}
                      onClick={toggleWomenLed}
                    >
                      Women Led
                    </button>
                  </div>
                </div>
              )}

              {/* Optional extra button when womenLed is true */}
              {womenLed && (
                <div className="mt-2 w-full sm:w-1/2 md:w-[20%]">
                  <button
                    className={`w-full px-2 sm:px-4 py-2 sm:py-2 border border-[#75757569] rounded-md text-xs sm:text-sm ${
                      womenLed
                        ? "bg-[#75757569] text-white"
                        : "text-[#adadad] bg-[#161616]"
                    }`}
                    onClick={toggleWomenLed}
                  >
                    Women Led
                  </button>
                </div>
              )}
            </div>

            {/* testing compnet end here */}
          </div>
        </div>

        {/* Scrollable content area */}
        <div
          ref={scrollableContentRef}
          className="content-container scrollable-area px-2 sm:px-4 md:px-6"
          style={{ maxWidth: "100%" }}
        >
          {error && <div className="error-message">{error}</div>}

          <div
            className="profilecards"
            style={{
              gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
              gap: isMobile ? "10px" : "20px",
            }}
          >
            {loading ? (
              <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
                <img
                  src={gify || "/placeholder.svg"}
                  alt="Loading..."
                  className="w-16 h-16 sm:w-20 sm:h-20"
                />
              </div>
            ) : (
              <>
                {!womenLed &&
                  !bookmarked &&
                  (investors.length > 0 ? (
                    investors.map((item, index) => (
                      <div key={item._id || index} className="w-full">
                        <Card
                          key={item._id || index}
                          data={item}
                          // toggleBookmark={toggleBookmark}
                          // isBookmarked={bookmarks.includes(item._id)}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full w-full">
                      <div className="text-center py-8 text-gray-500">
                        No Results Found
                      </div>
                    </div>
                  ))}
                {!womenLed &&
                  bookmarked &&
                  (investors.filter((item) => bookmarks.includes(item._id))
                    .length > 0 ? (
                    investors
                      .filter((item) => bookmarks.includes(item._id))
                      .map((item) => (
                        <Card
                          key={item._id}
                          data={item}
                          toggleBookmark={toggleBookmark}
                          isBookmarked={true}
                        />
                      ))
                  ) : (
                    <div className="flex items-center justify-center h-full w-full">
                      <div className="text-center py-8 text-gray-500">
                        No Results Found
                      </div>
                    </div>
                  ))}
                {/*console.log(womenInv)*/}
                {womenLed &&
                  (womenInv.length > 0 ? (
                    womenInv.map((item, index) => (
                      <div key={item._id || index} className="w-full">
                        <Card
                          key={item._id || index}
                          data={item}
                          // toggleBookmark={toggleBookmark}
                          // isBookmarked={bookmarks.includes(item._id)}
                          isWomen={womenLed}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full w-full">
                      <div className="text-center py-8 text-gray-500">
                        No Results Found
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>

          {/* pagination  */}
          {!bookmarked && !womenLed && investors.length > 0 && (
            <div className="pagination mt-6 sm:mt-8 mb-8 sm:mb-12 flex justify-center items-center">
              <button
                className="pagination-button text-xs sm:text-sm min-w-[70px] sm:min-w-[80px] px-2 py-1.5 border border-[#75757569] rounded-md"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <span className="block sm:hidden">Prev</span>
                <span className="hidden sm:block">Previous</span>
              </button>
              <div
                ref={paginationScrollRef}
                className="inline-flex overflow-x-auto hide-scrollbar max-w-[180px] sm:max-w-[250px] md:max-w-[300px] bg-[#161616] border border-[#75757569] rounded-md p-1"
                style={{
                  WebkitOverflowScrolling: "touch",
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }}
              >
                {generateAllPaginationNumbers(totalPages).map((page) => (
                  <button
                    key={`page-${page}`}
                    className={`pagination-number-button min-w-[28px] h-[28px] mx-0.5 rounded-md text-xs flex items-center justify-center transition-colors ${
                      currentPage === page
                        ? "bg-[#75757569] text-white"
                        : "text-[#adadad] hover:bg-[#2a2a2a]"
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                className="pagination-button text-xs sm:text-sm min-w-[70px] sm:min-w-[80px] px-2 py-1.5 border border-[#75757569] rounded-md ml-2"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}

          {womenLed && womenInv.length > 0 && (
            <div className="pagination mt-6 sm:mt-8 mb-8 sm:mb-12 flex justify-center items-center">
              <button
                className="pagination-button text-xs sm:text-sm min-w-[70px] sm:min-w-[80px] px-2 py-1.5 border border-[#75757569] rounded-md"
                disabled={currentPage1 === 1}
                onClick={() => handlePageChange1(currentPage1 - 1)}
              >
                <span className="block sm:hidden">Prev</span>
                <span className="hidden sm:block">Previous</span>
              </button>
              <div
                ref={paginationScrollRef1}
                className="inline-flex overflow-x-auto hide-scrollbar max-w-[180px] sm:max-w-[250px] md:max-w-[300px] bg-[#161616] border border-[#75757569] rounded-md p-1"
                style={{
                  WebkitOverflowScrolling: "touch",
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }}
              >
                {generateAllPaginationNumbers(totalPages1).map((page) => (
                  <button
                    key={`page-${page}`}
                    className={`pagination-number-button min-w-[28px] h-[28px] mx-0.5 rounded-md text-xs flex items-center justify-center transition-colors ${
                      currentPage1 === page
                        ? "bg-[#75757569] text-white"
                        : "text-[#adadad] hover:bg-[#2a2a2a]"
                    }`}
                    onClick={() => handlePageChange1(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                className="pagination-button text-xs sm:text-sm min-w-[70px] sm:min-w-[80px] px-2 py-1.5 border border-[#75757569] rounded-md ml-2"
                disabled={currentPage1 === totalPages1}
                onClick={() => handlePageChange1(currentPage1 + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
        {isMobile && <MobileFooter currentPage={currentPageNav} />}
      </div>
    </Layout>
  );
}
