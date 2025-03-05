import "./style.css";
import logo from "../../assets/logo.png";
import axios from "axios";
import API_KEY from "../../../key.js";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router";
import Input from "../../components/input/component";
import Button from "../../components/button/component";
import FloatingLabelInput from "../../components/LabelInput.jsx";

export default function Signup(){
    const navigate = useNavigate();
    const [username, setUname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPass] = useState("");

    const [resp, setResp] = useState("");
    const [show, setShow] = useState(false);
    const [load, setLoad] = useState(false);
    
    const [disabled, setDisabled] = useState(true);
    const signupHandler = async () => {
      setLoad(true);
      const response = await axios
        .post(API_KEY + "/auth/signup", {
          // name: username, 
          email,
          // password,
        })
        .catch((e) => {
          return e.response;
        });

      if (response) {
        setLoad(false);
        console.log(response?.data?.msg);
        setResp(response?.data?.msg);
        if(response.status == 200){
          window.localStorage.setItem("token", response?.data?.token)
          navigate("/verify")
        }
        setShow(true);
      }
    };

    useEffect(() => {
      if (email != "" && password != "" && username != "") {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }, [email, password, username]);

    
  const fetchGoogleUrl = async () => {
    const response = await axios.get(API_KEY + "/auth/oauth").catch((e) => e.response);
    console.log(response?.data?.msg);
    if (response.status == 200) {
      console.log(response?.data?.msg);
      window.location.href = response.data.msg;
    }
  }
  const handleLinkedInLogin = () => {
    // Redirect to backend LinkedIn login route
    window.location.href = `${API_KEY}/auth/linkedin`;
  };

    return (
      <div className="auth-container">
        <div className="wrapper">
          <img src={logo} alt="" className="logo-sn" />
          <p className="title">Sign up with Vertx</p>
            <>
                           <Button
                             context={"Sign in with Google"}
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
         
                           {/* Email input and Next button */}
                           <div className="w-full">
                              <FloatingLabelInput
                                            id={`email`}  label="username, email address, or vertxuid"  type='text' validateidentifier={ true}
                                            value={email}
                                            onChange={setEmail}
                                           //  onValidate={setemail}
                                             className="w-full py-3 px-4 rounded-md bg-transparent border border-gray-700 text-white mb-3"
                                    />
                             {/* {errorMessage && (
                               <p className="text-red-500 mt-4">{errorMessage}</p>
                             )} */}
         
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
        </div>
      </div>
    );
}