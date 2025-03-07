"use client"

import "./style.css"
import { useState } from "react"
import { useNavigate } from "react-router"
import { BackButton, AuthContainer } from "./common-components.jsx"
import { SignupForm, VerificationForm, SetPasswordForm } from "./auth-components.jsx"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Signup({ onClose, isPopup = false }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [currentStep, setCurrentStep] = useState("signup")

  // Header text based on current step
  const getHeaderText = () => {
    switch (currentStep) {
      case "signup":
        return "Create a Account "
      case "verify":
        return "Verify your email"
      case "setpassword":
        return "Set password"
      default:
        return "Create your account"
    }
  }

  // Function to handle back button
  const handleBack = () => {
    if (currentStep === "verify") {
      setCurrentStep("signup")
    } else if (currentStep === "setpassword") {
      setCurrentStep("verify")
    } else if (onClose) {
      onClose()
    } else {
      navigate(-1)
    }
  }

  // Handle step completion
  const handleStepComplete = (nextStep) => {
    if (nextStep === "outreach") {
      if (isPopup && onClose) {
        onClose()
      }
      navigate("/outreach")
    } else {
      setCurrentStep(nextStep)
    }
  }

  const content = (
    <>
      <div className="absolute top-4 left-4 z-20">
        <BackButton onClick={handleBack} />
      </div>

      <div className="w-full flex flex-col justify-center items-center mt-6 sm:mt-12">
        <div className="text-center w-full max-w-md mx-auto px-4 sm:px-0">
          <p className="font-['Manrope'] text-white text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
            {getHeaderText()}
          </p>

          {currentStep === "signup" && <SignupForm onComplete={handleStepComplete} email={email} setEmail={setEmail} />}

          {currentStep === "verify" && <VerificationForm onComplete={handleStepComplete} email={email} />}

          {currentStep === "setpassword" && <SetPasswordForm onComplete={handleStepComplete} />}
        </div>
      </div>
      <ToastContainer />
    </>
  )

  return <AuthContainer isPopup={isPopup}>{content}</AuthContainer>
}
