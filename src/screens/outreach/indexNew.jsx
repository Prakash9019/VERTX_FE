// import "./style.css";
"use client"
import { useNavigate } from "react-router"
import { useEffect, useState, useRef } from "react"
import { industries, Country, investorType } from "./filters.js"
import API_KEY from "../../../key"
import axios from "axios"
import { Layout, MobileFooter } from "../layout/barsNew.jsx"
import Card from "../../components/investorCard/component"
import gify from "./gify.gif"
import "./style.css"
import Select from "react-select"      
import logo from "./womensDay.png"

const MultiSelectDropdown = ({ options, onChange, placeholder, value }) => {
  // Create a ref for manually handling input width
  const selectedValues = value || [];

  return (
    <div className="filter-dropdown-container">
      <Select
        isMulti
        options={options.map((option) => ({ value: option, label: option }))}
        onChange={(selected) => onChange(selected ? selected.map((s) => s.value) : [])}
        placeholder={placeholder}
        value={selectedValues.map(val => ({ value: val, label: val }))}
        className="w-full"
        classNamePrefix="react-select"
        menuPortalTarget={document.body} // Ensures dropdown renders outside parent
        menuPosition="fixed" // Prevents clipping issues
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "#161616",
            border: "1px solid #75757569",
            color: "#adadad",
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
            color: "#fff",
          }),
          valueContainer: (base) => ({
            ...base,
            padding: "0 8px",
            fontSize: window.innerWidth < 768 ? "12px" : "14px",
          }),
          placeholder: (base) => ({
            ...base,
            fontSize: window.innerWidth < 768 ? "12px" : "14px",
            display: 'block', // Always display the placeholder
            position: 'relative',
            transform: 'none',
            top: 'auto',
            left: 'auto',
            opacity: '1 !important',
            transition: 'none',
          }),
          singleValue: (base) => ({
            ...base,
            fontSize: window.innerWidth < 768 ? "12px" : "14px",
          }),
          multiValue: (base) => ({
            ...base,
            display: 'none', // Hide default multi-value display
            fontSize: window.innerWidth < 768 ? "11px" : "13px",
          }),
          multiValueLabel: (base) => ({
            ...base,
            display: 'none', // Hide the multi-value labels
          }),
          multiValueRemove: (base) => ({
            ...base,
            display: 'none', // Hide the multi-value remove buttons
          }),
          indicatorsContainer: (base) => ({
            ...base,
            // Keep the indicators container visible
          }),
        }}
        isClearable={false} // Disable the clear button 
        controlShouldRenderValue={false} // Don't render selected values in the control
      />
      
      {/* Display selected values below the dropdown */}
      {selectedValues.length > 0 && (
        <div className="selected-filters">
          {selectedValues.map((value) => (
            <div key={value} className="filter-chip">
              <span>{value}</span>
              <span 
                className="remove-chip"
                onClick={() => {
                  onChange(selectedValues.filter(v => v !== value));
                }}
              >
                ×
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Outreach2() {
  const navigate = useNavigate()
  const [investors, setInvestors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [bookmarked, setBookmarked] = useState(false)
  const [womenLed, setWomenLed] = useState(false) // New state for women-led filter
  const [bookmarks, setBookmarks] = useState([])

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [currentPage1, setCurrentPage1] = useState(1)
  const [pageSize1, setPageSize1] = useState(20)
  const [totalRecords, setTotalRecords] = useState(0)
  const [totalPageSize, setTotalPageSize] = useState(20)

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Current page for navigation highlighting
  const [currentPageNav, setCurrentPageNav] = useState("outreach")
  // Filters state
  const [filters, setFilters] = useState({
    country: [],
    industry: [],
    investorType: [],
    bookmarked: "",
  })

  // Create a ref for the scrollable content
  const scrollableContentRef = useRef(null)
  const filtersScrollRef = useRef(null)
  const layoutContentRef = useRef(null)

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setScreenWidth(window.innerWidth)
    }

    // Run check immediately
    handleResize()

    // Listen for resize events
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Set current page for navigation highlighting
  useEffect(() => {
    // Check if the path includes "explore" to keep the bar active
    if (location.pathname.includes("explore")) {
      setCurrentPageNav("explore")
    } else {
      setCurrentPageNav(location.pathname.split("/").pop()) // Fallback for other pages
    }
  }, [location.pathname])

  useEffect(() => {
    async function getInvestors() {
      try {
        setLoading(true)
        const response = await axios.get(`${API_KEY}/investors`, {
          headers: { token: localStorage.getItem("token") },
          params: {
            page: currentPage,
            limit: pageSize,
            country: filters.country.length > 0 ? filters.country : undefined,
            industry: filters.industry.length > 0 ? filters.industry : undefined,
            investorType: filters.investorType.length > 0 ? filters.investorType : undefined,
            bookmarked: bookmarked ? true : undefined,
            womenLed: womenLed ? true : undefined, // Add women-led filter parameter
          },
        })
        setInvestors(response.data.data)
        setTotalRecords(response.data.totalCount)

        // Scroll to top after data is loaded
        if (scrollableContentRef.current) {
          scrollableContentRef.current.scrollTop = 0
        } else {
          window.scrollTo(0, 0)
        }
      } catch (err) {
        setError("Failed to fetch investors")
      } finally {
        setLoading(false)
      }
    }

    const fetchBookmarks = async () => {
      try {
        const res = await axios.get(`${API_KEY}/bookmark`, {
          headers: { token: localStorage.getItem("token") },
      })
        // console.log(res.data);
        setBookmarks(res.data) // Assuming the API returns an array of investor IDs
      } catch (error) {
        console.error("Error fetching bookmarks:", error)
      }
    }

    getInvestors()
    fetchBookmarks()
  }, [currentPage, pageSize, filters, bookmarked, womenLed]) 

  const [womenInv,setWomenInv] =useState([]);
  useEffect(() => {
    // Check if the path includes "explore" to keep the bar active
    const fetchList = async () => {
      try {
        const res = await axios.get(`${API_KEY}/investors/women`, {
          headers: { token: localStorage.getItem("token") },
          params: { page: currentPage1,  limit: pageSize1   }
        })
        console.log("cskhdbdshbch")
        console.log(res.data.data);
        setWomenInv(res.data.data) // Assuming the API returns an array of investor IDs
      } catch (error) {
        console.error("Error fetching bookmarks:", error)
      }
    }
    fetchList();
  }, [currentPage1 ,pageSize1 ])


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)

    // Scroll to top immediately
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = 0
    } else {
      window.scrollTo(0, 0)
    }
  }

  const handlePageChange1 = (newPage) => {
    setCurrentPage1(newPage)

    // Scroll to top immediately
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = 0
    } else {
      window.scrollTo(0, 0)
    }
  }


  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }))
    setCurrentPage(1)

    // Also scroll to top when filters change
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = 0
    } else {
      window.scrollTo(0, 0)
    }
  }

  const toggleBookmarked = () => {
    const newBookmarked = !bookmarked
    setBookmarked(newBookmarked)
    // Scroll to top when toggling bookmarked
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = 0
    } else {
      window.scrollTo(0, 0)
    }
  }

  // Toggle women-led filter
  const toggleWomenLed = () => {
    const newWomenLed = !womenLed
    setWomenLed(newWomenLed)
    // Scroll to top when toggling women-led
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = 0
    } else {
      window.scrollTo(0, 0)
    }
  }

  // Calculate total pages
  const totalPages = Math.ceil(totalRecords / pageSize)
  const isUpgradeRequired = currentPage * 20 > totalPageSize

  const toggleBookmark = async (investorId) => {
    try {
      const isCurrentlyBookmarked = bookmarks.includes(investorId)

      if (isCurrentlyBookmarked) {
        // Remove bookmarkss
        await axios.delete(`${API_KEY}/bookmark/remove/${investorId}`, {
          headers: { token: localStorage.getItem("token") },
        })
        setBookmarks((prev) => prev.filter((id) => id !== investorId))
      } else {
        // Add bookmark
        await axios.post(
          `${API_KEY}/bookmark/add`,
          { id: investorId },
          { headers: { token: localStorage.getItem("token") } },
        )
        setBookmarks((prev) => [...prev, investorId])
      }
    } catch (error) {
      console.error("Error updating bookmark:", error)
    }
  }

  // Determine the number of columns based on screen width
  const getGridColumns = () => {
    if (screenWidth < 600) return 1; // Mobile
    if (screenWidth < 900) return 2; // Tablet
    return 3; // Desktop
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
          className={`fixed-header ${isMobile ? "px-2 sm:px-4 pt-6 sm:pt-10" : "px-4"} z-10 w-full`}
          style={{ maxWidth: "100%", boxSizing: "border-box" }}
        >
          <div className={`text-left ${isMobile ? "ml-0" : ""}`}>
            <h1 className={`${isMobile ? "text-2xl sm:text-3xl" : "text-4xl"} font-bold -mt-1 mb-1`}>
              <strong>Explore Investors</strong>
            </h1>
            <p className={`${isMobile ? "text-base sm:text-lg" : "text-xl"} text-[#CAC5C5] mb-2 sm:mb-4`}>
              Find and connect with potential investors
            </p>
          </div>

          {/* Filters with horizontal scroll */}
          <div
            ref={filtersScrollRef}
            className="filters-container overflow-x-auto hide-scrollbar"
            style={{ width: "100%" }}
          >
            <div className="filter mb-3 flex flex-nowrap gap-2 sm:gap-3">
              {/* Multi-Select Country */}
              <div className="min-w-[150px] sm:min-w-[180px] md:min-w-[200px] flex-1">
                <MultiSelectDropdown
                  options={Country}
                  onChange={(values) => handleFilterChange("country", values)}
                  placeholder="Select Countries"
                  value={filters.country}
                />
              </div>

              {/* Multi-Select Investor Type */}
              <div className="min-w-[150px] sm:min-w-[180px] md:min-w-[200px] flex-1">
                <MultiSelectDropdown
                  options={investorType}
                  onChange={(values) => handleFilterChange("investorType", values)}
                  placeholder="Investor Type"
                  value={filters.investorType}
                />
              </div>

              {/* Multi-Select Industry */}
              <div className="min-w-[150px] sm:min-w-[180px] md:min-w-[200px] flex-1">
                <MultiSelectDropdown
                  options={industries}
                  onChange={(values) => handleFilterChange("industry", values)}
                  placeholder="Industries"
                  value={filters.industry}
                />
              </div>

              {/* Bookmarked Button */}
              <div className="min-w-[100px] sm:min-w-[120px]">
                <button
                  className={`w-full px-2 sm:px-4 py-2 sm:py-2 border border-[#75757569] rounded-md text-xs sm:text-sm ${
                    bookmarked ? "bg-[#75757569] text-white" : "text-[#adadad] bg-[#161616]"
                  }`}
                  onClick={toggleBookmarked}
                >
                  Bookmarked
                </button>
              </div>

              {/* Women Led Button */}
              <div className="min-w-[100px] sm:min-w-[120px]">
                <button
                  className={`w-full px-2 sm:px-4 py-2 sm:py-2 border border-[#75757569] rounded-md text-xs sm:text-sm ${
                    womenLed ? "bg-[#75757569] text-white" : "text-[#adadad] bg-[#161616]"
                  }`}
                  onClick={toggleWomenLed}
                >
                  Women Led
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable content area */}
        <div
          ref={scrollableContentRef}
          className="content-container scrollable-area px-2 sm:px-4 md:px-6"
          style={{ maxWidth: "100%" }}
        >
          {error && <div className="error-message">{error}</div>}
          
