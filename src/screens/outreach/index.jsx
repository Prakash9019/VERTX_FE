// import "./style.css";
// import { useCallback } from "react";
// import { useNavigate  } from "react-router";
// import Navigation from "../../components/navigation/component";
// import { useEffect, useState } from "react";
// import { industries, Country, investorType } from "./filters.js";
// import { Lock } from 'lucide-react';
// import API_KEY from "../../../key";
// import axios from "axios";
// import { Header, Sidebar } from "../layout/bars.jsx";
// import image from "./image.png";
// import Card from "../../components/investorCard/component";

// export default function Outreach() {
//   const navigate = useNavigate();
//   const [openNav, setNav] = useState(false);
//   const [investors, setInvestors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(20); // Adjust this as needed
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [totalPageSize, setTotalPageSize] = useState(20);
//   const [model, setModel] = useState("");

//   // Filters state
//   const [filters, setFilters] = useState({
//     country: "",
//     industry: "",
//     investorType: "",
//   });

//   useEffect(() => {
//     async function fetchUserPlan() {
//       try {
//         const userRes = await axios.get(`${API_KEY}/payment/me`, { headers: { token: localStorage.getItem('token') } });
//         const plan = userRes.data.plan;
//         setModel(plan);

//         let newTotalPageSize = 20;
//         if (plan === 'EXPLORE' || plan === 'OUTREACH') newTotalPageSize = 40;
//         else if (plan === 'ENTERPRISE') newTotalPageSize = 100;

//         setTotalPageSize(newTotalPageSize);
//       } catch (err) {
//         console.error('Error fetching user plan:', err);
//       }
//     }
//     fetchUserPlan();
//   }, []);

//   // useEffect(() => {
//   //   async function getInvestors() {
//   //     try {
//   //       setLoading(true);
//   //       const response = await axios.get(`${API_KEY}/investors`, {
//   //         headers: { token: localStorage.getItem('token') },
//   //         params: { limit: totalPageSize }
//   //       });
//   //        console.log(response.data.data.length);
//   //       setInvestors(response.data.data);
//   //       setTotalRecords(response.data.data.length);
//   //     } catch (err) {
//   //       setError('Failed to fetch investors');
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   }
//   //   getInvestors();
//   // }, [totalPageSize]);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//     window.scrollTo(0, 0);
//   };

//   const handleFilterChange = (filterName, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [filterName]: value
//     }));
//     setCurrentPage(1);
//   };


//   const getInvestors = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//      const response = await axios.get(`${API_KEY}/investors`, {
//         headers: { token: window.localStorage.getItem("token") },
//         params: {
//           page: currentPage,
//           limit: pageSize,
//           ...filters
//         }
//       });

//       const { data, totalCount } = response.data;
//       setInvestors(data);
//       setTotalPages(Math.ceil(totalCount / pageSize));
//     } catch (err) {
//       setError("Failed to fetch investors");
//       console.error("Error fetching investors:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, pageSize, filters]);

//   useEffect(() => {
//     getInvestors();
//   }, [getInvestors]);


//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // Calculate total pages and slice investors for pagination
//   const totalPages = Math.ceil(totalRecords / pageSize);
//   const paginatedInvestors = investors.slice((currentPage - 1) * pageSize, currentPage * pageSize);

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col">
//       <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <div className="flex flex-1 relative">
//         <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//         <main className={`flex-1 p-3 pt-20 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-24"}`}>   
//           <div className="container-ot">
//             <p className="head">Explore and connect.</p>

//             {/* Filters */}
//             <div className="filter">
//               {model === "EXPLORE" ? (
//                 <>
//                   <div className="blur-4 flex flex-row justify-between gap-3 w-max h-max px-4 py-2 text-[#adadad] font-manrope bg-[#161616] border border-[#75757569] rounded-md">
//                     Country <i className="material-icons text-white">lock</i>
//                   </div>
//                   <div className="blur-4 flex flex-row justify-between gap-3 w-max h-max px-4 py-2 text-[#adadad] font-manrope bg-[#161616] border border-[#75757569] rounded-md">
//                     Investor Type <i className="material-icons text-white">lock</i>
//                   </div>
//                   <div className="blur-4 flex flex-row justify-between gap-3 w-max h-max px-4 py-2 text-[#adadad] font-manrope bg-[#161616] border border-[#75757569] rounded-md">
//                     Industries <i className="material-icons text-white">lock</i>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <select className="sel" onChange={(e) => handleFilterChange("country", e.target.value)}>
//                     <option value="" disabled selected>Country</option>
//                     {Country.map((country, i) => (
//                       <option key={i} value={country}>{country}</option>
//                     ))}
//                   </select> 

