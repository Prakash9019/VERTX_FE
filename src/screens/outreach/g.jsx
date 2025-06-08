import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, MobileFooter } from "../layout/bars.jsx";
import Card from "../../components/investorCard/component";
import Select from "react-select";
import gify from "./gify.gif";
import API_KEY from "../../../key";

// Dummy data for dropdowns - Replace with actual data if available or fetched from API
const Country = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "India",
  "Australia",
  "Japan",
  "China",
  "Brazil",
  "Singapore",
  "Israel",
  "Sweden",
  "Netherlands",
  "Switzerland",
  "Spain",
  "Italy",
  "South Korea",
  "United Arab Emirates",
  "Mexico",
  "Indonesia",
  "South Africa",
  "New Zealand",
  "Ireland",
  "Belgium",
  "Norway",
  "Denmark",
  "Finland",
  "Austria",
  "Hong Kong",
];
const investorType = [
  "Angel Investor",
  "Venture Capital",
  "Private Equity",
  "Corporate Venture Capital",
  "Family Office",
  "Hedge Fund",
  "Accelerator",
  "Incubator",
  "Crowdfunding Platform",
  "Debt Investor",
  "Grant Provider",
  "Syndicate",
  "Micro-VC",
  "Seed Fund",
  "Growth Equity",
  "Impact Investor",
  "Strategic Investor",
  "Institutional Investor",
  "Pension Fund",
  "Endowment",
];
const industries = [
  "Deep Tech",
  "FinTech",
  "HealthTech",
  "EdTech",
  "SaaS",
  "E-commerce",
  "Biotechnology",
  "Artificial Intelligence",
  "Machine Learning",
  "Cybersecurity",
  "Renewable Energy",
  "CleanTech",
  "SpaceTech",
  "Robotics",
  "Quantum Computing",
  "Blockchain",
  "Gaming",
  "Media & Entertainment",
  "Food & Beverage",
  "Agriculture Technology (AgriTech)",
  "Real Estate Technology (PropTech)",
  "Logistics & Supply Chain",
  "Automotive",
  "Aerospace",
  "Consumer Goods",
  "Travel & Hospitality",
  "Fashion & Apparel",
  "LegalTech",
  "HRTech",
  "AdTech",
  "MarTech",
  "SportsTech",
  "FemTech",
  "PetTech",
  "ElderTech",
  "WaterTech",
  "Future of Work",
  "Creator Economy",
  "Web3",
  "Metaverse",
  "Sustainable Technology",
  "Circular Economy",
  "Impact Investing",
  "Social Enterprise",
];
const previousFunding = [
  "Pre-Seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C",
  "Series D",
  "Series E+",
  "Venture Debt",
  "Grant",
  "Angel",
  "Crowdfunding",
  "Convertible Note",
  "SAFE",
  "Bridge Round",
  "Growth Equity",
  "Secondary Market",
  "IPO",
  "Acquisition",
  "Undisclosed",
];

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

