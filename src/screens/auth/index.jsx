import "./style.css";
import axios from "axios";
import API_KEY from "../../../key.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import FloatingLabelInput from "../../components/LabelInput.jsx";
import { Button, BackButton, AuthContainer } from "./common-components.jsx";

export default function Signup({ onClose }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
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
          setErrorMessage(e.response)
          return e.response;
        });

      if (response) {
        setLoad(false);
        setErrorMessage(response?.data?.msg);
        setResp(response?.data?.msg);
        if(response.status == 200){
          window.localStorage.setItem("token", response?.data?.token)
          navigate("/verify")
        }
        setShow(true);
      }
    };

    useEffect(() => {
      if (email != "") {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }, [email]);

    
    const fetchGoogleUrl = async () => {
      const response = await axios.get(API_KEY + "/auth/oauth").catch((e) => e.response);
      console.log(response?.data?.msg);
      if (response.status == 200) {
        console.log(response?.data?.msg);
        window.location.href = response.data.msg;
      }
    }
    
    const handleLinkedInLogin = () => {
      window.location.href = `${API_KEY}/auth/linkedin`;
    };

    // Function to handle back button
    const handleBack = () => {
      if (onClose) {
        onClose();
      } else {
        navigate(-1);
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
              Create your account
            </p>

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
           
                  <Button
                    context={"Forgot password?"}
                    theme="dark"
                    callback={() => {
                      // Handle forgot password
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthContainer>
    );
}