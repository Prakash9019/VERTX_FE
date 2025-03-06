import "./style.css";
import logo from "../../assets/logo.png";
import axios from "axios";
import API_KEY from "../../../key.js";
import { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../../components/input/component";
import Button from "../../components/button/component";
import { useEffect } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const [resp, setResp] = useState("");
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  const signinHandler = async () => {
    
    setLoad(true)
    const response = await axios
      .post(API_KEY + "/auth/signin", {
        email,
        password,
      })
      .catch((e) => {
        return e.response;
      });

    if(response){
        setLoad(false);
        //console.log(response);
        //console.log(response?.data?.msg);
        setResp(response?.data?.msg);
        if (response.status == 200) {
          window.localStorage.setItem("token", response?.data?.token);
          navigate("/callback")
        }
        setShow(true);
    }
  };

  useEffect(() => {
    if(email != "" && password != ""){
      setDisabled(false)
    }else{
      setDisabled(true)
    }
  }, [email, password])

  
  return (
    <div className="auth-container">
      <div className="wrapper">
        <img src={logo} alt="" className="logo-sn" />
        <p className="title">Sign in with Vertx</p>
        <Input
          state={email}
          setState={setEmail}
          label={"Enter your email"}
          theme={"dark"}
        />
        <Input
          state={password}
          setState={setPass}
          label={"Set a strong password"}
          theme={"dark"}
          password={true}
        />
        <div className="btnWrap">
          <Button
            theme={disabled ? "light disabled" : "light"}
            context={load ? <div className="loader"></div> : "Log In"}
            callback={() => signinHandler()}
            disabled={disabled}
          />
          <Button
            disabled={false}
            theme={"dark"}
            context={"Forget password"}
            callback={() => {}}
          />
        </div>
        <a href="/signup" className="subhead">
          Don't have an account? <span>Sign up</span>
        </a>
        {show ? <div className="notification">{resp}</div> : null}
      </div>
    </div>
  );
}
