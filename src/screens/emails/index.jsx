import "./style.css";
import Navigation from "../../components/navigation/component";
import logo from "../../assets/logo.png";
import templates from "./templates.json";
import { useRef, useState } from "react";
import Button from "../../components/button/component";
import { useNavigate } from "react-router";
import FlowNav from "../../components/flowNavigation/component"
import { useEffect } from "react";

export default function GenerateEmail() {
  const [template, setTemplate] = useState();
  const [type, setType] = useState("BUSSINESS")
  const navigate = useNavigate();
  const editRef = useRef();

  const styleText = (style) => {
    console.log(style)
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (editRef.current.contains(range.commonAncestorContainer)) {
          const span = document.createElement("span");
          style == "bold"
            ? (span.style.fontWeight = "bold")
            : style == "underline"
            ? (span.style.textDecoration = "underline")
            : (span.style.fontStyle = "italic")
            
          range.surroundContents(span);
        }
      }
    }
  };

  useEffect(() => {
    console.log(template)
    editRef.current.innerText = template?.body  || "";
  }, [template])

  return (
    <div className="emailCont">
      <FlowNav />
      <div className="topbar">
        <div>
          <img src={logo} alt="" className="logo" />
          <p className="title">VERTX EMAILS</p>
        </div>
        <div className="btns">$5000 Credits</div>
      </div>
      <div className="sections">
        <div className="templates">
          <p className="ttitle">Select your template</p>
          {/* card start */}

          {templates?.map((temp, i) => (
            <div>
              <div className="type">{temp.varient}</div>
              <div className="template">
                <p className="subject">
                  <span>Subject:</span> {temp.subject}
                </p>
                <div className="subject desc">
                  I hope this email finds you well. I wanted to reach out to
                  introduce you to TechStartup Inc., an AI infrastructure
                  company that I founded and lead as CEO...
                </div>
                <div className="filter">
                  <button className="sel" onClick={() => setTemplate(temp)}>
                    Use this Template
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* card end */}
          {/* <div>
            <div className="type">METRICS</div>
            <div className="template">
              <p className="subject">
                <span>Subject:</span> Exciting AI/ML Startup with Strong
                Traction and 15% MoM Growth
              </p>
              <div className="subject desc">
                I hope this email finds you well. I wanted to introduce you to
                TechStartup Inc., an AI/ML company that's revolutionizing the
                way businesses approach infrastructure...
              </div>
              <div className="filter">
                <button className="sel">Use this Template</button>
              </div>
            </div>
          </div>
          <div>
            <div className="type">VISION</div>
            <div className="template">
              <p className="subject">
                <span>Subject:</span> Pioneering the Future of AI Infrastructure
                with TechStartup Inc.
              </p>
              <div className="subject desc">
                I hope this email finds you well. I am John Doe, founder and CEO
                of TechStartup Inc., a Seed-stage company specializing in AI/ML
                infrastructure. Our mission is to revolutionize...
              </div>
              <div className="filter">
                <button className="sel">Use this Template</button>
              </div>
            </div>
          </div> */}
        </div>
        <div className="cs">
          <div className="editor">
            <div className="enav">
              <p className="selTitle">{template?.varient}</p>
              <button className="cls">
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>
            <div className="area">
              <input
                type="text"
                className="fm"
                placeholder="From: test@test.com"
              />
              <input
                type="text"
                className="fm"
                placeholder="To: test@test.com"
              />
              <div className="body">
                <div className="set">
                  <button className="style b" onClick={() => styleText("bold")}>
                    B
                  </button>
                  <button
                    className="style i"
                    onClick={() => styleText("italic")}
                  >
                    I
                  </button>
                  <button
                    className="style u"
                    onClick={() => styleText("underline")}
                  >
                    U
                  </button>
                  <button className="style l">
                    <ion-icon name="link-outline"></ion-icon>
                  </button>
                </div>
                <div className="tarea" ref={editRef} contentEditable></div>
                <div className="float">
                  <Button
                    context={"Verify & Submit"}
                    theme={"light"}
                    callback={() => {
                      navigate("/chat");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
