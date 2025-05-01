"use client";

import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import API_KEY from "../../../key.js";
import FloatingLabelInput from "../../components/LabelInput.jsx";
import Signup from "../auth/signup.jsx";
import {
  Button,
  BackButton,
  AuthContainer,
} from "../auth/common-components.jsx";

export default function LandingAuth({
  onClose,
  isPopup = false,
  onCreateAccount,
  initialView = "signup",
}) {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(initialView === "login");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showMobileSignup, setShowMobileSignup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [resp, setResp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [show, setShow] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const fetchGoogleUrl = async () => {
    const response = await axios
      .get(API_KEY + "/auth/oauth")
      .catch((e) => e.response);
    if (response?.status == 200) {
      window.location.href = response.data.msg;
    }
  };

  const signinHandler = async () => {
    const response = await axios
      .post(API_KEY + "/auth/signin", {
        email,
        password,
      })
      .catch((e) => {
        setErrorMessage(e.response?.data?.msg || "An error occurred");
        setSuccessMessage("");
        return e.response;
      });
    if (response) {
      setResp(response?.data?.msg);
      if (response?.status == 200) {
        // Set success message
        setSuccessMessage("Login Successfully!");
        setErrorMessage("");

        localStorage.setItem("token", response?.data?.token);
        const username = response?.data?.username;
        const trimmedUsername =
          username.length > 13 ? username.substring(0, 13) + "..." : username;
        localStorage.setItem("user", trimmedUsername);

        const token = localStorage.getItem("token");
        if (!token) return; // Prevent request if token is missing

        const response2 = await axios.get(`${API_KEY}/profile/fetch`, {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        });
        if (response2.data.length > 0) {
          localStorage.setItem("dip", response2.data[0].avatar);
        }

        // Add a small delay to show the success message before redirecting
        setTimeout(() => {
          if (isPopup && onClose) {
            onClose();
          } else {
            navigate("/callback");
          }
        }, 1500);
      } else {
        setErrorMessage(response?.data?.msg);
        setSuccessMessage("");
      }
      setShow(true);
    }
  };

  // Function to handle login button click
  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowPasswordForm(false);
  };

  // Function to handle next button click
  const handleNextClick = async () => {
    try {
      const response = await fetch(API_KEY + "/auth/checkUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();
      if (!response.ok) {
        const errorMessage = data.message || "An unknown error occurred";
        throw new Error(errorMessage);
      }

      if (data.status) {
        setShowPasswordForm(true);
        setErrorMessage("");
      } else {
        setErrorMessage("User does not exist");
        setShowPasswordForm(false);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Function to go back
  const handleBack = () => {
    // Check if this login was initiated from the bars page
    if (localStorage.getItem("fromBarsLogin") === "true") {
      // Clear the flag
      localStorage.removeItem("fromBarsLogin");
      // Close the popup and navigate to starting page
      if (onClose) {
        onClose();
      }

      return;
    }

    // Original behavior for other cases
    if (showPasswordForm) {
      setShowPasswordForm(false);
    } else if (showLoginForm) {
      setShowLoginForm(false);
    } else if (showMobileSignup) {
      setShowMobileSignup(false);
    } else if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleLinkedInLogin = () => {
    window.location.href = `${API_KEY}/auth/linkedin`;
  };

  const handleCreateAccount = () => {
    if (isMobile) {
      setShowMobileSignup(true);
    } else {
      // If onCreateAccount prop is provided, use it to handle the transition
      if (onCreateAccount) {
        onCreateAccount();
      } else {
        // Otherwise, show the signup popup and close the current popup if needed
        setShowSignupPopup(true);
        if (isPopup && onClose) {
          onClose();
        }
      }
    }
  };

  const handleCloseSignupPopup = () => {
    setShowSignupPopup(false);
    setShowMobileSignup(false);
  };

  // If showing mobile signup, render the Signup component directly
  if (showMobileSignup) {
    return <Signup onClose={handleCloseSignupPopup} isPopup={false} />;
  }

  const content = (
    <>
      <div className="absolute top-4 left-4 z-20">
        <BackButton onClick={handleBack} />
      </div>

      <div className="w-full flex flex-col justify-center items-center mt-6 sm:mt-12">
        <div className="text-center w-full max-w-md mx-auto px-4 sm:px-0">
          <p className="font-['Manrope'] text-white text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
            {showPasswordForm
              ? "Enter password"
              : showLoginForm
              ? "Sign in to Vertx"
              : "Join today."}
          </p>

          <div className="w-full max-w-xs mx-auto flex flex-col items-center">
            {/* Sign up Form */}
            {!showLoginForm && !showPasswordForm && (
              <>
                <Button
                  context={"Sign in with Google"}
                  theme="dark"
                  callback={() => fetchGoogleUrl()}
                />

                <Button
                  context={"Sign in with LinkedIn"}
                  theme="dark"
                  callback={() => handleLinkedInLogin()}
                />

                <div className="w-full h-auto grid grid-cols-[1fr_max-content_1fr] justify-center items-center gap-2 text-[#9d9d9d] p-2 text-xs font-['Manrope']">
                  <div className="w-full h-px bg-[#9d9d9d]"></div>
                  <p className="text-xs">or</p>
                  <div className="w-full h-px bg-[#9d9d9d]"></div>
                </div>

                <Button
                  context={"Create account"}
                  theme="light"
                  callback={handleCreateAccount}
                />

                <p className="mt-5 text-white font-['Manrope'] text-xs text-center font-extralight">
                  By signing up, you agree to the{" "}
                  <span className="underline">Terms of Service</span> and{" "}
                  <span className="underline">Privacy Policy</span>, including{" "}
                  <span className="underline">Cookie Use</span>.
                </p>

                <p className="font-['Manrope'] text-white text-sm font-bold mt-8 mb-2 text-center">
                  Already have an account?
                </p>

                <Button
                  context={"Log in"}
                  theme="dark"
                  callback={handleLoginClick}
                />
              </>
            )}

            {/* Login Email Form */}
            {showLoginForm && !showPasswordForm && (
              <>
                <Button
                  context={"Sign in with Google"}
                  theme="dark"
                  callback={() => fetchGoogleUrl()}
                />

                <Button
                  context={"Sign in with LinkedIn"}
                  theme="dark"
                  callback={() => handleLinkedInLogin()}
                />
                <div className="w-full h-auto grid grid-cols-[1fr_max-content_1fr] justify-center items-center gap-2 text-[#9d9d9d] p-2 text-xs font-['Manrope']">
                  <div className="w-full h-px bg-[#9d9d9d]"></div>
                  <p className="text-xs">or</p>
                  <div className="w-full h-px bg-[#9d9d9d]"></div>
                </div>

                {/* Email input and Next button */}
                <div className="w-full">
                  <FloatingLabelInput
                    id={email}
                    label="Enter email address"
                    type="text"
                    validateidentifier={true}
                    value={email}
                    onChange={setemail}
                    className="w-full py-3 px-4 rounded-md bg-transparent border border-gray-700 text-white mb-3"
                  />
                  {errorMessage && (
                    <p className="text-red-500 mt-4">{errorMessage}</p>
                  )}

                  <Button
                    context={"Next"}
                    theme="light"
                    callback={handleNextClick}
                  />

                  <Button
                    context={"Forgot password?"}
                    theme="dark"
                    callback={() => {
                      // Handle forgot password
                    }}
                  />
                </div>
              </>
            )}

            {/* Password Form */}
            {showPasswordForm && (
              <div className="w-full">
                <input
                  type="text"
                  value={email}
                  disabled
                  className="w-full py-3 px-4 rounded-md bg-gray-800 border border-gray-700 text-white mb-3"
                />
                <FloatingLabelInput
                  id={password}
                  label="Password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  className="w-full py-3 px-4 rounded-md bg-transparent border border-gray-700 text-white mb-3"
                />
                {errorMessage && (
                  <p className="text-red-500 mt-4">{errorMessage}</p>
                )}
                {successMessage && (
                  <p className="text-green-500 font-semibold mt-4 text-center">
                    {successMessage}
                  </p>
                )}
                <div className="btnWrap">
                  <Button
                    theme={disabled ? "light disabled" : "light"}
                    context={"Login"}
                    callback={() => signinHandler()}
                    disabled={password.length > 0 ? false : true}
                  />
                  <Button
                    disabled={false}
                    theme={"dark"}
                    context={"Forget password"}
                    callback={() => {}}
                  />
                </div>
                {show && !successMessage && !errorMessage && (
                  <div className="text-white mt-4 text-center">{resp}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <AuthContainer isPopup={isPopup}>
      {content}

      {/* Signup Popup - Only shown on desktop */}
      {showSignupPopup && !isMobile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div className="z-50">
            <Signup onClose={handleCloseSignupPopup} isPopup={true} />
          </div>
        </div>
      )}
    </AuthContainer>
  );
}
