import "./style.css";
import logo from "../../assets/logo.png";
import FlowNav from "../../components/flowNavigation/component";
import Button from "../../components/button/component";
import { useState } from "react";
import Input from "../../components/input/component";
import axios from "axios";
import API_KEY from "../../../key.js"
import { useEffect } from "react";
import { useNavigate } from "react-router";

function Step1({ cb }) {
  return (
    <div className="st">
      <p className="title">Founder profile details</p>
      <p className="sub">
        Sync your profile to auto-fill business details. Complete any missing
        fields manually.
      </p>
      <div className="wrap pr15">
        <Button context={"Sync Data"} theme={"light"} callback={() => cb()} />
      </div>
    </div>
  );
}


function Step2({ cb, back }) {
  const [traction, setTraction] = useState("");
  const [reqFunding, setReq] = useState("");
  const [prevFunding, setPrev] = useState("");
  const countries_list = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia (Czech Republic)",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini (fmr. 'Swaziland')",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const [countries, setCont] = useState([]);

  const [product, setProduct] = useState("");
  const [cofounders, setCofound] = useState("");
  const [contacts, setContact] = useState("");
  const [build, setBuilds] = useState("");
  const [productionStage, setStage] = useState("");
  const [description, setDescription] = useState("");
  const [presense, setPresence] = useState("");
  const [industry, setIndustry] = useState("");
  const [sectors, setSectors] = useState(""); 
  const [company, setCompany] = useState(""); 

  const [focus, setFocus] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [load, setLoad] = useState(false)

  const [resp, setResp] = useState("");

  const preload = async() => {
    const response = await axios.get(API_KEY + "/auth/founder", {headers: {token: window.localStorage.getItem("token")}}).catch((e) => e.response);
    console.log(Object.keys(response.data?.msg))
    if(response.status == 200){
      setProduct(response?.data?.msg?.product)
      setCofound(response?.data?.msg?.cofounders);
      setContact(response?.data?.msg?.contacts);
      setBuilds(response?.data?.msg?.build);
      setStage(response?.data?.msg?.productionStage);
      setDescription(response?.data?.msg?.description);
      setPresence(response?.data?.msg?.presense);
      setIndustry(response?.data?.msg?.industry);
      setSectors(response?.data?.msg?.sectors);
      setCont(response?.data?.msg?.countries);
      setCompany(response?.data?.msg?.companyname);
    }
  }

  useEffect(() => {
    preload();
  }, []);

  useEffect(() => {
    if(description != "" && sectors != ""){
      setDisabled(false)
    }else{
      setDescription(true)
    }
  }, [description, sectors])


  const startFlow = async() => {
    setLoad(true)
    const data = {
      name: "John Doe",
      description,
      company_name: company,
      verticals: sectors,
      industry,
    };
    const response = await axios.post(
      "https://clumsy-zebra-vertx-c9a7a812.koyeb.app/match/founder-to-investor", data
    ).catch((e) => e.response);
    console.log(response.data)
    if(response.status == 200){
      const resp = await axios.post(API_KEY + "/match/upload", {matches: response?.data}, {
        headers: {
          token: window.localStorage.getItem("token")
        }
      }).catch((e) => e.response).finally(() => {
        setLoad(false);
        cb();
      })
    }
  }

  return (
    <div className="st sc2">
      <div className="meta">
        <div>
          <p className="title">Founder profile details</p>
          <p className="sub">Complete missing fields manually.</p>
          <div className="wrap btns" style={{ width: "50%" }}>
            <Button context={"Back"} theme={"dark"} callback={() => back()} />
          </div>
        </div>
      </div>
      <div className="inpWrap">
        <div className="wrap" onClick={() => setFocus(false)}>
          <label className="lab">
            {" "}
            <span>✦</span> What are you building?
          </label>
          <Input
            theme={"dark2 basicDetails"}
            label={"Enter your Product Name"}
            state={product}
            setState={setProduct}
            dis={true}
          />
        </div>
        <div className="wrap" onClick={() => setFocus(false)}>
          <label className="lab">
            {" "}
            <span>✦</span> You got co-builders?
          </label>
          <Input
            theme={"dark2 basicDetails"}
            label={"Name them / enter their mails"}
            state={cofounders}
            setState={setCofound}
            dis={true}
          />
        </div>
        <div className="wrap" onClick={() => setFocus(false)}>
          <label className="lab">
            {" "}
            <span>✦</span> best contact
          </label>
          <Input
            theme={"dark2 basicDetails"}
            label={"Enter as many as possible"}
            state={contacts}
            setState={setContact}
            dis={true}
          />
        </div>
        <div className="wrap" onClick={() => setFocus(false)}>
          <label className="lab">
            {" "}
            <span>✦</span> show what you built?
          </label>
          <Input
            theme={"dark2 basicDetails"}
            label={"Web Url https://workurl.com/"}
            state={build}
            setState={setBuilds}
            dis={true}
          />
        </div>
        <div className="wrap" onClick={() => setFocus(false)}>
          <label className="lab">
            {" "}
            <span>✦</span> professional presence?
          </label>
          <Input
            theme={"dark2 basicDetails"}
            label={"Ex: Linkedin"}
            state={presense}
            setState={setPresence}
            dis={true}
          />
        </div>
        <div className="wrap" onClick={() => setFocus(false)}>
          <label className="lab">
            {" "}
            <span>✦</span> which industry your product come under?
          </label>
          <Input
            theme={"dark2 basicDetails"}
            label={"Select your industry"}
            state={industry}
            setState={setIndustry}
            dis={true}
          />
        </div>
        <div className="wrap">
          <label className="lab">Company Name</label>
          <Input
            theme={"dark2 basicDetails"}
            label={"Enter your company name"}
            state={company}
            setState={setCompany}
            dis={true}
          />
        </div>
        <div className="wrap">
          <label className="lab">best description?</label>
          <Input
            theme={"dark2"}
            label={"Enter Description"}
            state={description}
            setState={setDescription}
          />
        </div>
        <div className="wrap" onClick={() => setFocus(false)}>
          <label className="lab">sectors?</label>
          <Input
            theme={"dark2"}
            label={"Ex: AI Diagnostics, Machine Learning, Healthcare"}
            state={sectors}
            setState={setSectors}
          />
        </div>
        <div className="wrap">
          <label className="lab">Current traction</label>
          <Input
            theme={"dark2"}
            label={"Pre production Launch"}
            state={traction}
            setState={setTraction}
          />
        </div>
        <div className="wrap">
          <label className="lab">Required funding</label>
          <Input
            theme={"dark2"}
            label={"<$100K"}
            state={reqFunding}
            setState={setReq}
          />
        </div>
        <div className="wrap">
          <label className="lab">Previous funding</label>
          <Input
            theme={"dark2"}
            label={"Angel Investment"}
            state={prevFunding}
            setState={setPrev}
          />
        </div>
        <div className="wrap">
          <label className="lab">
            Choose your target countries to secure your investment
          </label>
          <div className="selectcont">
            <p className="placeholder" onClick={() => setFocus(!focus)}>
              {countries?.map((c, i) => (
                <span key={i}>{c}, </span>
              ))}
            </p>
            {focus ? (
              <div className="lst">
                {countries_list?.map((country, i) => (
                  <div className="litem" key={i}>
                    <input
                      type="checkbox"
                      id={country}
                      className="checkb"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCont([...countries, country]);
                        } else {
                          setCont(countries?.filter((c) => c != country));
                        }
                      }}
                    />
                    <label htmlFor={country} className="name">
                      {country}
                    </label>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="wrap" onClick={() => setFocus(false)}>
          <label className="lab">product stage?</label>
          <Input
            theme={"dark2"}
            label={"Product Stage"}
            state={productionStage}
            setState={setStage}
          />
        </div>
        <div className="wrap btns">
          <Button
            context={load ? <div className='loader' /> : "Proceed"}
            theme={disabled ? "light disabled" : "light"}
            callback={() => {
              disabled ? null : startFlow();
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Step3() {
  const [count, setCount] = useState(0);
  const [matches, setMatches] = useState([]);
  const [selected, setSelected] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const getMatches = async() => {
    const resp = await axios.get(API_KEY + "/match/matches", {headers: {token: window.localStorage.getItem("token")}}).catch(e => e.response);
    console.log(resp.data);
    if(resp.status == 200){
      setMatches(resp.data.msg);
    }
  };

  useEffect(() => {
    getMatches()
  }, [])


  const startPipe = async() => {
    setLoad(true)
    const resp = await axios.patch(API_KEY + "/match/update", {names: selected}, {headers: {token: window.localStorage.getItem("token")}}).catch(e => e.response).finally(() => {
      setLoad(false);
      if(response.status === 200){
        navigate("/flow/outbound")
      }
    });
    console.log(resp);
  }

  return (
    <div className="feleka">
      <div className="sections">
        <div className="data">
          <p className="title">Mark your preferred investors</p>
          <p className="sub">
            Prioritize those who see potential in you. Rank and select investors
            for targeted email outreach.
          </p>
        </div>
        <div className="valcont">
          <p className="subtitle">Investors Matched</p>
          <p className="count">✦ {count}</p>
        </div>
      </div>
      <div className="table">
        <div className="row headr">
          <p className="head">Name</p>
          <p className="head">Thesis</p>
          <p className="head">Location</p>
          <p className="head">Match Score</p>
          <p className="head"></p>
        </div>
        {matches?.map((match) => (
          <div className="row">
            <td className="data">
              <p className="tit">{match.company_name}</p>
              <p className="sub">{match.investor_type}</p>
            </td>
            <td className="data">{match.explanation}</td>
            <td className="data">{match.location}</td>
            <td className="data">
              <div className="tag ok">{match.groq_score}%</div>
            </td>
            <td className="data">
              <input
                type="checkbox"
                className="check"
                onChange={(e) => {
                  if (e.target.checked) {
                    setCount(count + 1);
                    setSelected([...selected, match.company_name]);
                  } else {
                    setSelected(
                      selected.filter((sel) => sel != match.company_name)
                    );
                    if (count <= 0) {
                      setCount(0);
                    } else {
                      setCount(count - 1);
                    }
                  }
                }}
              />
            </td>
          </div>
        ))}
      </div>
      <div className="btnwrap">
        <div className="btnl">
          <Button
            context={load ? <div className="loader"></div> : "Next"}
            theme={"light"}
            callback={() => {
              startPipe();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Matchflow() {
  const [step, setStep] = useState(window.localStorage.getItem("step") || 0);
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if(!token) navigate("/signin");
  }, [])
  return (
    <div className="mt">
      <FlowNav />
      <div className="topbar">
        <div>
          <img src={logo} alt="" className="logo" />
          <p className="title">
            VERTX MATCH FLOW <span className="tag">BETA</span>
          </p>
        </div>
        <div className="btns">$5000 Credits</div>
      </div>
      <div className="section">
        {step == 0 ? (
          <Step1 cb={() => setStep(1)} />
        ) : step == 1 ? (
          <Step2 cb={() => setStep(2)} back={() => setStep(0)} />
        ) : (
          <Step3 back={() => setStep(1)} />
        )}
      </div>
    </div>
  );
}
