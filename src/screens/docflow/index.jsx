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
      // const response = await axios.post(
      //   "https://added-janka-feleka-de0cfd8c.koyeb.app/analyze-pitch",
      //   { pitch_text: prompt.replace(/\n/g, " ") }
      // );
      // setResp(response.data);
      // console.log(response.data);
      const simulatedResponse = {
        "Problem statement": ["95% of diets fail because they require people to eat less, provide unbalanced nutrition, and fail to adapt to modern fast-paced lifestyles. Mention how COVID-19 and work-from-home culture have driven people toward unhealthy fast-food options. Highlight statistics like 40.3% of Indians having a high BMI."],
        "Solution": ["OJO Life delivers freshly cooked, superfood-packed, healthy, and appetizing meal boxes directly to customers' doorsteps. Explain that the service includes pre-curated daily menus (with options like detox, weight loss, and protein boost), expert-designed by nutritionists and chefs, with easy-to-follow timetables and instructions."],
        "Unique selling points": ["Emphasize the natural ingredients, premium packaging, and the holistic approach to wellness (improving immunity, lowering stress, and boosting overall health)."],
        "Market traction and growth potential": ["Include some success metrics (like total sales in the last 6 months, current MRR, or customer testimonials) and explain the plan for scaling up operations."],
       "Overall Score": 85
      };
      setResp(simulatedResponse);
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
      // const response = await axios.post(
      //   "https://added-janka-feleka-de0cfd8c.koyeb.app/analyze-pdf",
      //   formData,
      //   {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   }
      // );
      // setResp(response.data);
      // Object.keys(response.data)?.map((key) => {
      //   response.data[key]
      // });
      const simulatedPDFResponse = {
        "Executive Summary": ["Summarizes the business concept well."],
        "Market Analysis": ["Detailed overview of target market."],
        "Financials": ["Includes revenue projections."],
        "Overall Score": 78
      };
      setResp(simulatedPDFResponse);
    } catch (e) {
      console.error(e);
    } finally {
      setLoad(false);
    }
  };


  const enhance = async() => {
    // const response = await axios.post(
    //   "https://added-janka-feleka-de0cfd8c.koyeb.app/enhance-pitch",
    //   {
    //     pitch_text: prompt,
    //   },
    // );
    // console.log(response.data)
    // setResp(response.data)

    const enhanced = {
      "Enhanced Pitch": [


        "Imagine a world where healthy eating isn’t a compromise—it’s the highlight of your day.In India, despite a booming wellness industry and an influx of diet plans, 95% of them fail. Why? Because they focus on restriction—eating less, rather than eating right.",

"Add in the fast-paced urban lifestyle, work-from-home culture, and a post-pandemic reliance on processed foods, and it’s no surprise that over 40% of Indians grapple with high BMI and related metabolic disorders.",

"At OJO Life, we’re flipping the script. We make eating healthy effortless, enjoyable, and sustainable. Our freshly cooked, superfood-rich meal boxes are delivered straight to your doorstep—each one packed with nutrition, flavor, and purpose.",

"Here’s how we’re redefining daily wellness:",

"Pre-Curated Daily Menus:"," Choose from Detox, Weight Loss, or Protein Boost plans—each tailored to meet specific health goals.",

"Expert-Designed Meals:"," Crafted by top nutritionists and culinary experts, our meals are 100% natural, balanced, and mouth-wateringly good.",

"Guided Eating Experience:"," Every box includes a clear, easy-to-follow timetable and serving instructions to eliminate the guesswork.",

"More Than a Meal:"," We focus on holistic wellness—boosting immunity, reducing stress, and building better eating habits for the long term.",

"What sets us apart?",
"Where other services fall short on taste, consistency, or motivation, we deliver an experience that our customers genuinely love—one that’s sustainable, scalable, and deeply impactful. With traction of 10,000+ meals delivered, 25% MoM growth, 85% retention, OJO Life has already proven that India is ready for a healthier, smarter way to eat. Now, we’re seeking to enhance our tech platform, and expand across major metros and tier-1 cities.",

"Because at OJO Life, we don’t just deliver meals. We deliver a lifestyle—one delicious, nutritious box at a time.",
        "We are redefining remote work by offering seamless team collaboration through a unified platform tailored for startups. Our platform stands out with built-in productivity metrics, easy onboarding, and AI-driven task automation."
      ],
      

    };
    setResp(enhanced);
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
            <p className="main">Hello Founder!</p>
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
