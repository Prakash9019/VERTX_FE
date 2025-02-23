import { useEffect } from "react";
import { useState } from "react";
import Button from "../../components/button/component";
import Input from "../../components/input/component";
import "./style.css";
import axios from "axios";
import API_KEY from "../../../key.js";
import {useNavigate} from "react-router"

export default function Questions(){
    
    const navigate = useNavigate();

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

    const [resp, setResp] = useState("")

    const saveHandler = async() => {
        console.log(window.localStorage.getItem("token"));
        const data = {
          product,
          companyname: company,
          cofounders,
          contacts,
          build,
          productionStage, 
          description, 
          presense, 
          industry, 
          sectors,
          countries
        };

        const resp = await axios.patch(API_KEY + "/auth/update", data, {
            headers: {
                token: window.localStorage.getItem("token")
            }
        }).catch((e) => e.response);
        
        setResp(resp?.data?.msg);
        if(resp.status == 200){
            navigate("/explore")
        }
        
    }

    useEffect(() => {
        console.log(countries)
    }, [countries])

    return (
      <div className="qs">
        <div className="section">
          <div className="st sc2">
            <div className="meta">
              <div>
                <p className="title">Founder Profile details</p>
                <p className="sub">
                  Questions marked with <span style={{ color: "gold" }}>✦</span>{" "}
                  are mandatory
                </p>
              </div>
            </div>
            <div className="inpWrap">
              <div className="wrap" onClick={() => setFocus(false)}>
                <label className="lab">
                  {" "}
                  <span>✦</span> Company Name?
                </label>
                <Input
                  theme={"dark2"}
                  label={"Enter your Company name"}
                  state={company}
                  setState={setCompany}
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
                <label className="lab">
                  {" "}
                  <span>✦</span> What are you building?
                </label>
                <Input
                  theme={"dark2"}
                  label={"Enter your Product Name"}
                  state={product}
                  setState={setProduct}
                />
              </div>

              <div className="wrap" onClick={() => setFocus(false)}>
                <label className="lab">
                  {" "}
                  <span>✦</span> You got co-builders? (separated by commas)
                </label>
                <Input
                  theme={"dark2"}
                  label={"Name them. Ex: Vinod, Sasi.."}
                  state={cofounders}
                  setState={setCofound}
                />
              </div>
              <div className="wrap" onClick={() => setFocus(false)}>
                <label className="lab">
                  {" "}
                  <span>✦</span> best contact (separated by commas)
                </label>
                <Input
                  theme={"dark2"}
                  label={"Enter as many as possible. Ex: Email, phone.."}
                  state={contacts}
                  setState={setContact}
                />
              </div>
              <div className="wrap" onClick={() => setFocus(false)}>
                <label className="lab">
                  {" "}
                  <span>✦</span> show what you built?
                </label>
                <Input
                  theme={"dark2"}
                  label={"Web Url https://workurl.com/"}
                  state={build}
                  setState={setBuilds}
                />
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
                <label className="lab">
                  {" "}
                  <span>✦</span> professional presence?
                </label>
                <Input
                  theme={"dark2"}
                  label={"Ex: Linkedin"}
                  state={presense}
                  setState={setPresence}
                />
              </div>
              <div className="wrap" onClick={() => setFocus(false)}>
                <label className="lab">
                  {" "}
                  <span>✦</span> which industry your product come under?
                </label>
                <Input
                  theme={"dark2"}
                  label={"Select your industry"}
                  state={industry}
                  setState={setIndustry}
                />
              </div>
              <div className="wrap" onClick={() => setFocus(false)}>
                <label className="lab">sectors?</label>
                <Input
                  theme={"dark2"}
                  label={"Enter Sectors"}
                  state={sectors}
                  setState={setSectors}
                />
              </div>
              <div className="bwrap">
                <Button
                  context={"Save Details"}
                  theme={"light"}
                  callback={() => {
                    saveHandler();
                  }}
                />
              </div>
            </div>
          </div>
          {resp ? <div className="notify">{resp}</div> : null}
        </div>
      </div>
    );
}