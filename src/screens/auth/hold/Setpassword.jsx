import * as React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API_KEY from "../../../../key.js";
import { Button, BackButton, AuthContainer } from "../common-components.jsx";

export default function SetNewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Session Timeout");
      return;
    }

    try {
      const response = await fetch(`${API_KEY}/auth/set-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "token": localStorage.getItem("token")
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to set password');
        return;
      }

      const data = await response.json();
      //console.log(data);
      navigate('/outreach');
    } catch (error) {
      //console.error("Submission failed:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  // Function to handle back button
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <AuthContainer>
      <div className="absolute top-4 left-4 z-20">
        <BackButton onClick={handleBack} />
      </div>

      <div className="w-full flex flex-col justify-center items-center mt-6 sm:mt-12">
        <div className="text-center w-full max-w-md mx-auto px-4 sm:px-0">
          <p className="font-['Manrope'] text-white text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
            Set password
          </p>

          <div className="text-sm sm:text-base font-medium text-neutral-500 mb-6 sm:mb-8 text-center">
            Enter a new password for your account
          </div>

          <div className="w-full max-w-xs mx-auto flex flex-col items-center">
            <div className="relative w-full mb-4">
              <div className="relative w-full">
                <input
                  id="Password"
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  minLength={8}
                  className={`w-full px-4 py-3 bg-transparent rounded-md border border-gray-700 text-white text-sm sm:text-base focus:outline-none focus:ring-0 
                    ${!password && !isFocused ? 'pl-[100px]' : 'pl-4'} transition-all duration-200`}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                {(!password && !isFocused) && (
                  <label
                    htmlFor="Password"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm sm:text-base transition-all duration-200 pointer-events-none"
                  >
                    Password
                  </label>
                )}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 mt-4 text-sm text-center">{errorMessage}</p>
            )}

            <Button
              context="Set Password"
              theme="light"
              callback={handleSubmit}
              disabled={password.length < 8}
            />
          </div>
        </div>
      </div>
    </AuthContainer>
  );
}