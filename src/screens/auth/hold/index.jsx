// import "./style.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button, BackButton, AuthContainer } from "../common-components.jsx";
import { SignupForm, VerificationForm, SetPasswordForm } from "../auth-components.jsx";

export default function Signup({ onClose }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [currentStep, setCurrentStep] = useState("signup");
  
  // Header text based on current step
  const getHeaderText = () => {
    switch (currentStep) {
      case "signup":
        return "Create your account";
      case "verify":
        return "Verify your email";
      case "setpassword":
        return "Set password";
      default:
        return "Create your account";
    }
  };

  // Function to handle back button
  const handleBack = () => {
    if (currentStep === "verify") {
      setCurrentStep("signup");
    } else if (currentStep === "setpassword") {
      setCurrentStep("verify");
    } else if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  // Handle step completion
  const handleStepComplete = (nextStep) => {
    if (nextStep === "outreach") {
      navigate('/outreach');
    } else {
      setCurrentStep(nextStep);
    }
  };

  return (
    <AuthContainer>
      <div className="absolute top-4 left-4 z-20">
        <BackButton onClick={handleBack} />
      </div>

      <div className="w-full flex flex-col justify-center items-center mt-6 sm:mt-12">
        <div className="text-center w-full max-w-md mx-auto px-4 sm:px-0">
          <p className="font-['Manrope'] text-white text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
            {getHeaderText()}
          </p>

          {currentStep === "signup" && (
            <SignupForm 
              onComplete={handleStepComplete} 
              email={email} 
              setEmail={setEmail} 
            />
          )}

          {currentStep === "verify" && (
            <VerificationForm 
              onComplete={handleStepComplete} 
              email={email} 
            />
          )}

          {currentStep === "setpassword" && (
            <SetPasswordForm 
              onComplete={handleStepComplete} 
            />
          )}
        </div>
      </div>
    </AuthContainer>
  );
}