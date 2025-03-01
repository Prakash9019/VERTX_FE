// import "./style.css";
// import logo from "../../assets/logo.png";
// import axios from "axios";
// import API_KEY from "../../../key.js";
// import { useState } from "react";
// import { useSearchParams, useNavigate } from "react-router"
// import { useEffect } from "react";
// import Button from "../../components/button/component"

// export default function Callback() {
//   const navigate = useNavigate();
//   const [params] = useSearchParams();
//   const code = params.get("code");

//   const callback = async () => {
//     const response = await axios
//       .get(API_KEY + `/auth/callback?code=${code}`, {
//       })
//       .catch((e) => {
//         return e.response;
//       });
//       console.log(response)
//       console.log(response.data);
//       if(response.status == 200){
//         window.localStorage.setItem("token", response?.data?.token);
//         navigate("/outreach");
//       }
//       window.localStorage.setItem("token", response?.data?.token);
//         navigate("/outreach");
//   };
  
//   useEffect(() => {
//     console.log(code);
//     if(code){
//         callback();
//     }
//   }, [])

//   return (
//     <div className="auth-container lg">
//       <div className="logowrap">
//         <img src={logo} alt="" className="logo-zn" />
//         <div className="filter"></div>
//       </div>
//       <p className="ltitle">
//         Welcome <span className="ln">⇢</span> <span>[Vertx AI]</span>
//       </p>
//       <p className="lsub">
//         where visionaries connect, investors collaborate, and dreams take
//         flight. Some parts of this page are still under development, but feel
//         free to explore and discover what's in store! 🚀
//       </p>
//       <div style={{marginTop: 35 }} className="btns">
//         <Button context={"Explore"} theme={"light"} callback={() => {
//           navigate("/outreach");
//         }} />
//       </div>
//     </div>
//   );
// }

import "./style.css";
import logo from "../../assets/logo.png";
import axios from "axios";
import API_KEY from "../../../key.js";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import Button from "../../components/button/component";

export default function Callback() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const code = params.get("code");

  const callback = async () => {
    if (!code) return; // Ensure code exists

    try {
      console.log("Making API call with code:", code);
      const response = await axios.get(`${API_KEY}/auth/callback?code=${code}`);

      console.log("Response:", response);

      if (response.status === 200) {
        console.log("Success:", response.data);
        window.localStorage.setItem("token", response.data.token);
        navigate("/outreach"); // Navigate only if success
      }
    } catch (error) {
      console.error("Error in callback:", error.response || error);
    }
  };

  useEffect(() => {
    console.log("Code in URL:", code);
    if (code) {
      callback();
    }
  }, [code]); // Ensure useEffect only runs when `code` changes

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
      <div style={{ marginTop: 35 }} className="btns">
        <Button context={"Explore"} theme={"light"} callback={() => navigate("/outreach")} />
      </div>
    </div>
  );
}