{/* Women Led info box */}

{ womenLed &&  <div className="bg-[#1e1e1e] border border-[#75757569] rounded-[30px]">
    <img src={logo || "/placeholder.svg"} alt="image" className="w-full h-auto rounded-[10px]" />
  </div>}




          {/* Investor Cards */}
          <div 
            className="profilecards" 
            style={{ 
              gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
              gap: isMobile ? "10px" : "20px" 
            }}
          >
            {loading ? (
              <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
                <img src={gify || "/placeholder.svg"} alt="Loading..." className="w-16 h-16 sm:w-20 sm:h-20" />
              </div>
            ) : (
              <>
                {!womenLed && !bookmarked &&
                  investors.map((item, index) => (
                    <div key={item._id || index} className="w-full">
                      <Card
                        key={item._id || index}
                        data={item}
                        toggleBookmark={toggleBookmark}
                        isBookmarked={bookmarks.includes(item._id)}
                      />
                    </div>
                  ))}
                 {!womenLed && bookmarked &&
                  investors
                    .filter((item) => bookmarks.includes(item._id))
                    .map((item) => (
                      <Card key={item._id} data={item} toggleBookmark={toggleBookmark} isBookmarked={true} />
                    ))}
                   {console.log(womenInv)}
                    {womenLed && womenInv.map((item, index) => (
                    <div key={item._id || index} className="w-full">
                      <Card
                        key={item._id || index}
                        data={item}
                        toggleBookmark={toggleBookmark}
                        isBookmarked={bookmarks.includes(item._id)}
                        isWomen={womenLed}
                      />
                    </div>
                  ))}
              </>
            )}
          </div>

          {/* Pagination Controls */}
        { !womenLed && <div className="pagination mt-6 sm:mt-8 mb-8 sm:mb-12 text-center">
            <button
              className="pagination-button text-xs sm:text-sm"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <span className="page-info text-xs sm:text-sm">Page {currentPage} </span>
            <button
              className="pagination-button text-xs sm:text-sm"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>}

          { womenLed && <div className="pagination mt-6 sm:mt-8 mb-8 sm:mb-12 text-center">
            <button
              className="pagination-button text-xs sm:text-sm"
              disabled={currentPage1 === 1}
              onClick={() => handlePageChange1(currentPage1 - 1)}
            >
              Previous
            </button>
            <span className="page-info text-xs sm:text-sm">Page {currentPage1} </span>
            <button
              className="pagination-button text-xs sm:text-sm"
              disabled={currentPage1 === totalPages}
              onClick={() => handlePageChange1(currentPage1 + 1)}
            >
              Next
            </button>
          </div>}

        </div>
        {isMobile && <MobileFooter currentPage={currentPageNav} />}
      </div>
    </Layout>
  )
}