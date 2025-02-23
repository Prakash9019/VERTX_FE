import "./style.css";
import logo from "../../assets/logo.png";
import Button from "../../components/button/component";
import { useNavigate } from "react-router";
import Navigation from "../../components/navigation/component";
import InvestorCard from "../../components/investorCard/component";
import { useEffect, useState, useCallback } from "react";
import {
  companyStages,
  industries,
  sectors,
  currentTraction,
} from "./filters.js";
import API_KEY from "../../../key";
import axios from "axios";

function Card({ data }) {
  const [show, setShow] = useState(false);
  const hide = () => setShow(false);

  return (
    <div className="pcard" onClick={() => setShow(true)}>
      {show ? <InvestorCard id={"1234"} cb={hide} data={data} /> : null}
      <div className="img">
        <p className="midTit">{data?.company}</p>
      </div>
      <div className="row">
        <div className="pdetails">
          <p className="ctit">{data?.firstName + " " + data?.lastName}</p>
          <p className="subtit">Solo angel</p>
        </div>
        <div className="btnwrap">
          <button className="tag">Mark</button>
          <button className="tag">View Profile</button>
        </div>
      </div>
    </div>
  );
}

export default function Outreach() {
  const navigate = useNavigate();
  const [openNav, setNav] = useState(false);
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Filters state
  const [filters, setFilters] = useState({
    traction: "",
    stage: "",
    sector: "",
    industry: "",
  });

  const getInvestors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
     const response = await axios.get(`${API_KEY}/investors`, {
        headers: { token: window.localStorage.getItem("token") },
        params: {
          page: currentPage,
          limit: pageSize,
          ...filters
        }
      });

      const { data, totalCount } = response.data;
      setInvestors(data);
      setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (err) {
      setError("Failed to fetch investors");
      console.error("Error fetching investors:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, filters]);

  useEffect(() => {
    getInvestors();
  }, [getInvestors]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div className="container-ot">
      <div className="topbar">
        <div className="wrap">
          <img src={logo} alt="logo" className="logo" />
          <p className="title">Vertx AI</p>
        </div>
        <ion-icon
          className="menu"
          name="menu-outline"
          color="white"
          style={{ fontSize: "25px" }}
          onClick={() => setNav(true)}
        />
        <div className="btwrap mb">
          {!window.localStorage.getItem("token") && (
            <Button
              context="Login"
              theme="dark"
              callback={() => navigate("/authentication")}
            />
          )}
        </div>
      </div>
      
      <div className="bottom">
        <div className="navwrap mb" style={{ height: "calc(100vh - 70px)" }}>
          <Navigation cb={() => setNav(false)} />
        </div>
        <div
          className={openNav ? "navwrap mbv open" : "navwrap mbv"}
          style={{ height: "calc(100vh - 70px)" }}
        >
          <Navigation cb={() => setNav(false)} />
        </div>
        
        <div className="msection">
          <p className="head">Reach out to top Investors.</p>
          <p className="subhead msec">
            Get connected with investors of your choice.
          </p>
          
          <div className="filter">
            <select 
              className="sel"
              onChange={(e) => handleFilterChange("traction", e.target.value)}
            >
              <option value="" disabled selected>Traction</option>
              {currentTraction.map((stage, i) => (
                <option key={i} value={stage}>{stage}</option>
              ))}
            </select>
            
            <select 
              className="sel"
              onChange={(e) => handleFilterChange("stage", e.target.value)}
            >
              <option value="" disabled selected>Stage</option>
              {companyStages.map((stage, i) => (
                <option key={i} value={stage}>{stage}</option>
              ))}
            </select>
            
            <select 
              className="sel"
              onChange={(e) => handleFilterChange("sector", e.target.value)}
            >
              <option value="" disabled selected>Sector</option>
              {sectors.map((sector, i) => (
                <option key={i} value={sector}>{sector}</option>
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
            
            <select 
              className="sel"
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value="" disabled selected>Records per page</option>
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="profilecards">
            {loading ? (
              <div className="loading">Loading investors...</div>
            ) : (
              investors
                .filter(item => item.company !== "null-val")
                .map((item, index) => (
                  <Card key={item._id || index} data={item} />
                ))
            )}
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="pagination-button"
            >
              Previous
            </button>
            
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}