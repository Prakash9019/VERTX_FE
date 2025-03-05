import * as React from "react";
import { useState, useRef } from "react";import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API_KEY from "../../../key";
export default function SetNewPassword() {
  const navigate=useNavigate();
  const [code, setCode] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [isFocused, setIsFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Session TimeOut..");
    }
      try {
        const response = await fetch(`${API_KEY}/auth/set-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "token":localStorage.getItem("token")
            },
            body: JSON.stringify({  password }),
        });

        if (!response.ok) {
            throw new Error('Failed to register');
        }

        const data = await response.json();
        console.log(data);
        navigate('/outreach');
    } catch (error) {
        console.error("Submission failed:", error);
    }
    };

  const isCodeComplete = code.every((digit) => digit !== "");
  return (
    <div className="flex flex-col justify-center items-center px-20 py-10 w-full bg-white bg-opacity-10 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col justify-center items-center px-20 py-9 max-w-full bg-black rounded-3xl w-[875px] max-md:px-5">
        <div className="flex flex-col max-w-full w-[499px]">
          <div className="flex flex-col items-center pl-4 w-full max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6be73a9e8e4ac3494f3a29eda1ee0af912ef46612af53b70da8be8601c370c22?placeholderIfAbsent=true&apiKey=42bb954c825745999302100cb42c8fd0"
              className="object-contain aspect-square w-[60px]"
            />
            <div className="mt-7 text-4xl font-extrabold text-white">
              Set password
            </div>
            <div className="mt-1.5 text-base font-medium text-neutral-500">
            Enter the OTP sent to the mail associated with your account to change your password.
            </div>
            {/* <div className="flex flex-wrap gap-5 justify-between self-stretch mt-20 max-md:mt-10 max-sm:mb-0">
              {code.map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={code[index]}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="flex shrink-0 bg-black rounded-md border border-solid border-neutral-500 h-[62px] w-[62px] text-center text-white"
                />
              ))}
            </div> */}

            <div className="relative w-full">
              {" "}
              <label
                htmlFor="Password"
                onClick={() => {
                  setIsFocused(true);
                  document.getElementById("Password").focus();
                }}
                className={`absolute text-xl p-3 transition-all duration-200 ${
                  isFocused || password
                    ? "top-[-6px] text-xs text-blue-500"
                    : "top-3 text-gray-500"
                }`}
              >
                {" "}
                Password{" "}
              </label>{" "}
              <div className="flex items-center w-full px-4 py-6 bg-black rounded-md border border-solid border-neutral-500">
                {" "}
                <input
                  id="Password"
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  minLength={8}
                  className="flex-grow bg-transparent text-white text-xl focus:outline-none focus:ring-0"
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    setIsFocused(false); // validateInput(value);
                  }}
                />{" "}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="ml-2 text-white"
                >
                  {" "}
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}{" "}
                </button>{" "}
              </div>{" "}
            </div>
          </div>
        
          <button
            onClick={handleSubmit}
            className={`px-12 py-3 mt-60 text-xl font-extrabold text-black whitespace-nowrap rounded-[100px] max-md:px-5 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full 
              
              ${
              isCodeComplete ? "bg-white" : "bg-white"
            }`
          
          }
          >
            Set Password
          </button>
        </div>
      </div>
    </div>
  );
}
