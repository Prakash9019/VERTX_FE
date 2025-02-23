import "./style.css";
import logo from "../../assets/logo.png";
import axios from "axios";
import API_KEY from "../../../key.js";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router"
import { useEffect } from "react";
import Button from "../../components/button/component"

export default function Callback() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const code = params.get("code");

  const callback = async () => {
    const response = await axios
      .get(API_KEY + `/auth/callback?code=${code}`, {
      })
      .catch((e) => {
        return e.response;
      });
      console.log(response.data)
      if(response.status == 200){
        window.localStorage.setItem("token", response?.data?.token);
      }
  };
  
  useEffect(() => {
    console.log(code);
    if(code){
        callback();
    }
  }, [])

  return (
    <div className="auth-container lg">
      <div className="logowrap">
        <img src={logo} alt="" className="logo-zn" />
        <div className="filter"></div>
      </div>
      <p className="ltitle">
        Welcome <span className="ln">⇢</span> <span>[Vertx AI]</span>
      </p>
      <p className="lsub">
        where visionaries connect, investors collaborate, and dreams take
        flight. Some parts of this page are still under development, but feel
        free to explore and discover what's in store! 🚀
      </p>
      <div style={{marginTop: 35 }} className="btns">
        <Button context={"Explore"} theme={"light"} callback={() => {
          navigate("/outreach");
        }} />
      </div>
    </div>
  );
}
