import "./style.css";
import Button from "../../components/button/component";
import { useNavigate } from "react-router";
import axios from "axios";
import API_KEY from "../../../key.js";

export default function LandingAuth() {
  const navigate = useNavigate();
  const fetchGoogleUrl = async () => {
    const response = await axios.get(API_KEY + "/auth/oauth").catch((e) => e.response);
    if (response.status == 200) {
      console.log(response?.data?.msg);
      window.location.href = response.data.msg;
    }
  };

  // New function for Apple authentication (placeholder)
  const fetchAppleUrl = async () => {
    // This would be implemented similar to Google auth
    console.log("Apple authentication requested");
    // Placeholder for actual implementation
  };

  return (
    <div className="container">
      <div className="section">
        <p className="title">Join today.</p>
        <div className="wrapper">
          <Button
            context={"Sign up with Google"}
            theme="dark"
            callback={() => fetchGoogleUrl()}
          />
          
          <Button
            context={"Sign up with Apple"}
            theme="dark"
            callback={() => fetchAppleUrl()}
          />
          
          <div className="separator">
            <div className="line"></div>
            <p className="sub">or</p>
            <div className="line"></div>
          </div>
          
          <Button
            context={"Create account"}
            theme="light"
            callback={() => {
              navigate("/signup");
            }}
          />
          
          <p className="cnd">
            By signing up, you agree to the Terms of Service and
            Privacy Policy, including Cookie Use.
          </p>

          <p className="subhead">Already have an account?</p>
          
          <Button
            context={"Log in"}
            theme="dark"
            callback={() => {
              navigate("/signin");
            }}
          />
        </div>
      </div>
    </div>
  );
}