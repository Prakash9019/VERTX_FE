import "./style.css";
import { useNavigate } from "react-router";
import Navigation from "../../components/navigation/component";
import { useEffect, useState } from "react";
import { industries, Country, investorType } from "./filters.js";
import { Lock } from 'lucide-react';
import API_KEY from "../../../key";
import axios from "axios";
import { Header, Sidebar } from "../layout/bars.jsx";
import image from "./image.png";
import Card from "../../components/investorCard/component";
import gify from "./gify.gif"

export default function Outreach() {
  const navigate = useNavigate();
  const [openNav, setNav] = useState(false);
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
  const [maxLimit, setmaxLimit] = useState(0);
  // Filters state
  const [filters, setFilters] = useState({
    country: "",
    industry: "",
    investorType: "",
    bookmarked: false,
  });

  // Fix vertical stretching issue by setting a fixed height container
  useEffect(() => {
    // Get viewport height and set the container to that height
    const vh = window.innerHeight;
    document.documentElement.style.height = `${vh}px`;
    document.body.style.height = `${vh}px`;
    document.body.style.overflow = "hidden";
    document.body.style.backgroundColor = "black";
    
    // Handle window resize to maintain fixed height
    const handleResize = () => {
      const newVh = window.innerHeight;
      document.documentElement.style.height = `${newVh}px`;
      document.body.style.height = `${newVh}px`;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function to reset styles when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
      document.documentElement.style.height = "";
      document.body.style.height = "";
      document.body.style.overflow = "";
      document.body.style.backgroundColor = "";
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
        console.log(newTotalPageSize);
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
        console.log(response.data);
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

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Calculate total pages
  const totalPages = Math.ceil(totalRecords / pageSize);
  const isUpgradeRequired = currentPage * 20 > totalPageSize;
  
  return (
    <div className="fixed-height-container bg-black text-white flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 relative h-full">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-24"} overflow-hidden fixed-content`}>   
          <div className="scrollable-content">
            <div className="container-ot p-6 pt-12">
              <p className="head mt-14">Explore and connect.</p>

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
                        <div className="bg-white p-4 rounded text-center text-black text-lg">
                          🔒 Upgrade to unlock
                        </div>
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
              
              {/* Pagination Controls (not fixed at bottom) */}
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
        </main>
      </div>
    </div>
  );
}