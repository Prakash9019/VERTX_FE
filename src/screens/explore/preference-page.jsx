"use client"
import { useState, useEffect } from "react";
import { Layout, MobileFooter } from "../layout/bars";
import { useNavigate } from "react-router";
import axios from "axios";
import gify from "../outreach/gify.gif";
import API_KEY from "../../../key";

export default function PreferenceSet() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState("explore");

  // User preferences state
  const [option, setOption] = useState("");
  const [availability, setAvailability] = useState("");
  const [compensation, setCompensation] = useState("");
  const [stage, setStage] = useState("");
  const [workplace, setWorkplace] = useState("");

  // **Fetch existing preferences when the component loads**
  useEffect(() => {
    const fetchPreferences = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_KEY}/request/preference`, {
          headers: { token: localStorage.getItem("token") },
        });

        if (response.status === 200 && response.data) {
          const { preference, availability, compensation, stage, workplace } = response.data?.[0];
          setOption(preference || "");
          setAvailability(availability || "");
          setCompensation(compensation || "");
          setStage(stage || "");
          setWorkplace(workplace || "");
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  // **Submit or update preferences**
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_KEY}/request/preference`,
        { preference: option, availability, compensation, stage, workplace },
        { headers: { "Content-Type": "application/json", token: localStorage.getItem("token") } }
      );

      if (response.status === 201 || response.status === 200) {
        // console.log("Preferences saved successfully:", response.data);
        navigate("/listall"); // Navigate after successful submission
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
        <img src={gify || "/placeholder.svg"} alt="Loading..." className="w-20 h-20" />
      </div>
    );
  }

  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="flex flex-col min-h-screen" style={{ letterSpacing: "-0.04em" }}>
        <div className={`${isMobile ? "px-4 mt-10 pb-24" : "px-4 mt-6"} flex-1 flex justify-center overflow-y-auto`}>
          <div className={`${isMobile ? "w-full" : "max-w-3xl w-full"}`}>
            <div className="text-left">
              <h1 className={`${isMobile ? "text-3xl" : "text-4xl"} font-bold mb-1`}>Set Preference</h1>
              <p className={`${isMobile ? "text-lg" : "text-xl"} text-[#CAC5C5] mb-4`}>
                Choose which profiles you want to explore.
              </p>
            </div>

            {/* Option Selection */}
            <div className="bg-black rounded-[2rem] p-4 md:p-6 shadow-xl border border-[#1D1C1C] w-full mt-12 mb-3">
              <h2 className="text-2xl font-bold mb-9">Choose an option</h2>
              <div className="flex flex-wrap gap-2 mb-5">
                {["founder", "co-founder", "notInterested"].map((val) => (
                  <div
                    key={val}
                    className={`rounded-full px-8 py-1 text-sm cursor-pointer ${
                      option === val ? "bg-white text-black" : "bg-transparent border border-[#757575] text-[#757575]"
                    }`}
                    onClick={() => setOption(val)}
                  >
                    {val === "founder" ? "Join a founder" : val === "co-founder" ? "Invite a co-founder" : "Just exploring"}
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences Section */}
            {option !== "notInterested" && (
              <div className="bg-black rounded-[2rem] p-4 md:p-6 shadow-xl border border-[#1D1C1C] w-full">
                <h2 className="text-2xl font-bold mb-8">Preferences</h2>

                {/* Availability */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-[#CAC5C5]">Availability</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Part-time", "Full-time", "Open"].map((val) => (
                      <div
                        key={val}
                        className={`rounded-full px-3 py-1 text-sm cursor-pointer ${
                          availability === val ? "bg-white text-black" : "bg-transparent border border-[#757575] text-[#757575]"
                        }`}
                        onClick={() => setAvailability(val)}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compensation */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-[#CAC5C5]">Compensation</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Paid", "Equity", "Volunteer", "Open"].map((val) => (
                      <div
                        key={val}
                        className={`rounded-full px-3 py-1 text-sm cursor-pointer ${
                          compensation === val ? "bg-white text-black" : "bg-transparent border border-[#757575] text-[#757575]"
                        }`}
                        onClick={() => setCompensation(val)}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stage */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-[#CAC5C5]">Stage</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Idea", "Prototype", "Revenue", "Scale"].map((val) => (
                      <div
                        key={val}
                        className={`rounded-full px-3 py-1 text-sm cursor-pointer ${
                          stage === val ? "bg-white text-black" : "bg-transparent border border-[#757575] text-[#757575]"
                        }`}
                        onClick={() => setStage(val)}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6 mb-8 sm:mb-0 w-full">
              <button className="bg-[#1D1C1C] text-white font-bold py-2 px-8 rounded-[10px] text-lg w-[32%]" onClick={() => navigate(-1)}>
                Back
              </button>
              <button className="bg-white text-black font-bold py-2.5 px-8 rounded-[10px] text-lg w-[64%]" onClick={handleSubmit}>
                Continue
              </button>
            </div>
          </div>
        </div>
        {isMobile && <MobileFooter currentPage={currentPage} />}
      </div>
    </Layout>
  );
}
