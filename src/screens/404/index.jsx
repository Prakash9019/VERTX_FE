import "./style.css";
import logo from "../../assets/logo.png";
import { useSearchParams, useNavigate } from "react-router";
import Button from "../../components/button/component";

export default function Nopage() {
  const navigate =useNavigate();

  return (
    <div className="auth-container">
      <div className="wrapper" style={{ width: "40%" }}>
        <img src={logo} alt="" className="logo-sn" />
        <p className="title" style={{ fontSize: "30px", marginBottom: "0px" }}>
          404, Not Found
        </p>
        <p className="sub">Page you are looking for got vanished!!</p>
        <div style={{
            width: "35%",
            marginTop: 20
        }}>
          <Button
            context={"Go Home"}
            theme={"light"}
            callback={() => {
              navigate("/explore");
            }}
          />
        </div>
      </div>
    </div>
  );
}
