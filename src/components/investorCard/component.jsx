import Button from "../button/component";
import "./style.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function InvestorCard({ id, cb, data }) {
  //request data

  function capitalizeWords(str) {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  return (
    
    <div className="backdrop">
      <div className="popup">
        <div className="topsec">
          <button
            className="btn"
            onClick={() => {
              window.location.href = "/outreach";
            }}
          >
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
              <div className="tag"> {data?.investorType}</div>
            </div>
            <div className="flex flex-col absolute right-6">
            <p className="sidehead">Cheque Size</p>
            <div className="tag2"
                    style={{ marginTop: 10,color: "grey", borderColor: "grey" }}
                  > {data?.chequeSize}</div>
            </div>
            <p className="sidehead">Stage interested in</p>
            <div className="tags" style={{ marginTop: 10 }}>
              {/* intrested tags */}
              {data?.stageOfInvestment?.map((item, index) => {
  return (
    <div
      key={index}
      className="tag"
      style={{ color: "grey", borderColor: "grey" }}
    >
      {item}
    </div>
  );
             })}
            </div>
            <p className="sidehead">Countries interested in</p>
            <div className="tags" style={{ marginTop: 15 }}>
              {/* intrested tags */}
              {data?.investmentCountries
                .map((index,item) => (
                  <div
                    className="tag"
                    style={{ color: "grey", borderColor: "grey" }}
                  >
                    {index}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="moreData">
          <p className="sidehead">Overview</p>
          <p className="desc">{data?.investmentThesis}</p>
          {/* .slice(0, 300) + "..." */}
        </div>
        <div className="moreData">
          <p className="sidehead"  style={{marginTop: 15}}>Preferred Industry</p>
          <div className="tag2"
                    style={{ marginTop: 10,color: "grey", borderColor: "grey" }}
                  >
                    {capitalizeWords(data?.industry)}
                  </div>
        </div>
        <div className="moreData">
          <p className="sidehead" style={{marginTop: 15}}>Global HQ</p>                
          <div
                    className="tag2"
                    style={{ marginTop: 10,color: "grey", borderColor: "grey" }}
                  >
                    {data?.country}
                  </div>
                  </div>
      
        {/* <div
          className="alright"
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            marginTop: 20,
          }}
        >
          <div className="btnWrap" style={{ width: "15%" }}>
            <Button context={"Contact"} theme={"light font-extrabold"} callback={() => {}} />
          </div>
        </div> */}

<div className="moreData " style={{marginTop: 15}}>
          <p className="sidehead" style={{marginTop: 15}}>Contact</p>
          <p className="desc1">{data?.website}</p>
          {/* .slice(0, 300) + "..." */}
        </div>

      </div>
    </div>
  );
}