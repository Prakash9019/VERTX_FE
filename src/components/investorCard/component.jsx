import Button from "../button/component";
import "./style.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function InvestorCard({ id, cb, data }) {
  //request data

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
            Back
          </button>
          <div className="wrap">
            <button className="btn">
              <ion-icon name="bookmark-outline"></ion-icon>
              Bookmark
            </button>
            <div className="btns">
              <button className="btn rt">Linkdin</button>
              <button className="btn lt">Website</button>
            </div>
          </div>
        </div>
        <div className="sec">
          <div className="img-cont">
            <div className="img" style={{ height: "100%" }}>
              <p className="ctit" style={{ fontSize: "20px" }}>
                {data?.company}
              </p>
            </div>
          </div>
          <div className="invDetails">
            <div className="tags">
              <div className="tag bk">VERIFIED</div>
              <div className="tag">Solo angel</div>
            </div>
            <p className="sidehead">Stage interested in</p>
            <div className="tags" style={{ marginTop: 10 }}>
              {/* intrested tags */}
              <div
                className="tag"
                style={{ color: "grey", borderColor: "grey" }}
              >
                Prototype/MVP
              </div>
              <div
                className="tag"
                style={{ color: "grey", borderColor: "grey" }}
              >
                Seed
              </div>
            </div>
            <p className="sidehead">Countries interested in</p>
            <div className="tags" style={{ marginTop: 10 }}>
              {/* intrested tags */}
              {Array(1)
                .fill("0")
                .map(() => (
                  <div
                    className="tag"
                    style={{ color: "grey", borderColor: "grey" }}
                  >
                    India
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="moreData">
          <p className="sidehead">Overview</p>
          <p className="desc">{data?.about?.slice(0, 300) + "..."}</p>
        </div>
        <div
          className="alright"
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            marginTop: 20,
          }}
        >
          <div className="btnWrap" style={{ width: "15%" }}>
            <Button context={"Contact"} theme={"light"} callback={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}