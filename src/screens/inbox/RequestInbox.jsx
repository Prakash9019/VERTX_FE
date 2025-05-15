import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router";
import { Chat_key } from "../../../key";
import { ArrowLeft } from "lucide-react";

const socket = io("https://chat.govertx.com", {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

const RequestInbox = ({ userId }) => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [detailSidebarOpen, setDetailSidebarOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${Chat_key}/api/messages/${userId}/${activeChat}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    if (isConnected && activeChat) {
      fetchMessages();
    }
  }, [userId, activeChat, isConnected]);

  useEffect(() => {
    fetchRequests();
    socket.emit("joinRoom", { userId });
    socket.on("receiveRequest", () => fetchRequests());
  }, [userId]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${Chat_key}/api/connections/requests/${userId}`);
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const acceptRequest = async (senderId) => {
    try {
      await axios.post(`${Chat_key}/api/connections/accept`, { senderId, receiverId: userId });
      setDetailSidebarOpen(false);
      fetchRequests();
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setDetailSidebarOpen(true);
    setIsConnected(true);
  };

  const handleBackClick = () => {
    setDetailSidebarOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <div className={`flex-grow bg-black p-4 overflow-y-auto md:w-2/3 ${detailSidebarOpen ? "hidden md:block" : "block"}`}> 
        {requests.length > 0 ? (
          requests.map((message) => (
            <div
              key={message._id}
              className="flex items-center p-4 rounded-lg mb-4 cursor-pointer hover:bg-gray-800 transition-colors border border-gray-700"
              onClick={() => handleMessageClick(message)}
            >
              <div className="flex items-center flex-1">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                  {message.user?.avatar ? (
                    <img src={message.user.avatar} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-700 rounded-full" />
                  )}
                </div>
                <h3 className="font-medium text-sm text-white">{message.user?.firstName} {message.user?.lastName}</h3>
              </div>
              <div className="flex justify-center flex-1">
                <span className="bg-black text-xs px-3 py-1 rounded-full border border-gray-600">Requested</span>
              </div>
              <div className="flex-1 text-right">
                <span className="text-xs text-white">{message?.createdAt}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">No requests found.</div>
        )}
      </div>

      {detailSidebarOpen && selectedMessage && (
        <div className="fixed top-0 right-0 h-full w-full md:w-1/3 bg-black border-l border-gray-800 z-50">
          <div className="flex flex-col h-full">
            <div className="flex items-center p-4 border-b border-gray-800">
              <button onClick={handleBackClick} className="p-2 rounded-full hover:bg-gray-800">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-medium text-white ml-2">Request Received</h2>
            </div>
            <div className="flex-grow overflow-y-auto p-4">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img src={selectedMessage.user.avatar || "/placeholder.svg"} alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{selectedMessage.user.firstName} {selectedMessage.user.lastName}</h3>
                  <p className="text-gray-400 text-xs">Wants to connect with you</p>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-sm text-white">
                <p>{selectedMessage.newMessage?.[0]?.text || "No message content"}</p>
                <span className="text-xs text-gray-400 float-right mt-2">{selectedMessage.newMessage?.[0]?.time}</span>
              </div>
            </div>
            <div className="p-4 border-t border-gray-800">
              <div className="flex space-x-4">
                <button
                  onClick={() => acceptRequest(selectedMessage.senderId)}
                  className="flex-1 bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-200"
                >
                  Accept
                </button>
                <button
                  className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-bold hover:bg-gray-700"
                >
                  Accept only message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestInbox;
