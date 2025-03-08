import "./style.css";
import logo from "../../assets/logo.png";
import Button from "../../components/button/component";
import {useNavigate} from "react-router"
import Navigation from "../../components/navigation/component";
import { useEffect, useState } from "react";
import axios from "axios";
import API_KEY from "../../../key.js";
import { Header,Sidebar } from "../layout/bars.jsx";

export default function Explore(){
  const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const [openNav, setNav] = useState(false);
    const [founders, setFounders] = useState([]);
    const [finalData, setFinalData] = useState([]);

    const [prompt, setPrompt] = useState("")

    const startFlow = async () => {
      const response = await axios.get(API_KEY + "/auth/founder", {
        headers: {token: localStorage.getItem("token")}
      }).catch((e) => e.response);
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
      setFounders(resp.data)
      setFinalData(resp.data)
    };

    useEffect(() => {
      startFlow()
    }, []);

    useEffect(() => {
      if(prompt.length > 0 && finalData.length > 0){
        setFinalData(
          finalData?.map((item) => {
            if (
              item?.matched_company.toLowerCase().includes(prompt.toLowerCase())
            ) {
              return item;
            }
          })
        );
      }else{
        setFinalData(founders)
      }

    }, [prompt])


    return (
         <div className="min-h-screen bg-black text-white flex flex-col">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex flex-1 relative">
              <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
              <main className={`flex-1 p-3 pt-20 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-24"}`}>   
      <div className="container-ot-exp">
        
        <div className="bottom" style={{ height: "100%" }}>
         
          <div className="esection">
            <div className="anim">
              <p className="head">✴ Find your Co Founder ✴</p>
              <p className="sub">
                Match with the right co-founder tailored to your unique business
                requirements through the Vertx platform
              </p>
           
              <div className="ftcards">
                {founders && founders.length > 0 ? (
                  finalData ? (
                    finalData?.map((founder) => (
                      <div className="card">
                        <p className="title">{founder?.matched_company}</p>
                        <p className="subt">{founder?.industry}</p>
                        <p className="desc">{founder?.explanation}</p>
                      </div>
                    ))
                  ) : (
                    <>
                      <div
                        className="card loading"
                        style={{ animationDelay: "0.5s" }}
                      >
                        <div className="title"></div>
                        <div className="subt"></div>
                        <div className="desc"></div>
                      </div>
                      <div
                        className="card loading"
                        style={{ animationDelay: "1s" }}
                      >
                        <div className="title"></div>
                        <div className="subt"></div>
                        <div className="desc"></div>
                      </div>
                      <div
                        className="card loading"
                        style={{ animationDelay: "1.5s" }}
                      >
                        <div className="title"></div>
                        <div className="subt"></div>
                        <div className="desc"></div>
                      </div>
                    </>
                  )
                ) : (
                  <>
                    <div
                      className="card loading"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <div className="title"></div>
                      <div className="subt"></div>
                      <div className="desc"></div>
                    </div>
                    <div
                      className="card loading"
                      style={{ animationDelay: "1s" }}
                    >
                      <div className="title"></div>
                      <div className="subt"></div>
                      <div className="desc"></div>
                    </div>
                    <div
                      className="card loading"
                      style={{ animationDelay: "1.5s" }}
                    >
                      <div className="title"></div>
                      <div className="subt"></div>
                      <div className="desc"></div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="cards">
              <p
                className="head"
                style={{ textAlign: "left", marginBottom: "10px" }}
              >
                News Articles
              </p>
              <div className="card">
                <div className="banner">
                  <p className="ntit">Vertx AI</p>
                </div>
                <div className="news-details">
                  <p className="description">
                    [Coming Soon]
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="banner">
                  <p className="ntit">Publications</p>
                </div>
                <div className="news-details">
                  <p className="description">
                    [Coming Soon]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </main>
      </div>
      </div>
    );
}