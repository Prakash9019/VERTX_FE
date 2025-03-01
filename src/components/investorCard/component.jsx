import Button from "../button/component";
import "./style.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Card({ data }) {
  function capitalizeWords(str) {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  
  const [show, setShow] = useState(false);
  
  const openPopup = () => {
    setShow(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling of background content
  };

  const hide = () => {
    setShow(false);
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  return (
    <div className="pcard" onClick={openPopup}>
      {show && (
        <div className="backdrop" onClick={hide}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="topsec">
              <button className="btn" onClick={hide}>
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
              <div className="wrap">
                <button className="btn">
                  <ion-icon name="bookmark-outline"></ion-icon>
                  Bookmark
                </button>
              </div>
            </div>
            <div className="sec">
              <div className="img-cont">
                <div className="img" style={{ height: "100%" }}>
                  <p className="ctit" style={{ fontSize: "20px" }}>
                    {data?.name}
                  </p>
                </div>
              </div>
              <div className="invDetails">
                <div className="tags">
                  <div className="tag bk">VERIFIED</div>
                  <div className="tag">{data?.investorType}</div>
                </div>
                <div className="flex flex-col absolute right-6">
                  <p className="sidehead">Cheque Size</p>
                  <div className="tag2"
                    style={{ marginTop: 10, color: "grey", borderColor: "grey" }}
                  >{data?.chequeSize}</div>
                </div>
                <p className="sidehead">Stage interested in</p>
                <div className="tags" style={{ marginTop: 10 }}>
                  {/* interested tags */}
                  {data?.stageOfInvestment?.map((item, index) => (
                    <div
                      key={index}
                      className="tag"
                      style={{ color: "grey", borderColor: "grey" }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <p className="sidehead">Countries interested in</p>
                <div className="tags" style={{ marginTop: 15 }}>
                  {/* interested tags */}
                  {data?.investmentCountries.map((country, index) => (
                    <div
                      key={index}
                      className="tag"
                      style={{ color: "grey", borderColor: "grey" }}
                    >
                      {country}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="moreData">
              <p className="sidehead">Overview</p>
              <p className="desc">{data?.investmentThesis}</p>
            </div>
            <div className="moreData">
              <p className="sidehead" style={{ marginTop: 15 }}>Preferred Industry</p>
              <div className="tag2"
                style={{ marginTop: 10, color: "grey", borderColor: "grey" }}
              >
                {capitalizeWords(data?.industry)}
              </div>
            </div>
            <div className="moreData">
              <p className="sidehead" style={{ marginTop: 15 }}>Global HQ</p>                
              <div className="tag2"
                style={{ marginTop: 10, color: "grey", borderColor: "grey" }}
              >
                {data?.country}
              </div>
            </div>
            <div className="moreData" style={{ marginTop: 15 }}>
              <p className="sidehead" style={{ marginTop: 15 }}>Contact</p>
              <div className="tag2" style={{ marginTop: 10, color: "grey", borderColor: "grey" }}>
                <a href={data?.website} target="_blank" rel="noopener noreferrer">
                  {data?.website}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="img">
        <p className="midTit">{data?.name}</p>
      </div>
      <div className="row">
        <div className="pdetails">
          <p className="ctit">{data?.investorType}</p>
        </div>
        <div className="btnwrap">
          <button className="tag">Mark</button>
          <button className="tag">View Profile</button>
        </div>
      </div>
    </div>
  );
}