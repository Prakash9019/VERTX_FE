import FlowNav from "../../components/flowNavigation/component";
import "./style.css";
import logo from "../../assets/logo.png";
import API_KEY from "../../../key.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Pipeline() {
  const [resp, setResp] = useState();
  const navigate = useNavigate()

  const startFlow = async () => {
    const response = await axios
      .get(API_KEY + "/auth/founder", {
        headers: { token: window.localStorage.getItem("token") },
      })
      .catch((e) => e.response);
    const client = response?.data?.msg;
    const data = {
      description: client.description,
      company_name: client.companyname,
      verticals: client.sectors,
      industry: client.industry,
    };
    const resp = await axios
      .post(
        "https://clumsy-zebra-vertx-c9a7a812.koyeb.app/match/founder-to-founder",
        data
      )
      .catch((e) => e.response);
    console.log(resp.data);
    setResp(resp.data)
  };

  useEffect(() => {
    startFlow();
    const token = window.localStorage.getItem("token");
    if(!token){
      navigate("/signin")
    }
  }, []);

  return (
    <div className="pipeline">
      <FlowNav />
      <div className="topbar">
        <div>
          <img src={logo} alt="" className="logo" />
          <p className="title">VERTX PIPELINE</p>
          <p className="tag">BETA</p>
        </div>
        <div className="btns">$5000 Credits</div>
      </div>
      <div className="sections">
        <div className="bx">
          <div className="box mb">Vertx Pipeline</div>
        </div>
        <div className="bx">
          <div className="line"></div>
        </div>
        <div className="cards">
          {/* 1 */}
          <div className="card half st">
            <div className="horline"></div>
            <div className="vertline">
              <div className="line"></div>
            </div>
            <div className="cd">
              <div className="bx">
                <div className="box">Matched investors</div>
                <div className="incard">
                  {resp ? (
                    resp?.map((item, i) => (
                      <div className="crd" key={i}>
                        <div className="count">0{i + 1}</div>
                        <div>
                          <p className="title">{item?.matched_company}</p>
                          <p className="sub">{item?.industry}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="crd load">
                      <div className="count"></div>
                      <div>
                        <p className="title"></p>
                        <p className="sub"></p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="card lft">
            <div className="horline">
              <div className="dot schedule"></div>
              <div className="dot matched"></div>
            </div>
            <div className="vertline">
              <div className="line"></div>
            </div>
            <div className="cd">
              <div className="bx">
                <div className="box">Emails Scheduled</div>
                <div className="incard">
                  <div className="crd">
                    <div className="count">
                      <ion-icon
                        name="mail-outline"
                        style={{ fontSize: "15px" }}
                      ></ion-icon>
                    </div>
                    <div>
                      <p className="title">Mail To: Someone@gmail.com</p>
                      <p className="sub">09:03pm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 */}
          <div className="card rft">
            <div className="horline">
              <div className="dot replied"></div>
              <div className="dot followed"></div>
            </div>
            <div className="vertline">
              <div className="line"></div>
            </div>
            <div className="cd">
              <div className="bx">
                <div className="box">Replied Back</div>
                <div className="incard">
                  <div className="crd">
                    <div className="count">
                      <ion-icon
                        name="mail-outline"
                        style={{ fontSize: "15px" }}
                      ></ion-icon>
                    </div>
                    <div>
                      <p className="title">Chandra Sidhardha</p>
                      <p className="sub">Dedsec Funds</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 */}
          <div className="card half en">
            <div className="horline"></div>
            <div className="vertline">
              <div className="line"></div>
            </div>
            <div className="cd">
              <div className="bx">
                <div className="box">Follow Up</div>
                <div className="incard">
                  <div className="crd">
                    <div className="count">01</div>
                    <div>
                      <p className="title">Chandra Sidhardha</p>
                      <p className="sub">Dedsec Funds</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