// MultiSelectDropdown component (reverted to previous behavior with hideSelectedValues)
const MultiSelectDropdown = ({
  options,
  onChange,
  placeholder,
  value,
  hideSelectedValues, // Re-added this prop
}) => {
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
      {selectedValues.length > 0 && !hideSelectedValues && ( // Re-added !hideSelectedValues condition
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

export default function Outreach2() {
  const navigate = useNavigate();
  const location = useLocation();
  const [allInvestors, setAllInvestors] = useState([]); // Stores all investors fetched from backend
  const [investors, setInvestors] = useState([]); // Stores currently displayed investors (filtered and paginated)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [womenLed, setWomenLed] = useState(false);
  const [bookmarks, setBookmarks] = useState([]); // Assuming bookmarks are managed client-side or fetched separately
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFiltering, setIsSearchFiltering] = useState(false); // New state to track if filters are from search

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(21); // Number of items per page
  const [currentPage1, setCurrentPage1] = useState(1);
  const [pageSize1, setPageSize1] = useState(21);
  const [totalRecords, setTotalRecords] = useState(0); // Total records after client-side filtering
  const [totalRecords1, setTotalRecords1] = useState(0);
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
  });

  // Create refs for scrollable content
  const scrollableContentRef = useRef(null);
  const filtersScrollRef = useRef(null);
  const layoutContentRef = useRef(null);
  const paginationScrollRef = useRef(null);
    const paginationScrollRef1 = useRef(null);


  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Effect to handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setScreenWidth(window.innerWidth);
    };

    handleResize(); // Run check immediately
    window.addEventListener("resize", handleResize); // Listen for resize events

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  // Set current page for navigation highlighting
  useEffect(() => {
    if (location.pathname.includes("explore")) {
      setCurrentPageNav("explore");
    } else {
      setCurrentPageNav(location.pathname.split("/").pop());
    }
  }, [location.pathname]);

  // --- Initial Data Fetch (runs once on mount) ---
  useEffect(() => {
    async function fetchAllInvestors() {
      try {
        setLoading(true);
        setError(null); // Clear previous errors

        // Fetch all investors without pagination or filters
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
        setAllInvestors(response.data.data); // Store all data
        console.log(response.data)
        setTotalRecords(response.data.totalCount);
         console.log(response.data.totalCount)
        // Scroll to top after data is loaded
        if (scrollableContentRef.current) {
          scrollableContentRef.current.scrollTop = 0;
        } else {
          window.scrollTo(0, 0);
        }
      } catch (err) {
        setError("Failed to load investors. Please check your internet connection.");
        console.error("Error fetching all investors:", err);
      } finally {
        setLoading(false);
      }
    }
    // Fetch bookmarks if user is logged in (assuming token in localStorage)
    const fetchBookmarks = async () => {
      if (localStorage.getItem("token")) {
        try {
          const res = await axios.get(`${API_KEY}/bookmark`, {
            headers: { token: localStorage.getItem("token") },
          });
          setBookmarks(res.data); // Assuming the API returns an array of investor IDs
        } catch (error) {
          console.error("Error fetching bookmarks:", error);
        }
      }
    };

    fetchAllInvestors();
    fetchBookmarks();
    console.log(fetchAllInvestors)
    console.log(fetchBookmarks)
 // Fetch bookmarks on initial load
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

  // --- Client-Side Filtering and Pagination Effect ---
  useEffect(() => {
    let filtered = [...allInvestors]; // Start with all investors

    // 1. Apply Search Query Filter
    if (searchQuery.trim() !== "") {
      const lowerCaseSearchTerm = searchQuery.toLowerCase();
      
      // Check for city names in the search query and map to country
      let countriesFromSearch = [];
      for (const city in cityToCountry) {
        if (lowerCaseSearchTerm.includes(city)) {
          countriesFromSearch.push(cityToCountry[city]);
        }
      }

      filtered = filtered.filter((investor) => {
        // Customize these fields based on your investor data structure
        const nameMatch = investor.name?.toLowerCase().includes(lowerCaseSearchTerm);
        const descriptionMatch = investor.description?.toLowerCase().includes(lowerCaseSearchTerm);
        const countryMatch = investor.country?.toLowerCase().includes(lowerCaseSearchTerm);
        
        // Safely check array fields for search
        const investorIndustries = Array.isArray(investor.industry) ? investor.industry : [investor.industry].filter(Boolean);
        const industryMatch = investorIndustries.some(ind => ind?.toLowerCase().includes(lowerCaseSearchTerm));

        const investorTypes = Array.isArray(investor.investorType) ? investor.investorType : [investor.investorType].filter(Boolean);
        const investorTypeMatch = investorTypes.some(type => type?.toLowerCase().includes(lowerCaseSearchTerm));

        const investorPreviousFunding = Array.isArray(investor.previousFunding) ? investor.previousFunding : [investor.previousFunding].filter(Boolean);
        const previousFundingMatch = investorPreviousFunding.some(fund => fund?.toLowerCase().includes(lowerCaseSearchTerm));

        const globalHqMatch = investor.Global_hq?.toLowerCase().includes(lowerCaseSearchTerm);
        
        // Also check if the investor's country matches any identified from city search
        const cityCountryMatch = countriesFromSearch.length > 0 ? countriesFromSearch.includes(investor.country) : false;

        return (
          nameMatch ||
          descriptionMatch ||
          countryMatch ||
          industryMatch ||
          investorTypeMatch ||
          previousFundingMatch ||
          globalHqMatch ||
          cityCountryMatch
        );
      });
    }

    // 2. Apply Multi-Select Filters
    if (filters.country.length > 0) {
      filtered = filtered.filter((investor) =>
        filters.country.includes(investor.country)
      );
    }
    if (filters.industry.length > 0) {
      filtered = filtered.filter((investor) => {
        const investorIndustries = Array.isArray(investor.industry) ? investor.industry : [investor.industry].filter(Boolean);
        return investorIndustries.some((ind) => filters.industry.includes(ind));
      });
    }
    if (filters.investorType.length > 0) {
      filtered = filtered.filter((investor) => {
        const investorTypes = Array.isArray(investor.investorType) ? investor.investorType : [investor.investorType].filter(Boolean);
        return investorTypes.some((type) => filters.investorType.includes(type));
      });
    }
    if (filters.previousFunding.length > 0) {
      filtered = filtered.filter((investor) => {
        const investorPreviousFunding = Array.isArray(investor.previousFunding) ? investor.previousFunding : [investor.previousFunding].filter(Boolean);
        return investorPreviousFunding.some((fund) => filters.previousFunding.includes(fund));
      });
    }
    if (filters.Global_hq.length > 0) {
      filtered = filtered.filter((investor) =>
        filters.Global_hq.includes(investor.Global_hq)
      );
    }

    // 3. Apply Bookmarked Filter
    if (bookmarked) {
      filtered = filtered.filter((investor) => bookmarks.includes(investor._id));
    }

    // 4. Apply Women-Led Filter
    if (womenLed) {
      filtered = filtered.filter((investor) => investor.womenLed === true);
    }

    setTotalRecords(filtered.length); // Update total records after all filters
    
    // 5. Apply Pagination
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedInvestors = filtered.slice(startIndex, endIndex);

    setInvestors(paginatedInvestors);

    // Scroll to top after filtering/pagination
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }
  }, [
    searchQuery,
    filters,
    bookmarked,
    womenLed,
    allInvestors, // This is crucial: re-run if allInvestors changes (e.g., initial fetch completes)
    currentPage, // For pagination
    pageSize, // For pagination
    bookmarks // If bookmarks can change dynamically
  ]);

  // --- Handlers for state updates (no API calls here) ---

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
    setIsSearchFiltering(false); // Set to false when manually changing filters
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setSearchQuery(""); // Clear search query when manual filters are changed
    setCurrentPage(1); // Reset to first page on filter change

    // Scroll to top when filters change
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }
  };
  

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearchFiltering(true); // Set to true when search is active
    setBookmarked(false); // Turn off bookmarked filter when searching
    setWomenLed(false); // Turn off womenLed filter when searching
    setFilters({ // Clear all other filters when a new search is performed
      country: [],
      industry: [],
      investorType: [],
      previousFunding: [],
      Global_hq: [],
    });
    setCurrentPage(1); // Reset to first page on search
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  const toggleBookmarked = () => {
    setBookmarked((prev) => !prev);
    setWomenLed(false); // Turn off womenLed filter if bookmarked is toggled
    setSearchQuery(""); // Clear search query
    setFilters({ // Clear all other filters when bookmarked is toggled
      country: [],
      industry: [],
      investorType: [],
      previousFunding: [],
      Global_hq: [],
    });
    setCurrentPage(1); // Reset to first page
  };

  const toggleWomenLed = () => {
    const newWomenLed = !womenLed;
    setWomenLed(newWomenLed);
    setBookmarked(false); // Turn off bookmarked filter if womenLed is toggled
    setSearchQuery(""); // Clear search query
    setFilters({ // Clear all other filters when womenLed is toggled
      country: [],
      industry: [],
      investorType: [],
      previousFunding: [],
      Global_hq: [],
    });
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    } // Reset to first page
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalRecords / pageSize);
const isUpgradeRequired = currentPage * 20 > totalPageSize;

  const totalPages1 = Math.ceil(totalRecords1 / pageSize1);
  // Determine the number of columns based on screen width
  const getGridColumns = () => {
    if (screenWidth < 600) return 1; // Mobile
    if (screenWidth < 900) return 2; // Tablet
    return 3; // Desktop
  };

  // Generate all pagination numbers for horizontal scroll
  const generateAllPaginationNumbers = (totalP) => {
    return Array.from({ length: totalP }, (_, i) => i + 1);
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

          {/* Custom Search Bar */}
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

          {/* Filters with horizontal scroll */}
          <div
            ref={filtersScrollRef}
            className="filters-container overflow-x-auto hide-scrollbar"
            style={{ width: "100%" }}
          >
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
          </div>
        </div>

        {/* Scrollable content area */}
        <div
          ref={scrollableContentRef}
          className="content-container scrollable-area px-2 sm:px-4 md:px-6"
          style={{ maxWidth: "100%" }}
        >
          {error && <div className="error-message text-red-500 text-center mt-4">{error}</div>}

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

          {/* Pagination */}
          {totalRecords > 0 && (
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
