import "./style.css";
import FlowNav from "../../components/flowNavigation/component";
import logo from "../../assets/logo.png";
import axios from "axios";
import { useState, useRef } from "react";

export default function Docflow() {
  const [prompt, setPrompt] = useState("");
  const [resp, setResp] = useState(null);
  const [load, setLoad] = useState(false);

  const uploadRef = useRef();
  const outputRef = useRef();

  const handlePromptPc = async () => {
    if (!prompt.trim()) return;
    setLoad(true);
    try {
      const response = await axios.post(
        "https://added-janka-feleka-de0cfd8c.koyeb.app/analyze-pitch",
        { pitch_text: prompt.replace(/\n/g, " ") }
      );
      setResp(response.data);
      console.log(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoad(false);
    }
  };

  const uploadFile = () => {
    uploadRef.current.click();
  };

  const uploadHandler = async () => {
    setLoad(true);
    const file = uploadRef.current.files[0];
    if (!file) {
      alert("Please select a file first!");
      setLoad(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://added-janka-feleka-de0cfd8c.koyeb.app/analyze-pdf",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResp(response.data);
      Object.keys(response.data)?.map((key) => {
        response.data[key]
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoad(false);
    }
  };


  const enhance = async() => {
    const response = await axios.post(
      "https://added-janka-feleka-de0cfd8c.koyeb.app/enhance-pitch",
      {
        pitch_text: prompt,
      },
    );
    console.log(response.data)
    setResp(response.data)
  }

  return (
    <div className="flow">
      <FlowNav />
      <div className="topbar">
        <div>
          <img src={logo} alt="Logo" className="logo" />
          <p className="title">
            VERTX DOCFLOW <span className="tag">BETA</span>
          </p>
        </div>
        <div className="btns">$5000 Credits</div>
      </div>

      <div className="chatsec mb">
        <p className="title">
          Hi, Founder ✦ <br /> How would you like to have your pitch?
        </p>
        <p className="sub">Try to upload and enhance your pitching skills</p>
        <div className="hold">
          <textarea
            placeholder="Type your Pitch or try to upload pitch ✦"
            className="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="btns">
            <input
              type="file"
              ref={uploadRef}
              className="inp"
              onChange={uploadHandler}
              hidden
            />
            <button className="upload" onClick={uploadFile}>
              <ion-icon name="add-circle-outline"></ion-icon> Attach Document
            </button>
            <button className="send" onClick={handlePromptPc}>
              {load ? <div className="load"></div> : "Prepare Pitch"}
            </button>
          </div>
        </div>

        {resp && (
          <div className="output" ref={outputRef}>
            <div className="row">
              <div className="back" onClick={() => setResp(null)}>
                <ion-icon name="arrow-back-outline"></ion-icon>
                <p className="btx">Back</p>
              </div>
              <div className="en" onClick={() => enhance()}>
                <ion-icon name="sparkles-outline"></ion-icon>
                <p className="btx">Enhance Pitch</p>
              </div>
            </div>

            {Object.keys(resp).map((key, i) => (
              <div className="wrap" key={i}>
                <p className="subtitle">
                  <span>✧</span> {key?.toString().replace("_", " ")} :{" "}
                  {key === "Overall Score" ? (
                    <div className="level">
                      <div
                        className="bar"
                        style={{ width: resp[key] + "%" || 0 }}
                      ></div>
                    </div>
                  ) : (
                    <ul className="list">
                      {Array.isArray(resp[key]) ? (
                        resp[key].map((item, j) => (
                          <li
                            className="item"
                            key={j}
                            style={{ animationDelay: j * 0.1 + "s" }}
                          >
                            {item}
                          </li>
                        ))
                      ) : typeof resp[key] !== "object" ? (
                        <li
                          className="item"
                          style={{ animationDelay: i * 0.1 + "s" }}
                        >
                          {resp[key]}
                        </li>
                      ) : (
                        Object.keys(resp[key]).map((subkey, j) => (
                          <li
                            className="item"
                            key={j}
                            style={{ animationDelay: j * 0.1 + "s" }}
                          >
                            {resp[key][subkey]}
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="chatspace">
        {resp ? (
          <div className="output">
            <div className="row">
              <div className="back" onClick={() => setResp(null)}>
                <ion-icon name="arrow-back-outline"></ion-icon>
                <p className="btx">Back</p>
              </div>
              <div className="en">
                <ion-icon name="sparkles-outline"></ion-icon>
                <p className="btx">Enhance Pitch</p>
              </div>
            </div>
            {Object.keys(resp).map((key, i) => (
              <div className="wrap" key={i}>
                <p className="subtitle">
                  <span>✧</span> {key} :{" "}
                  {key === "Overall Score" ? (
                    <div className="level">
                      <div
                        className="bar"
                        style={{ width: resp[key] + "%" || 0 }}
                      ></div>
                    </div>
                  ) : (
                    <ul className="list">
                      {Array.isArray(resp[key]) ? (
                        resp[key].map((item, j) => (
                          <li
                            className="item"
                            key={j}
                            style={{ animationDelay: j * 0.1 + "s" }}
                          >
                            {item}
                          </li>
                        ))
                      ) : typeof resp[key] !== "object" ? (
                        <li
                          className="item"
                          style={{ animationDelay: i * 0.1 + "s" }}
                        >
                          {resp[key]}
                        </li>
                      ) : (
                        Object.keys(resp[key]).map((subkey, j) => (
                          <li
                            className="item"
                            key={j}
                            style={{ animationDelay: j * 0.1 + "s" }}
                          >
                            {resp[key][subkey]}
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="dat">
            <p className="main">Hello Sidhardh!</p>
            <p className="mainsub">
              Welcome to DocFlow, enhance your pitch skills and unlock more
              opportunities
            </p>
          </div>
        )}

        <div className="float">
          <input
            type="text"
            placeholder="Give me your pitch, I'll enhance it."
            className="inp"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="btn" onClick={handlePromptPc}>
            <ion-icon name="send"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
}
