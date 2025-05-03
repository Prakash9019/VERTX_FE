"use client";

import React, { useState, useEffect } from "react";
import { Layout, MobileFooter } from "../layout/bars";
import { useNavigate } from "react-router";
import axios from "axios";
import API_KEY from "../../../key";
import { Info } from "lucide-react";

export default function Welcome_founder() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    headline: "",
    portfolioLink: "",
    linkedinLink: "",
    github: "",
    twitter: "",
  });

  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState("explore");
  const [loading, setLoading] = useState(false);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState({}); // For toggling error messages
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Run check immediately
    checkIsMobile();

    // Listen for resize events
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Apply global styles for Manrope font and letter spacing
  useEffect(() => {
    // Add global style for Manrope font and letter spacing
    const style = document.createElement("style");
    style.innerHTML = `
      * {
        font-family: 'Manrope', sans-serif;
        letter-spacing: -0.04em;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Set current page for navigation highlighting
  useEffect(() => {
    // Check if the path includes "explore" to keep the bar active
    if (location.pathname.includes("explore")) {
      setCurrentPage("explore");
    } else {
      setCurrentPage(location.pathname.split("/").pop()); // Fallback for other pages
    }
  }, [location.pathname]);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

  //   // Remove error when the user types
  //   if (errors[e.target.name]) {
  //     setErrors({ ...errors, [e.target.name]: "" });
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    // Create a copy of errors
    const updatedErrors = { ...errors };

    // Remove error for the individual field
    if (updatedErrors[name]) {
      delete updatedErrors[name];
    }

    // Remove 'links' error if any one link is filled
    if (["portfolioLink", "linkedinLink", "github", "twitter"].includes(name)) {
      const atLeastOneLink =
        updatedFormData.portfolioLink.trim() ||
        updatedFormData.linkedinLink.trim() ||
        updatedFormData.github.trim() ||
        updatedFormData.twitter.trim();

      if (atLeastOneLink) {
        delete updatedErrors.links;
      }
    }

    setErrors(updatedErrors);
  };

  const validateForm = () => {
    let newErrors = {};

    // Required fields
    ["firstName", "lastName", "city", "headline"].forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required.";
      }
    });

    // At least one link must be provided
    if (
      !formData.portfolioLink.trim() &&
      !formData.linkedinLink.trim() &&
      !formData.github.trim() &&
      !formData.twitter.trim()
    ) {
      newErrors.links = "At least one link must be provided.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  useEffect(() => {
    setLoading(true);
    if (!localStorage.getItem("token")) {
      navigate("/authentication");
      return;
    }
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_KEY}/profile/fetch`, {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        });
        if (response.data.length > 0) {
          setFormData(response.data[0]);
          navigate("/listall");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle Form Submission
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await fetch(`${API_KEY}/profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
          setMessage("Successfully submitted!");
          navigate("/explore/putaface");
        } else {
          setMessage(result.error || "Something went wrong!");
        }
      } catch (error) {
        setMessage("Server error! Try again later.");
      }
    }
  };

  if (loading) return <div></div>;

  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="flex flex-col min-h-screen">
        <div
          className={`${
            isMobile
              ? "px-4 mt-10 flex-grow"
              : "max-w-3xl w-full px-4 mx-auto mt-7"
          } overflow-y-auto`}
        >
          <div className={`text-left ${isMobile ? "ml-0" : "ml-10"}`}>
            <h1
              className={`${
                isMobile ? "text-3xl" : "text-4xl"
              } font-bold -mt-1 mb-1`}
            >
              Welcome founder.
            </h1>
            <p className="text-xl text-[#CAC5C5] mb-4">Introduce yourself</p>
          </div>

          <form className="bg-black rounded-[2rem] p-8 shadow-xl border border-[#1D1C1C] w-full max-w-2xl mx-auto mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div>
                <label
                  className={`block text-lg font-semibold ${
                    errors.firstName ? "text-red-500" : "text-[#CAC5C5]"
                  }`}
                >
                  First Name{" "}
                  {errors.firstName && (
                    <Info
                      size={16}
                      className="inline cursor-pointer text-red-500 ml-1"
                      onClick={() =>
                        setShowError({
                          ...showError,
                          firstName: !showError.firstName,
                        })
                      }
                    />
                  )}
                </label>
                <div
                  className={`border-b-[1px] ${
                    errors.firstName ? "border-red-500" : "border-[#1D1C1C]"
                  }`}
                >
                  <input
                    name="firstName"
                    type="text"
                    onChange={handleChange}
                    value={formData.firstName}
                    placeholder="E.g Mark"
                    className="w-full py-1 bg-transparent text-white placeholder-[#424242] focus:outline-none"
                  />
                </div>
                {showError.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  className={`block text-lg font-semibold ${
                    errors.lastName ? "text-red-500" : "text-[#CAC5C5]"
                  }`}
                >
                  Last Name{" "}
                  {errors.lastName && (
                    <Info
                      size={16}
                      className="inline cursor-pointer text-red-500 ml-1"
                      onClick={() =>
                        setShowError({
                          ...showError,
                          lastName: !showError.lastName,
                        })
                      }
                    />
                  )}
                </label>
                <div
                  className={`border-b-[1px] ${
                    errors.lastName ? "border-red-500" : "border-[#1D1C1C]"
                  }`}
                >
                  <input
                    name="lastName"
                    type="text"
                    onChange={handleChange}
                    value={formData.lastName}
                    placeholder="E.g Zuckerberg"
                    className="w-full py-1 bg-transparent text-white placeholder-[#424242] focus:outline-none"
                  />
                </div>
                {showError.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* City */}
            <div className="mb-4">
              <label
                className={`block text-lg font-semibold ${
                  errors.city ? "text-red-500" : "text-[#CAC5C5]"
                }`}
              >
                City{" "}
                {errors.city && (
                  <Info
                    size={16}
                    className="inline cursor-pointer text-red-500 ml-1"
                    onClick={() =>
                      setShowError({ ...showError, city: !showError.city })
                    }
                  />
                )}
              </label>
              <div
                className={`border-b-[1px] ${
                  errors.city ? "border-red-500" : "border-[#1D1C1C]"
                }`}
              >
                <input
                  name="city"
                  type="text"
                  onChange={handleChange}
                  value={formData.city}
                  placeholder="Type and select your residing city."
                  className="w-full py-1 bg-transparent text-white placeholder-[#424242] focus:outline-none"
                />
              </div>
              {showError.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-lg font-semibold text-[#CAC5C5]">
                Short headline
              </label>
              <div className="border-b-[1px] border-[#1D1C1C]">
                <input
                  onChange={handleChange}
                  type="text"
                  name="headline"
                  value={formData.headline}
                  placeholder="What everyone will see first.."
                  className="w-full py-1 bg-transparent text-white placeholder-[#424242] focus:outline-none"
                />
              </div>
            </div>

            <div>
              {/* <label className="block text-lg font-semibold mb-2 text-[#CAC5C5]">
                Links
              </label> */}
              <label
                className={`block text-lg font-semibold mb-2 ${
                  errors.links ? "text-red-500" : "text-[#CAC5C5]"
                }`}
              >
                Links{" "}
                {errors.links && (
                  <Info
                    size={16}
                    className="inline cursor-pointer text-red-500 ml-1"
                    onClick={() =>
                      setShowError({
                        ...showError,
                        links: !showError.links,
                      })
                    }
                  />
                )}
              </label>

              {showError.links && errors.links && (
                <p className="text-red-500 text-sm">{errors.links}</p>
              )}

              
              <div className="space-y-2">
                <div className="flex items-center border-b-[1px] mb-2 border-[#1D1C1C] pb-1">
                  <span className="mr-2 ">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.33334 12.25C2.01251 12.25 1.73785 12.1358 1.50938 11.9073C1.28091 11.6788 1.16667 11.4042 1.16667 11.0833V4.66666C1.16667 4.34582 1.28091 4.07117 1.50938 3.8427C1.73785 3.61423 2.01251 3.49999 2.33334 3.49999H4.66667V2.33332C4.66667 2.01249 4.78091 1.73784 5.00938 1.50936C5.23785 1.28089 5.51251 1.16666 5.83334 1.16666H8.16667C8.4875 1.16666 8.76216 1.28089 8.99063 1.50936C9.2191 1.73784 9.33334 2.01249 9.33334 2.33332V3.49999H11.6667C11.9875 3.49999 12.2622 3.61423 12.4906 3.8427C12.7191 4.07117 12.8333 4.34582 12.8333 4.66666V11.0833C12.8333 11.4042 12.7191 11.6788 12.4906 11.9073C12.2622 12.1358 11.9875 12.25 11.6667 12.25H2.33334ZM2.33334 11.0833H11.6667V4.66666H2.33334V11.0833ZM5.83334 3.49999H8.16667V2.33332H5.83334V3.49999Z"
                        fill="#757575"
                      />
                    </svg>
                  </span>
                  <input
                    onChange={handleChange}
                    name="portfolioLink"
                    value={formData.portfolioLink}
                    type="text"
                    placeholder="https://portfolio.com/..."
                    className="w-full bg-transparent text-white placeholder-[#424242] focus:outline-none"
                  />
                </div>

                <div className="flex items-center border-b-[1px] mb-2 border-[#1D1C1C] pb-1">
                  <span className="mr-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_2206_55)">
                        <path
                          d="M2.79329 3.86053H0.384268C0.277352 3.86053 0.19072 3.94721 0.19072 4.05408V11.7932C0.19072 11.9001 0.277352 11.9868 0.384268 11.9868H2.79329C2.9002 11.9868 2.98684 11.9001 2.98684 11.7932V4.05408C2.98684 3.94721 2.9002 3.86053 2.79329 3.86053Z"
                          fill="#757575"
                        />
                        <path
                          d="M1.58965 0.0132141C0.71311 0.0132141 0 0.72555 0 1.60112C0 2.47708 0.71311 3.18969 1.58965 3.18969C2.4655 3.18969 3.17803 2.47705 3.17803 1.60112C3.17806 0.72555 2.4655 0.0132141 1.58965 0.0132141Z"
                          fill="#757575"
                        />
                        <path
                          d="M8.92081 3.66818C7.95326 3.66818 7.23802 4.08412 6.8042 4.55672V4.05408C6.8042 3.9472 6.71757 3.86053 6.61065 3.86053H4.30359C4.19668 3.86053 4.11005 3.9472 4.11005 4.05408V11.7932C4.11005 11.9001 4.19668 11.9868 4.30359 11.9868H6.70735C6.81427 11.9868 6.9009 11.9001 6.9009 11.7932V7.96414C6.9009 6.67383 7.25138 6.17115 8.15083 6.17115C9.13042 6.17115 9.20827 6.97701 9.20827 8.03053V11.7933C9.20827 11.9002 9.2949 11.9868 9.40181 11.9868H11.8065C11.9134 11.9868 12 11.9002 12 11.7933V7.54821C12 5.62956 11.6342 3.66818 8.92081 3.66818Z"
                          fill="#757575"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2206_55">
                          <rect width="12" height="12" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <input
                    onChange={handleChange}
                    value={formData.linkedinLink}
                    name="linkedinLink"
                    type="text"
                    placeholder="https://linkedin.com/..."
                    className="w-full bg-transparent text-white placeholder-[#424242] focus:outline-none"
                  />
                </div>

                <div className="flex items-center border-b-[1px] mb-2 border-[#1D1C1C] pb-1">
                  <span className="mr-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_2206_60)">
                        <path
                          d="M5.9768 0.164062C2.67633 0.164062 0 2.83992 0 6.14086C0 8.78161 1.71253 11.022 4.08731 11.8123C4.386 11.8676 4.49569 11.6826 4.49569 11.5247C4.49569 11.3822 4.49011 10.9114 4.48758 10.412C2.82478 10.7735 2.47392 9.70678 2.47392 9.70678C2.20205 9.01594 1.81031 8.83228 1.81031 8.83228C1.26806 8.46131 1.85119 8.46891 1.85119 8.46891C2.45138 8.51109 2.76741 9.08484 2.76741 9.08484C3.30047 9.99858 4.16559 9.73439 4.50666 9.58172C4.56028 9.19538 4.7152 8.93175 4.88611 8.7825C3.55861 8.63133 2.16305 8.11884 2.16305 5.82872C2.16305 5.17622 2.39653 4.64302 2.77889 4.22447C2.71683 4.07391 2.51227 3.46603 2.83678 2.64277C2.83678 2.64277 3.33867 2.48212 4.48083 3.25542C4.95755 3.12295 5.46886 3.05658 5.9768 3.05433C6.48474 3.05658 6.99642 3.12295 7.47408 3.25542C8.61488 2.48212 9.11606 2.64277 9.11606 2.64277C9.44138 3.46603 9.23672 4.07391 9.17466 4.22447C9.55786 4.64302 9.78975 5.17617 9.78975 5.82872C9.78975 8.12428 8.39156 8.62978 7.06069 8.77772C7.27505 8.9632 7.46606 9.32695 7.46606 9.88453C7.46606 10.6842 7.45913 11.3279 7.45913 11.5247C7.45913 11.6838 7.5667 11.8702 7.8697 11.8115C10.2432 11.0203 11.9535 8.78072 11.9535 6.14086C11.9535 2.83992 9.27759 0.164062 5.9768 0.164062Z"
                          fill="#757575"
                        />
                        <path
                          d="M2.23851 8.67816C2.22539 8.70784 2.1786 8.71674 2.13609 8.6964C2.09273 8.6769 2.06835 8.6364 2.08242 8.60658C2.09531 8.57602 2.14209 8.56749 2.18535 8.58802C2.22881 8.60748 2.25356 8.64835 2.23851 8.67816ZM2.53251 8.94048C2.50401 8.96691 2.44828 8.95463 2.41045 8.91287C2.37135 8.87119 2.36404 8.81551 2.39296 8.78865C2.42235 8.76226 2.4764 8.77458 2.51559 8.8163C2.55468 8.85844 2.56228 8.9138 2.53246 8.94052M2.73421 9.2761C2.69756 9.30155 2.63765 9.27769 2.60067 9.22454C2.56406 9.17143 2.56406 9.10768 2.60146 9.08213C2.63859 9.05659 2.69756 9.07955 2.73506 9.13229C2.77162 9.18634 2.77162 9.25009 2.73417 9.27615M3.07528 9.66484C3.04251 9.70093 2.97276 9.69127 2.92167 9.64196C2.86945 9.59377 2.85487 9.52538 2.88773 9.48924C2.92087 9.45305 2.99104 9.46323 3.04251 9.51212C3.0944 9.56021 3.1102 9.62912 3.07528 9.66484ZM3.51609 9.79609C3.5017 9.84287 3.43448 9.86415 3.36679 9.84427C3.2992 9.82379 3.25495 9.76894 3.26859 9.72165C3.28265 9.67454 3.35015 9.65237 3.41835 9.67365C3.48585 9.69404 3.53015 9.74846 3.51609 9.79609ZM4.01784 9.85173C4.01953 9.90104 3.9621 9.94191 3.89104 9.9428C3.81956 9.94435 3.76176 9.90446 3.76101 9.85599C3.76101 9.80621 3.81712 9.76571 3.88856 9.76454C3.95962 9.76313 4.01784 9.80274 4.01784 9.85173ZM4.51068 9.83284C4.51921 9.88093 4.46981 9.93034 4.39926 9.94346C4.32989 9.95612 4.26567 9.92644 4.25681 9.87877C4.24818 9.82946 4.29853 9.7801 4.36776 9.7673C4.43845 9.75502 4.50168 9.78394 4.51068 9.83284Z"
                          fill="#757575"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2206_60">
                          <rect width="12" height="12" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <input
                    onChange={handleChange}
                    value={formData.github}
                    name="github"
                    type="text"
                    placeholder="https://github.com/..."
                    className="w-full bg-transparent text-white placeholder-[#424242] focus:outline-none"
                  />
                </div>

                <div className="flex items-center border-b-[1px] mb-2 border-[#1D1C1C] pb-1">
                  <span className="mr-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.08334 5.2L11 1H10L6.63334 4.6L4.00001 1H0.666672L4.76667 6.6L0.666672 11H1.66667L5.21667 7.2L8.00001 11H11.3333L7.08334 5.2ZM2.15001 1.66667H3.48334L9.83334 10.3333H8.50001L2.15001 1.66667Z"
                        fill="#757575"
                      />
                    </svg>
                  </span>
                  <input
                    onChange={handleChange}
                    value={formData.twitter}
                    name="twitter"
                    type="text"
                    placeholder="https://x.com/..."
                    className="w-full bg-transparent text-white placeholder-[#424242] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </form>

          <div
            className={`flex ${
              isMobile ? "justify-center" : "pr-[3rem] justify-end"
            } mt-8 mb-16`}
          >
            <button
              className={`bg-white text-black font-bold py-3 ${
                isMobile ? "px-12 w-full" : "px-16 w-[200px]"
              } rounded-[10px] text-lg`}
              onClick={() => handleSubmit()}
            >
              Continue
            </button>
          </div>

          {message && (
            <div className="mt-4 text-center text-green-500">{message}</div>
          )}
        </div>
      </div>

      {/* Using the MobileFooter component instead of inline code */}
      {isMobile && <MobileFooter currentPage={currentPage} />}
    </Layout>
  );
}
