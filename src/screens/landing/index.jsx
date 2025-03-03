import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import API_KEY from "../../../key.js";
import logo from "../../assets/logo.png";
import Input from "../../components/input/component.jsx";

export default function LandingAuth({ onClose }) {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [resp, setResp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);

  const fetchGoogleUrl = async () => {
    const response = await axios.get(API_KEY + "/auth/oauth").catch((e) => e.response);
    console.log(response?.data?.msg);
    if (response.status == 200) {
      console.log(response?.data?.msg);
      window.location.href = response.data.msg;
    }
  }

  const signinHandler = async () => {
    // setLoad(true)
    const response = await axios
      .post(API_KEY + "/auth/signin", {
        email,
        password,
      })
      .catch((e) => {
        return e.response;
      });

    if (response) {
      // setLoad(false);
      console.log(response);
      console.log(response?.data?.msg);
      setResp(response?.data?.msg);
      if (response.status == 200) {
        window.localStorage.setItem("token", response?.data?.token);
        navigate("/callback")
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
      const response = await fetch(API_KEY +"/auth/checkUser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });
      console.log(response);
      const data = await response.json();
      if (!response.ok) {
        const errorMessage = data.message || 'An unknown error occurred'; // Fallback message
        throw new Error(errorMessage); // Throw dynamic error   
      }

      if (data.status) {
        setShowPasswordForm(true);
        setErrorMessage('');
      } else {
        setErrorMessage('User does not exist');
        setShowPasswordForm(false);
      }
    } catch (error) {
      // console.error( error);
      setErrorMessage(error.message);
    }
  };

  // Function to go back
  const handleBack = () => {
    if (showPasswordForm) {
      setShowPasswordForm(false);
    } else if (showLoginForm) {
      setShowLoginForm(false);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-[2px] flex justify-center items-center z-50">
      <div className="w-[60%] bg-black rounded-2xl border border-[#75757569] p-6 pb-10 h-[70%] overflow-auto relative">
        <div className="absolute top-4 left-4 z-20">
          <button
            onClick={handleBack}
            className="rounded-full bg-transparent p-2 text-white hover:bg-gray-900 border border-gray-700 h-10 w-10 flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

      
        <div className="w-full flex flex-col justify-center items-center mt-12">
          <div className="text-center w-full max-w-md mx-auto">
            <p className="font-['Manrope'] text-white text-3xl font-bold mb-8 text-center">
              {showPasswordForm ? "Enter password" : showLoginForm ? "Sign in to Vertx" : "Join today."}
            </p>

            <div className="w-full max-w-xs mx-auto flex flex-col items-center">
              {/* Sign up Form */}
              {!showLoginForm && !showPasswordForm && (
                <>
                  <Button
                    context={"Sign up with Google"}
                    theme="dark"
                    callback={() => fetchGoogleUrl()}
                  />

                  <Button
                    context={"Sign up with Apple"}
                    theme="dark"
                    callback={() => fetchGoogleUrl()}
                  />

                  <div className="w-full h-auto grid grid-cols-[1fr_max-content_1fr] justify-center items-center gap-2 text-[#9d9d9d] p-2 text-xs font-['Manrope']">
                    <div className="w-full h-px bg-[#9d9d9d]"></div>
                    <p className="text-xs">or</p>
                    <div className="w-full h-px bg-[#9d9d9d]"></div>
                  </div>

                  <Button
                    context={"Create account"}
                    theme="light"
                    callback={() => {
                      navigate("/signup");
                      if (onClose) onClose();
                    }}
                  />

                  <p className="mt-5 text-white font-['Manrope'] text-xs text-center font-extralight">
                    By signing up, you agree to the <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>, including <span className="underline">Cookie Use</span>.
                  </p>

                  <p className="font-['Manrope'] text-white text-sm font-bold mt-8 mb-2 text-center">Already have an account?</p>

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
                    context={"Sign in with Apple"}
                    theme="dark"
                    callback={() => fetchGoogleUrl()}
                  />

                  <div className="w-full h-auto grid grid-cols-[1fr_max-content_1fr] justify-center items-center gap-2 text-[#9d9d9d] p-2 text-xs font-['Manrope']">
                    <div className="w-full h-px bg-[#9d9d9d]"></div>
                    <p className="text-xs">or</p>
                    <div className="w-full h-px bg-[#9d9d9d]"></div>
                  </div>

                  {/* Email input and Next button */}
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="email or email"
                      className="w-full py-3 px-4 rounded-md bg-transparent border border-gray-700 text-white mb-3"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
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
                  <Input
                    state={email}
                    setState={setemail}
                    label={"Enter your email"}
                    theme={"dark"}
                  />
                  <Input
                    state={password}
                    setState={setPassword}
                    label={"Set a strong password"}
                    theme={"dark"}
                    password={true}
                  />
                  <div className="btnWrap">
                    <Button
                      theme={disabled ? "light disabled" : "light"}
                      context={"Next"}
                      callback={() => signinHandler()}
                      disabled={password.length > 0 ? false : true}
                    />
                    <Button
                      disabled={false}
                      theme={"dark"}
                      context={"Forget password"}
                      callback={() => { }}
                    />
                  </div>
                  <a href="/signup" className="subhead">
                    Don't have an account? <span>Sign up</span>
                  </a>
                  {show ? <div className="notification">{resp}</div> : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Button component included in the same file
function Button({ context, theme, callback, disabled }) {
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
}