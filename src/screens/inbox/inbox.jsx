import { useState, useEffect } from "react";
import { ArrowLeft, Heart, CheckCheck } from "lucide-react";
import { Layout, MobileFooter } from "../layout/bars";
import GeneralInbox from "./GeneralInbox"; // Import the new component
import MarkInbox from "./MarkInbox";
import RequestInbox from "./RequestInbox";
import API_KEY from "../../../key";

export default function Inbox() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState("inbox");
  const [activeTab, setActiveTab] = useState("general");
  const [isMobile, setIsMobile] = useState(false);
  const [detailSidebarOpen, setDetailSidebarOpen] = useState(false);
  const [connections, setConnections] = useState([]);
  const [marked, setMarked] = useState([]);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Run check immediately
    checkIsMobile();

    // Listen for resize events
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const [userId, setUserId] = useState("");
  
  useEffect(() => {
    const fetchInboxData = async () => {
      
      try {
        // handleUser();
        // console.log("Request URL:", `${API_KEY}/list/users/inbox`);

        
        const token = localStorage.getItem("token");
        console.log("Sending token:", token);

          if (!token) {
            console.error("No token found in localStorage");
            return;
          }
        const response = await fetch(`${API_KEY}/list/users/inbox`, {
          method: "GET",
          headers: { 
             Authorization: `Bearer ${token}`,
           },
        });
        const data = await response.json();

        setUserId(data.userId);
        setConnections(data.connections);
        setMarked(data.markedUsers);
      } catch (error) {
        console.error("Error fetching inbox:", error);
      }
    };
    fetchInboxData();
  }, []);

  
  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setDetailSidebarOpen(true);
  };

  const handleBackClick = () => {
    setDetailSidebarOpen(false);
    setSelectedMessage(null);
  };

  const tabs = [
    { id: "general", label: "General" },
    { id: "requests", label: "Requests" },
    { id: "marked", label: "Marked" },
  ];

  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="flex flex-col min-h-screen text-white font-['Manrope'] tracking-[-0.04em]">
        <div
          className={`${
            isMobile ? "px-4 -mt-5 pb-24 flex-grow" : "w-full px-4 mx-auto mt-2"
          } overflow-y-auto relative`}
        >
          <div className="flex flex-col h-full">
            <div className="bg-[#111] pb-6">
              <h1 className="text-4xl font-bold mb-5 mt-11  sm:mb-6 sm:mt-0 ">Inbox</h1>

              {/* Tabs */}
              <div className="flex space-x-8 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`pb-2 ${
                      activeTab === tab.id ? "text-white" : "text-[#757575]"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Show the appropriate component based on the active tab */}
            {activeTab === "general" ? (
              <GeneralInbox
                connections={connections}
                userId={userId}
                onMessageClick={handleMessageClick}
                detailSidebarOpen={detailSidebarOpen}
                setDetailSidebarOpen={setDetailSidebarOpen}
              />
            ) : activeTab === "requests" ? (
              <RequestInbox connections={connections} userId={userId} />
            ) : (
              // Marked tab content (placeholder)
              <MarkInbox marked={marked} />
            )}
          </div>
        </div>

      

        {/* Mobile Footer */}
        {isMobile && <MobileFooter currentPage={currentPage} />}
      </div>
    </Layout>
  );
}


