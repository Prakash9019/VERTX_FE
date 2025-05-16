import "./style.css";
import logo from "../../assets/logo.png";
import { useSearchParams, useNavigate } from "react-router";
import Button from "../../components/button/component";
import { useCopyProtection } from "../../context/CopyProtectionContext";
import { useCopyBlocker } from "../../hooks/useCopyBlocker";
import { useEffect } from "react";

export default function Nopage() {
  const navigate = useNavigate();
  const { setIsProtected } = useCopyProtection();

  useEffect(() => {
    setIsProtected(true); //
  }, []);

  useCopyBlocker(true); // ✅ Protection enable

  return (
    <div className="auth-container">
      <div className="wrapper" style={{ width: "80%" }}>
        <img src={logo} alt="" className="logo-sn" />
        <p className="title" style={{ fontSize: "30px", marginBottom: "0px" }}>
           Not Found
        </p>
        <p className="sub">This pages are still in development</p>
        <div
          style={{
            // width: "35%",
            marginTop: 20,
          }}
        >
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
