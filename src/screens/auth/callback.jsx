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
      // .catch((e) => {
      //   return e.response;
      // });
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
import API_KEY from "../../../key.js";  // Replace with your actual API key or base URL
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import Button from "../../components/button/component";

export default function Callback() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const code = params.get("code");
  const provider = params.get("provider"); // New: check for provider (google, linkedin, etc.)

  const callback = async () => {
    try {
      // Dynamically decide the backend URL based on the provider (Google, LinkedIn, etc.)
      const url = provider === "google"
        ? `${API_KEY}/auth/callback?code=${code}`
        : provider === "linkedin"
        ? `${API_KEY}/auth/linkedin/callback?code=${code}`
        : null;

      if (!url) {
        throw new Error("Invalid provider");
      }

      const response = await axios.get(url);

      if (response.status === 200) {
        window.localStorage.setItem("token", response?.data?.token);
        navigate("/outreach");  // Redirect to the desired route
      } else {
        console.error("Error fetching data from backend:", response);
      }
    } catch (error) {
      console.error("Error during callback:", error);
      // Optionally handle error, like showing an alert or navigating to an error page
    }
  };

  useEffect(() => {
    if (code && provider) {
      callback(); // Trigger the callback function when both code and provider are available
    }
  }, [code, provider]);

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
