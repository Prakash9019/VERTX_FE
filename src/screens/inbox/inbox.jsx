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
        const response = await fetch(`${API_KEY}/list/users/inbox`, {
          method: "GET",
          headers: { token: localStorage.getItem("token") },
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

        {/* Detail Sidebar for Requests */}
        {/* {activeTab === "requests" && (
          <div
            className={`fixed top-0 right-0 h-full w-full md:w-1/3 bg-black border-l border-[#1E1E1E] z-50 transform transition-transform duration-300 ease-in-out ${
              detailSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {selectedMessage && (
              <div className="flex flex-col h-full">
                
                <div className="p-4 border-b border-[#1E1E1E] flex items-center">
                  <button onClick={handleBackClick} className="p-2 rounded-full hover:bg-gray-800 mr-2">
                    <ArrowLeft size={20} />
                  </button>
                  <h2 className="text-xl font-medium">Request recieved</h2>
                </div>

               
                <div className="flex-grow overflow-y-auto p-4">
                  <div className="flex justify-center mb-4">
                    <div className="bg-[#1E1E1E] rounded-lg px-3 py-1 inline-block">
                      <span className="text-xs text-white font-bold">Today</span>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                      <img
                        src={selectedMessage.avatar || "/placeholder.svg"}
                        alt={selectedMessage.sender}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between mb-1">
                        <div className="p-3">
                          <p className="text-sm">{selectedMessage.message}</p>
                        </div>
                        <div className="self-end">
                          <span className="text-xs text-white">{selectedMessage.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Heart size={14} className="text-[#E3E3E3] mr-1" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-[#1E1E1E]">
                  <p className="mb-4 text-sm">
                    Praneeth sent you a connection request. Do you want to accept his request?
                  </p>
                  <div className="flex space-x-4">
                    <button className="flex-1 bg-white text-black py-3 rounded-lg font-extrabold">Accept</button>
                    <button className="flex-1 bg-[#1E1E1E] text-white py-3 rounded-lg font-extrabold">
                      Accept only message
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )} */}

        {/* Mobile Footer */}
        {isMobile && <MobileFooter currentPage={currentPage} />}
      </div>
    </Layout>
  );
}

// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";

// const socket = io("http://localhost:5000");

// const Inbox = ({ userId }) => {
//   const [users, setUsers] = useState([]);
//   const [currentUserIndex, setCurrentUserIndex] = useState(0);
//   const [marked, setMarked] = useState([]);
//   const [requested, setRequested] = useState([]);

//   useEffect(() => {
//     // Fetch users (Replace with your actual API endpoint)
//     axios.get("http://localhost:5000/users").then((res) => {
//       setUsers(res.data);
//     });

//     socket.on("markedUpdate", ({ userId, markedUserId }) => {
//       if (userId === userId) {
//         setMarked((prev) => [...prev, markedUserId]);
//       }
//     });

//     socket.on("connectionRequest", ({ userId, connectUserId }) => {
//       if (connectUserId === userId) {
//         setRequested((prev) => [...prev, userId]);
//       }
//     });

//     return () => {
//       socket.off("markedUpdate");
//       socket.off("connectionRequest");
//     };
//   }, []);

//   const handleMark = async () => {
//     const markedUserId = users[currentUserIndex]?._id;
//     if (!markedUserId) return;

//     await axios.post("http://localhost:5000/mark", { userId, markedUserId });

//     setMarked([...marked, markedUserId]);
//   };

//   const handleConnect = async () => {
//     const connectUserId = users[currentUserIndex]?._id;
//     if (!connectUserId) return;

//     await axios.post("http://localhost:5000/connect", { userId, connectUserId });

//     setRequested([...requested, connectUserId]);
//   };

//   const handleSkip = () => {
//     setCurrentUserIndex((prev) => (prev + 1) % users.length);
//   };

//   return (
//     <div className="p-6">
//       {users.length > 0 ? (
//         <div className="border p-4 rounded-lg shadow-md">
//           <img src={users[currentUserIndex]?.profilePic} alt="Profile" className="w-24 h-24 rounded-full" />
//           <h3 className="text-lg font-bold">{users[currentUserIndex]?.name}</h3>
//         </div>
//       ) : (
//         <p>No users found</p>
//       )}

//       <div className="flex mt-4">
//         <button className="bg-black text-white px-4 py-2 rounded" onClick={handleMark}>Mark</button>
//         <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2" onClick={handleConnect}>Connect</button>
//         <button className="bg-gray-500 text-white px-4 py-2 rounded ml-2" onClick={handleSkip}>Skip</button>
//       </div>

//       <div className="mt-4">
//         <h4 className="text-xl font-bold">Marked Users:</h4>
//         {marked.map((id) => (
//           <p key={id}>{id}</p>
//         ))}
//       </div>

//       <div className="mt-4">
//         <h4 className="text-xl font-bold">Requested Connections:</h4>
//         {requested.map((id) => (
//           <p key={id}>{id}</p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Inbox;
