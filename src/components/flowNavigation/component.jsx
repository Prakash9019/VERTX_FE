import { useEffect, useState } from "react";
import {useLocation} from "react-router"
import "./style.css";
import Button from "../button/component"
import { useNavigate } from "react-router";

export default function FlowNav() {
  const flowmenu = ["Match Flow", "Outbound", "Pipeline"];
  const [state, setState] = useState(false);

  const navigate = useNavigate();
  const url = ((useLocation()).pathname.split("/").pop())?.replace("%20", " ");
  
  console.log(url)

  useEffect(() => {
    setState(true);
    setTimeout(() => {
      setState(false)
    }, 2000)
  }, [])

  return (
    <div className={state ? "flownav open" : "flownav close"}>
      <button className="trg" onClick={() => setState(!state)}>
        <ion-icon name="caret-back-outline"></ion-icon>
      </button>
      <p className="title">VERTX FLOW</p>
      <div className="menu">
        <button
          style={{
            height: 30,
            display: "flex",
            gap: 10,
            color: "white",
            fontFamily: "Manrope",
            fontSize: 13,
            fontWeight: 700,
            color: "#b2b2b2",
            border: "none",
            background: "transparent"
          }}
          onClick={() => navigate("/explore")}
        >
          <ion-icon name="chevron-back-outline" style={{fontSize: 18}}></ion-icon>
          Vertx Main
        </button>
        <p className="link" style={{ marginTop: 20 }}>
          Main Flow
        </p>
        {flowmenu?.map((item, i) => (
          <div className={item.toLowerCase() == url ? "item sel" : "item"}>
            <a href={`/flow/${item.toLowerCase()}`}>
              <div className="f1">
                <div className="circle">
                  {item.toLowerCase() == url ? "✦" : i + 1}
                </div>
                <div className="mitem">
                  <p className="i">{item}</p>
                </div>
              </div>
            </a>
            {i + 1 == flowmenu.length ? null : (
              <div className="f2">
                <div className="line"></div>
              </div>
            )}
          </div>
        ))}
        <p className="link">Others</p>
        <a href="/flow/docflow">
          <div className="nitem">
            <ion-icon name="document-outline"></ion-icon>
            <p className="i">Doc Flow</p>
          </div>
        </a>
        <a href="/">
          <div className="nitem">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 16.5V15C2.075 15 2.64375 14.9625 3.20625 14.8875C3.76875 14.8125 4.31875 14.675 4.85625 14.475C4.28125 14.1875 3.82812 13.7719 3.49688 13.2281C3.16563 12.6844 3 12.0938 3 11.4563V9.75H6V7.5H8.53125L6.075 2.5875L7.425 1.9125L9.88125 6.825C10.1313 7.325 10.1125 7.8125 9.825 8.2875C9.5375 8.7625 9.1125 9 8.55 9H7.5V9.75C7.5 10.1625 7.35313 10.5156 7.05938 10.8094C6.76562 11.1031 6.4125 11.25 6 11.25H4.5V11.4563C4.5 11.8938 4.63438 12.2781 4.90313 12.6094C5.17188 12.9406 5.5125 13.1625 5.925 13.275L6.15 13.3313C6.65 13.4563 6.93125 13.7688 6.99375 14.2688C7.05625 14.7688 6.8625 15.1438 6.4125 15.3938C5.6625 15.8063 4.87188 16.0938 4.04063 16.2563C3.20938 16.4188 2.3625 16.5 1.5 16.5ZM12.225 14.3625L11.1562 13.3125C11.4188 13.05 11.625 12.7469 11.775 12.4031C11.925 12.0594 12 11.6875 12 11.2875C12 10.8875 11.925 10.5156 11.775 10.1719C11.625 9.82813 11.4188 9.525 11.1562 9.2625L12.225 8.19375C12.625 8.59375 12.9375 9.05938 13.1625 9.59063C13.3875 10.1219 13.5 10.6875 13.5 11.2875C13.5 11.8875 13.3875 12.45 13.1625 12.975C12.9375 13.5 12.625 13.9625 12.225 14.3625ZM14.3438 16.5L13.275 15.4313C13.8125 14.8938 14.2344 14.2719 14.5406 13.5656C14.8469 12.8594 15 12.1 15 11.2875C15 10.4625 14.8469 9.7 14.5406 9C14.2344 8.3 13.8125 7.68125 13.275 7.14375L14.3438 6.075C15.0188 6.75 15.5469 7.53125 15.9281 8.41875C16.3094 9.30625 16.5 10.2625 16.5 11.2875C16.5 12.3 16.3094 13.2531 15.9281 14.1469C15.5469 15.0406 15.0188 15.825 14.3438 16.5Z"
                fill="#929292"
              />
            </svg>
            <p className="i">Pitch Deck</p>
          </div>
        </a>
        <a href="/">
          <div className="nitem">
            <ion-icon name="build-outline"></ion-icon>
            <p className="i">Resources</p>
          </div>
        </a>
        <div className="creds">$5000 Credits</div>
      </div>
    </div>
  );
}
