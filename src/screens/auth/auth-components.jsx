import React, { useState, useRef } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import API_KEY from "../../../key";
import FloatingLabelInput from "../../components/LabelInput.jsx";

export const SignupForm = ({ onComplete, email, setEmail }) => {
  const [resp, setResp] = useState("");
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  const signupHandler = async () => {
    setLoad(true);
    const response = await axios
      .post(API_KEY + "/auth/signup", {
        email,
      })
      .catch((e) => {
        setErrorMessage(e.response?.data?.msg || "An error occurred");
        return e.response;
      });

    if (response) {
      setLoad(false);
      setErrorMessage(response?.data?.msg);
      setResp(response?.data?.msg);
      if (response.status == 200) {
        window.localStorage.setItem("token", response?.data?.token);
        onComplete("verify");
      }
      setShow(true);
    }
  };

  React.useEffect(() => {
    if (email != "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email]);

  const fetchGoogleUrl = async () => {
    const response = await axios.get(API_KEY + "/auth/oauth").catch((e) => e.response);
    if (response?.status == 200) {
      window.location.href = response.data.msg;
    }
  }

  const handleLinkedInLogin = () => {
    window.location.href = `${API_KEY}/auth/linkedin`;
  };

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col items-center">
      <div className="w-full space-y-3">
        <Button
          context={"Sign up with Google"}
          theme="dark"
          callback={() => fetchGoogleUrl()}
        />

        <Button
          context={"Sign up with LinkedIn"}
          theme="dark"
          callback={() => handleLinkedInLogin()}
        />

        <div className="w-full h-auto grid grid-cols-[1fr_max-content_1fr] justify-center items-center gap-2 text-[#9d9d9d] p-2 text-xs font-['Manrope']">
          <div className="w-full h-px bg-[#9d9d9d]"></div>
          <p className="text-xs">or</p>
          <div className="w-full h-px bg-[#9d9d9d]"></div>
        </div>

        <div className="w-full">
          <FloatingLabelInput
            id={`email`}
            label="username, email address, or vertxuid"
            type='text'
            validateidentifier={true}
            value={email}
            onChange={setEmail}
            className="w-full py-3 px-4 rounded-md bg-transparent border border-gray-700 text-white mb-3"
          />
          
          {errorMessage && (
            <p className="text-red-500 mt-4 text-sm text-center">{errorMessage}</p>
          )}

          <Button
            context={"Next"}
            theme="light"
            callback={signupHandler}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export const VerificationForm = ({ onComplete, email }) => {
  const [coder, setCoder] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [errorMessage, setErrorMessage] = useState('');

  const notify = () => toast("Verification already sent!");

  const handleChange = (value, index) => {
    if (/^\d$/.test(value)) {
      const newcoder = [...coder];
      newcoder[index] = value;
      setCoder(newcoder);

      // Move focus to the next input
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === "") {
      const newcoder = [...coder];
      newcoder[index] = "";
      setCoder(newcoder);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newcoder = [...coder];

      if (coder[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      } else {
        newcoder[index] = "";
        setCoder(newcoder);
      }
    }
  };

  const handleSubmit = async () => {
    const code = coder.join("");
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Verification token is missing. Please register again.");
      return;
    }
    
    try {
      const response = await fetch(`${API_KEY}/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "token": token,
        },
        body: JSON.stringify({ token, code }),
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      const data = await response.json();
      onComplete("setpassword");
    } catch (error) {
      console.error("Submission failed:", error);
      setErrorMessage(error.message);
    }
  };

  const isCoderComplete = coder.every((digit) => digit !== "");

  return (
    <>
      <div className="text-sm sm:text-base font-medium text-neutral-500 mb-6 sm:mb-8 text-center">
        We sent you a code. Enter it below to verify your email.
      </div>

      <div className="w-full max-w-md mx-auto flex justify-center space-x-2 sm:space-x-3 mb-6">
        {coder.map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={coder[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-10 sm:w-12 h-10 sm:h-12 bg-transparent rounded-md border border-gray-700 text-center text-white focus:outline-none focus:border-white text-sm sm:text-base"
          />
        ))}
      </div>

      <div className="text-sm font-semibold text-neutral-500 text-center mb-4">
        Didn't receive an email?{" "}
        <span className="font-extrabold text-white cursor-pointer" onClick={notify}>
          Resend
        </span>
      </div>

      {errorMessage && (
        <p className="text-red-500 mt-4 text-sm text-center">{errorMessage}</p>
      )}

      <div className="w-full max-w-xs mx-auto">
        <Button
          context="Verify"
          theme="light"
          callback={handleSubmit}
          disabled={!isCoderComplete}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export const SetPasswordForm = ({ onComplete }) => {
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
          "token": token
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to set password');
        return;
      }

      const data = await response.json();
      onComplete("outreach");
    } catch (error) {
      console.error("Submission failed:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
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
    </>
  );
};

// Import Button at the top to use in the components above
const Button = ({ context, theme, callback, disabled = false }) => {
  return (
    <button
      onClick={callback}
      disabled={disabled}
      className={`w-full py-3 px-4 rounded-full font-medium text-sm mb-3 transition-colors ${
        theme === "light"
          ? disabled 
            ? "bg-gray-400 text-gray-700 cursor-not-allowed" 
            : "bg-white text-black hover:bg-gray-200"
          : "bg-transparent text-white border border-gray-700 hover:bg-gray-900"
      }`}
    >
      {context}
    </button>
  );
};