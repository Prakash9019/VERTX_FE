"use client";

import { useNavigate } from "react-router";
import "./style.css";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import LandingAuth from "../../screens/landing/index";
import Signup from "../../screens/auth/signup";

export default function Card({ data }) {
  const navigate = useNavigate();

  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  const [show, setShow] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const openPopup = () => {
    if (!localStorage.getItem("token")) {
      setShowAuthPopup(true);
      document.body.style.overflow = "hidden"; // Prevent scrolling
      return;
    }
    setShow(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling of background content
  };

  const handleCloseAuthPopup = () => {
    setShowAuthPopup(false);
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  const handleShowSignupFromAuth = () => {
    setShowAuthPopup(false);
    setShowSignupPopup(true);
  };

  const handleCloseSignupPopup = () => {
    setShowSignupPopup(false);
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  const hide = () => {
    setShow(false);
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  return (
    <div className="pcard" onClick={openPopup}>
      <div className="img">
        <p className="midTit">{data?.name}</p>
      </div>
      <div className="row">
        <div className="pdetails">
          <p className="ctit">{data?.investorType}</p>
        </div>
        <div className="btnwrap">
          <button className="tag">View Profile</button>
        </div>
      </div>

      {/* Auth Screen - Responsive handling */}
      {showAuthPopup &&
        (isMobile ? (
          // Full screen on mobile
          <div className="fixed inset-0 z-50 bg-white">
            <LandingAuth
              onClose={handleCloseAuthPopup}
              isPopup={false}
              onCreateAccount={handleShowSignupFromAuth}
              isFullScreen={true}
            />
          </div>
        ) : (
          // Popup on desktop
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={handleCloseAuthPopup}
            ></div>
            <div className="z-50" onClick={(e) => e.stopPropagation()}>
              <LandingAuth
                onClose={handleCloseAuthPopup}
                isPopup={true}
                onCreateAccount={handleShowSignupFromAuth}
              />
            </div>
          </div>
        ))}

      {/* Signup Screen - Responsive handling */}
      {showSignupPopup &&
        (isMobile ? (
          // Full screen on mobile
          <div className="fixed inset-0 z-50 bg-white">
            <Signup
              onClose={handleCloseSignupPopup}
              isPopup={false}
              isFullScreen={true}
            />
          </div>
        ) : (
          // Popup on desktop
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={handleCloseSignupPopup}
            ></div>
            <div className="z-50" onClick={(e) => e.stopPropagation()}>
              <Signup onClose={handleCloseSignupPopup} isPopup={true} />
            </div>
          </div>
        ))}

      {/* Use createPortal to render the popup at the document body level */}
      {show &&
        createPortal(
          <div className="backdrop" onClick={hide}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
              <div className="topsec">
                <button className="btn" onClick={hide}>
                  <ion-icon name="arrow-back-outline"></ion-icon>
                </button>
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
                  {data?.chequeSize != "" && (
                    <div className="flex flex-col absolute right-6">
                      <p className="sidehead">Cheque Size</p>

                      {typeof data?.chequeSize === "string" ? (
                        <div
                          className="tag2"
                          style={{
                            marginTop: 10,
                            color: "grey",
                            borderColor: "grey",
                          }}
                        >
                          {data?.chequeSize}
                        </div>
                      ) : (
                        <>
                          {data?.chequeSize?.map((ind, index) => (
                            <div
                              className="tag2"
                              key={index}
                              style={{
                                marginTop: 10,
                                color: "grey",
                                borderColor: "grey",
                              }}
                            >
                              {ind}
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                  {data?.stageOfInvestment?.length > 0 && (
                    <>
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
                    </>
                  )}
                  {data?.investmentCountries?.length > 0 && (
                    <>
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
                    </>
                  )}
                </div>
              </div>
              <div className="moreData">
                <p className="sidehead">Overview</p>
                <p className="desc">{data?.investmentThesis}</p>
              </div>
              <div className="moreData">
                <p className="sidehead" style={{ marginTop: 15 }}>
                  Preferred Industry
                </p>

                {typeof data?.industry === "string" ? (
                  <div
                    className="tag2"
                    style={{
                      marginTop: 10,
                      color: "grey",
                      borderColor: "grey",
                    }}
                  >
                    {data?.industry}
                  </div>
                ) : (
                  <div className="flex flex-row gap-2 flex-wrap py-2">
                    {data?.industry?.map((ind, index) => (
                      <div
                        key={index}
                        className="tag2"
                        style={{
                          marginTop:1,
                          color: "grey",
                          borderColor: "grey",
                        }}
                      >
                        {ind}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="moreData">
                <p className="sidehead" style={{ marginTop: 15 }}>
                  Global HQ
                </p>
                <div
                  className="tag2"
                  style={{ marginTop: 10, color: "grey", borderColor: "grey" }}
                >
                  {data?.global_Hq ? data.global_Hq : data.globalHQ}
                </div>
              </div>
              <div className="moreData" style={{ marginTop: 15 }}>
                <p className="sidehead" style={{ marginTop: 15 }}>
                  Contact
                </p>

                <div className="flex flex-row gap-2">
                  <div
                    className="tag2"
                    style={{
                      marginTop: 10,
                      color: "grey",
                      borderColor: "grey",
                    }}
                  >
                    <a
                      href={data?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Website
                    </a>
                  </div>
                  {data.linkedinPersonal && (
                    <div
                      className="tag2"
                      style={{
                        marginTop: 10,
                        color: "grey",
                        borderColor: "grey",
                      }}
                    >
                      <a
                        href={data?.linkedinPersonal}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Linkedin Personal
                      </a>
                    </div>
                  )}
                  {data.linkedinCompany && (
                    <div
                      className="tag2"
                      style={{
                        marginTop: 10,
                        color: "grey",
                        borderColor: "grey",
                      }}
                    >
                      <a
                        href={data?.linkedinCompany}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Linkedin Company
                      </a>
                    </div>
                  )}
                  {data.twitter && (
                    <div
                      className="tag2"
                      style={{
                        marginTop: 10,
                        color: "grey",
                        borderColor: "grey",
                      }}
                    >
                      <a
                        href={data?.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Twitter
                      </a>
                    </div>
                  )}
                  {data.email && (
                    <div
                      className="tag2"
                      style={{
                        marginTop: 10,
                        color: "grey",
                        borderColor: "grey",
                      }}
                    >
                      <a
                        href={`mailto:${data?.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Email
                      </a>
                    </div>
                  )}
                  {data.crunchbase && (
                    <div
                      className="tag2"
                      style={{
                        marginTop: 10,
                        color: "grey",
                        borderColor: "grey",
                      }}
                    >
                      <a
                        href={data?.crunchbase}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Crunchbase
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
