import "./style.css";
import logo from "../../assets/logo.png";
import axios from "axios";
import API_KEY from "../../../key.js";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router"
import { useEffect } from "react";
import Button from "../../components/button/component"

export function Callback2() {
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
      //console.log(response)
      //console.log(response.data);
      if(response.status == 200){
        localStorage.setItem("token", response?.data?.token);
        navigate("/outreach");
      }
      localStorage.setItem("token", response?.data?.token);
        navigate("/outreach");
  };
  
  useEffect(() => {
    //console.log(code);
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




// import "./style.css";
// import logo from "../../assets/logo.png";
// import axios from "axios";
// import API_KEY from "../../../key.js";  // Replace with your actual API key or base URL
// import { useState, useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router";
// import Button from "../../components/button/component";

 export function Callback() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token"); // Extract the code from URL
  const [username1,setUsernamee1] =useState("@username")
  const [dip,setDip] = useState("");
  const handleUsername = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return; // Prevent request if token is missing
  
      const response = await axios.get(`${API_KEY}/auth/getUser`, {
        headers: {
          "Content-Type": "application/json",
          token: token, // Send token in headers
        },
      });
  
      console.log(response.data);
      setUsernamee1(response.data.user.username); // Update the username state with the fetched username
      localStorage.setItem("user",response.data.user.username);
      localStorage.setItem("dip",response.data.user.dip);
      console.log(localStorage.getItem("dip"))
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  //console.log(params);

  const callback = async () => {
    try {
      // const response = await axios.get(`${API_KEY}/auth/linkedin/callback?code=${code}`);
       //console.log("hello");
       //console.log(token);
      if (token) {
        // Store the token in local storage
        await handleUsername();
        localStorage.setItem("token", token);
        navigate("/outreach");  // Redirect to outreach or desired route
      } else {
        //console.error("Error fetching data from backend:", token);
      }
    } catch (error) {
      //console.error("Error in LinkedIn callback:", error);
      // Optionally handle error like showing an alert or navigating to an error page
    }
  };

  useEffect(() => {
    if (token) {
      callback(); // Trigger the callback function when the code is available
    }
  }, [token]);

  return (
    <div className="auth-container lg">
      <div className="logowrap">
        <img src={logo} alt="Logo" className="logo-zn" />
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
      <div style={{ marginTop: 35 }} className="btns">
        <Button context={"Explore"} theme={"light"} callback={() => navigate("/outreach")} />
      </div>
    </div>
  );
}
