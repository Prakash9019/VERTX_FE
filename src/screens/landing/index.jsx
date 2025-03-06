"use client"

import { useNavigate } from "react-router"
import { useState } from "react"
import axios from "axios"
import API_KEY from "../../../key.js"
import FloatingLabelInput from "../../components/LabelInput.jsx"
import Signup from "../auth/signup.jsx"
import { Button, BackButton, AuthContainer } from "../auth/common-components.jsx"

export default function LandingAuth({ onClose, isPopup = false }) {
  const navigate = useNavigate()
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [showSignupPopup, setShowSignupPopup] = useState(false)
  const [email, setemail] = useState("")
  const [password, setPassword] = useState("")
  const [disabled, setDisabled] = useState(false)
  const [resp, setResp] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [show, setShow] = useState(false)

  const fetchGoogleUrl = async () => {
    const response = await axios.get(API_KEY + "/auth/oauth").catch((e) => e.response)
    if (response?.status == 200) {
      window.location.href = response.data.msg
    }
  }

  const signinHandler = async () => {
    const response = await axios
      .post(API_KEY + "/auth/signin", {
        email,
        password,
      })
      .catch((e) => {
        setErrorMessage(e.response?.data?.msg || "An error occurred")
        return e.response
      })

    if (response) {
      setErrorMessage(response?.data?.msg)
      setResp(response?.data?.msg)
      if (response?.status == 200) {
        window.localStorage.setItem("token", response?.data?.token)
        if (isPopup && onClose) {
          onClose()
        } else {
          navigate("/callback")
        }
      }
      setShow(true)
    }
  }

  // Function to handle login button click
  const handleLoginClick = () => {
    setShowLoginForm(true)
    setShowPasswordForm(false)
  }

  // Function to handle next button click
  const handleNextClick = async () => {
    try {
      const response = await fetch(API_KEY + "/auth/checkUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      })

      const data = await response.json()
      if (!response.ok) {
        const errorMessage = data.message || "An unknown error occurred"
        throw new Error(errorMessage)
      }

      if (data.status) {
        setShowPasswordForm(true)
        setErrorMessage("")
      } else {
        setErrorMessage("User does not exist")
        setShowPasswordForm(false)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  // Function to go back
  const handleBack = () => {
    if (showPasswordForm) {
      setShowPasswordForm(false)
    } else if (showLoginForm) {
      setShowLoginForm(false)
    } else if (onClose) {
      onClose()
    } else {
      navigate(-1)
    }
  }

  const handleLinkedInLogin = () => {
    window.location.href = `${API_KEY}/auth/linkedin`
  }

  const handleCreateAccount = () => {
    setShowSignupPopup(true)
  }

  const handleCloseSignupPopup = () => {
    setShowSignupPopup(false)
  }

  const content = (
    <>
      <div className="absolute top-4 left-4 z-20">
        <BackButton onClick={handleBack} />
      </div>

      <div className="w-full flex flex-col justify-center items-center mt-6 sm:mt-12">
        <div className="text-center w-full max-w-md mx-auto px-4 sm:px-0">
          <p className="font-['Manrope'] text-white text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
            {showPasswordForm ? "Enter password" : showLoginForm ? "Sign in to Vertx" : "Join today."}
          </p>

          <div className="w-full max-w-xs mx-auto flex flex-col items-center">
            {/* Sign up Form */}
            {!showLoginForm && !showPasswordForm && (
              <>
                <Button context={"Sign up with Google"} theme="dark" callback={() => fetchGoogleUrl()} />

                <Button context={"Sign up with LinkedIn"} theme="dark" callback={() => handleLinkedInLogin()} />

                <div className="w-full h-auto grid grid-cols-[1fr_max-content_1fr] justify-center items-center gap-2 text-[#9d9d9d] p-2 text-xs font-['Manrope']">
                  <div className="w-full h-px bg-[#9d9d9d]"></div>
                  <p className="text-xs">or</p>
                  <div className="w-full h-px bg-[#9d9d9d]"></div>
                </div>

                <Button context={"Create account"} theme="light" callback={handleCreateAccount} />

                <p className="mt-5 text-white font-['Manrope'] text-xs text-center font-extralight">
                  By signing up, you agree to the <span className="underline">Terms of Service</span> and{" "}
                  <span className="underline">Privacy Policy</span>, including{" "}
                  <span className="underline">Cookie Use</span>.
                </p>

                <p className="font-['Manrope'] text-white text-sm font-bold mt-8 mb-2 text-center">
                  Already have an account?
                </p>

                <Button context={"Log in"} theme="dark" callback={handleLoginClick} />
              </>
            )}

            {/* Login Email Form */}
            {showLoginForm && !showPasswordForm && (
              <>
                <Button context={"Sign in with Google"} theme="dark" callback={() => fetchGoogleUrl()} />

                <Button context={"Sign in with LinkedIn"} theme="dark" callback={() => handleLinkedInLogin()} />
                <div className="w-full h-auto grid grid-cols-[1fr_max-content_1fr] justify-center items-center gap-2 text-[#9d9d9d] p-2 text-xs font-['Manrope']">
                  <div className="w-full h-px bg-[#9d9d9d]"></div>
                  <p className="text-xs">or</p>
                  <div className="w-full h-px bg-[#9d9d9d]"></div>
                </div>

                {/* Email input and Next button */}
                <div className="w-full">
                  <FloatingLabelInput
                    id={`email`}
                    label="username, email address, or vertxuid"
                    type="text"
                    validateidentifier={true}
                    value={email}
                    onChange={setemail}
                    className="w-full py-3 px-4 rounded-md bg-transparent border border-gray-700 text-white mb-3"
                  />
                  {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

                  <Button context={"Next"} theme="light" callback={handleNextClick} />

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
                  id={`password`}
                  label="Password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  className="w-full py-3 px-4 rounded-md bg-transparent border border-gray-700 text-white mb-3"
                />
                {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                <div className="btnWrap">
                  <Button
                    theme={disabled ? "light disabled" : "light"}
                    context={"Login"}
                    callback={() => signinHandler()}
                    disabled={password.length > 0 ? false : true}
                  />
                  <Button disabled={false} theme={"dark"} context={"Forget password"} callback={() => {}} />
                </div>
                {show && <div className="text-white mt-4 text-center">{resp}</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )

  return (
    <AuthContainer isPopup={isPopup}>
      {content}

      {/* Signup Popup */}
      {showSignupPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div className="z-50">
            <Signup onClose={handleCloseSignupPopup} isPopup={true} />
          </div>
        </div>
      )}
    </AuthContainer>
  )
}
