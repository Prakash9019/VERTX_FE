import "./style.css";
import logo from "../../assets/logo.png";
import Button from "../../components/button/component";
import {useNavigate} from "react-router";
import axios from "axios";
import API_KEY from "../../../key.js";

export default function LandingAuth(){
    const navigate = useNavigate();
    const fetchGoogleUrl = async () => {
      const response = await axios.get(API_KEY + "/auth/oauth").catch((e) => e.response);
      console.log(response?.data?.msg);
      if(response.status == 200){
        console.log(response?.data?.msg);
        window.location.href = response.data.msg;
      }
    }
    return (
      <div className="container">
        <div className="section img">
          <img src={logo} alt="" className="logo" />
        </div>
        <div className="section">
          <p className="title">Join Today.</p>
          <div className="wrapper">
            <Button
              context={"Sign in with google"}
              theme="dark"
              callback={() => fetchGoogleUrl()}
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
              By signing up, you agree to the Terms of Service and Privacy
              Policy, including Cookie Use.
            </p>

            <p className="subhead">Already having an account? </p>
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