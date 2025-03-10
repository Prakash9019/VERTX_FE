import * as React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import API_KEY from "../../../../key.js";
import { Button, BackButton, AuthContainer } from "../common-components.jsx";

export default function Verify() {
    const navigate = useNavigate();
    const [coder, setcoder] = useState(Array(6).fill(""));
    const inputRefs = useRef([]);
    const [errorMessage, setErrorMessage] = useState('');

    const notify = () => toast("Verification already sent!");

    const handleChange = (value, index) => {
        if (/^\d$/.test(value)) {
            const newcoder = [...coder];
            newcoder[index] = value;
            setcoder(newcoder);

            // Move focus to the next input
            if (index < 5) {
                inputRefs.current[index + 1].focus();
            }
        } else if (value === "") {
            const newcoder = [...coder];
            newcoder[index] = "";
            setcoder(newcoder);
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
                setcoder(newcoder);
            }
        }
    };

    const handleSubmit = async () => {
        const code = coder.join("");
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Verification token is missing. Please register again.");
        }
        
        try {
          //  console.log(localStorage.getItem("token"));
            const response = await fetch(`${API_KEY}/auth/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ token, code }),
            });
          //  console.log(response);

            if (!response.ok) {
                throw new Error('Failed to register');
            }

            const data = await response.json();
          //  console.log(data);
            navigate('/setpassword');
        } catch (error) {
            console.error("Submission failed:", error);
            setErrorMessage(error.message);
        }
    };

    // Function to handle back button
    const handleBack = () => {
        navigate(-1);
    };

    const iscoderComplete = coder.every((digit) => digit !== "");

    return (
      <AuthContainer>
        <div className="absolute top-4 left-4 z-20">
          <BackButton onClick={handleBack} />
        </div>

        <div className="w-full flex flex-col justify-center items-center mt-6 sm:mt-12">
          <div className="text-center w-full max-w-md mx-auto px-4 sm:px-0">
            <p className="font-['Manrope'] text-white text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
              Verify your email
            </p>

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
                disabled={!iscoderComplete}
              />
            </div>
          </div>
        </div>
        <ToastContainer />
      </AuthContainer>
    );
}