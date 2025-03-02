import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import API_KEY from "../../../key.js";
import logo from "../../assets/logo.png";

export default function LandingAuth({ onClose }) {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [username, setUsername] = useState("");
  
  const fetchGoogleUrl = async () => {
    const response = await axios.get(API_KEY + "/auth/oauth").catch((e) => e.response);
    console.log(response?.data?.msg);
    if(response.status == 200){
      console.log(response?.data?.msg);
      window.location.href = response.data.msg;
    }
  }
  
  // Function to handle login button click
  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowPasswordForm(false);
  };
  
  // Function to handle next button click
  const handleNextClick = () => {
    setShowPasswordForm(true);
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
    <div className="w-full min-h-[550px] bg-black px-20 pl-80 pr-80 pb-12 pt-6 flex flex-col justify-center mx-auto rounded-lg shadow-lg relative backdrop-blur-md bg-opacity-80 z-150">




      <div className="w-full flex flex-col justify-center items-center mt-8">
        <div className="text-center w-full">
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
                    placeholder="username or email"
                    className="w-full py-3 px-4 rounded-md bg-transparent border border-gray-700 text-white mb-3"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  
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
                  placeholder="username or email"
                  className="w-full py-3 px-4 rounded-md bg-transparent border border-gray-700 text-white mb-3"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled
                />
                
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full py-3 px-4 rounded-md bg-transparent border border-gray-700 text-white mb-3"
                  autoFocus
                />
                
                <Button
                  context={"Next"}
                  theme="light"
                  callback={() => {
                    // Handle login submission
                    navigate("/home");
                    if (onClose) onClose();
                  }}
                />
                
                <Button
                  context={"Forgot password?"}
                  theme="dark"
                  callback={() => {
                    // Handle forgot password
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Button component included in the same file
function Button({ context, theme, callback }) {
  return (
    <button
      onClick={callback}
      className={`w-full py-3 px-4   rounded-full font-medium text-sm mb-3 transition-colors ${
        theme === "light" 
          ? "bg-white text-black hover:bg-gray-200" 
          : "bg-transparent text-white border border-gray-700 hover:bg-gray-900"
      }`}
    >
      {context}
    </button>
  );
}