//                   <select className="sel" onChange={(e) => handleFilterChange("investorType", e.target.value)}>
//                     <option value="" disabled selected>Investor Type</option>
//                     {investorType.map((investorType, i) => (
//                       <option key={i} value={investorType}>{investorType}</option>
//                     ))}
//                   </select>

//                   <select className="sel" onChange={(e) => handleFilterChange("industry", e.target.value)}>
//                     <option value="" disabled selected>Industries</option>
//                     {industries.map((industry, i) => (
//                       <option key={i} value={industry}>{industry}</option>
//                     ))}
//                   </select>
//                 </>
//               )}
//             </div>

//             {error && <div className="error-message">{error}</div>}

//             {/* Investor Cards */}
//             <div className="profilecards">
//               {loading ? (
//                 <div className="loading">Loading investors...</div>
//               ) : (
//                 paginatedInvestors
//                   .filter(item => item.company !== "null-val")
//                   .map((item, index) => (
//                     <Card key={item._id || index} data={item} />
//                   ))
//               )}
//             </div>

//             {/* Pagination Controls */}
//             <div className="pagination">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1 || loading}
//                 className="pagination-button"
//               >
//                 Previous
//               </button>
              
//               <span className="page-info">
//                 Page {currentPage} of {totalPages}
//               </span>
              
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages || loading}
//                 className="pagination-button"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


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

export default function Outreach() {
  const navigate = useNavigate();
  const [openNav, setNav] = useState(false);
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPageSize, setTotalPageSize] = useState(20);
  const [model, setModel] = useState("");
   const [maxLimit,setmaxLimit] = useState(0);
  // Filters state
  const [filters, setFilters] = useState({
    country: "",
    industry: "",
    investorType: "",
  });

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
          params: { page: currentPage, limit: pageSize }
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
  }, [currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setCurrentPage(1);
  };

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Calculate total pages
  const totalPages = Math.ceil(totalRecords / pageSize);
  console.log(totalRecords,pageSize );
  const isUpgradeRequired = currentPage * 20 > totalPageSize;
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 relative">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className={`flex-1 p-3 pt-20 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-24"}`}>   
          <div className="container-ot">
            <p className="head">Explore and connect.</p>

            {/* Filters */}
            <div className="filter">
              {model === "EXPLORE" ? (
                <>
                  <div className="blur-4 flex flex-row justify-between gap-3 w-max h-max px-4 py-2 text-[#adadad] font-manrope bg-[#161616] border border-[#75757569] rounded-md">
                    Country <Lock />
                  </div>
                  <div className="blur-4 flex flex-row justify-between gap-3 w-max h-max px-4 py-2 text-[#adadad] font-manrope bg-[#161616] border border-[#75757569] rounded-md">
                    Investor Type <Lock />
                  </div>
                  <div className="blur-4 flex flex-row justify-between gap-3 w-max h-max px-4 py-2 text-[#adadad] font-manrope bg-[#161616] border border-[#75757569] rounded-md">
                    Industries <Lock />
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
                </>
              )}
            </div>

            {error && <div className="error-message">{error}</div>}

            {/* Investor Cards */}
            <div className="profilecards">
              {loading ? (
                <div className="loading">Loading investors...</div>
              ) : (
                // investors.map((item, index) => (
                //   <div key={item._id || index} className={currentPage*20 > totalPageSize ? "bg-red" : ""}>
                //       {console.log( currentPage*20, totalPageSize)}
                //       {currentPage*20 > totalPageSize && <div className="lock-overlay">🔒 Upgrade to unlock</div>  }
                //     <Card data={item} />
                  
                //   </div>
                // ))
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
            
            {/* Pagination Controls */}
            <div className="pagination">
              <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
