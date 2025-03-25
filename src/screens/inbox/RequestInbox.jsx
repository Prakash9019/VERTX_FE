import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5001"); // Adjust for production

const RequestInbox = ({ userId }) => {
  const [requests, setRequests] = useState([]);
  const [connections, setConnections] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  

  useEffect(() => {
    fetchRequests();
    fetchConnections();
    socket.emit("joinRoom", { userId });

    socket.on("receiveRequest", ({ senderId }) => {
      fetchRequests();
    });

    socket.on("requestAccepted", ({ receiverId }) => {
      if (receiverId === userId) fetchConnections();
    });

    socket.on("receiveMessage", (message) => {
      if (message.senderId === activeChat) {
        setMessages((prev) => [...prev, message]);
      }
    });
  }, [userId, activeChat]);

  const fetchRequests = async () => {
    const res = await axios.get(`http://localhost:5001/api/connections/requests/${userId}`);
    console.log(res.data)
    setRequests(res.data);
  };

  const fetchConnections = async () => {
    console.log(userId);
    const res = await axios.get(`http://localhost:5001/api/connections/status/${userId}`);
    console.log(res.data)
    setConnections(res.data);
  };

  const acceptRequest = async (senderId) => {
    await axios.post("http://localhost:5001/api/connections/accept", { senderId, receiverId: userId });
    fetchRequests();
    fetchConnections();
  };

  const rejectRequest = async (senderId) => {
    await axios.post("http://localhost:5001/api/connections/reject", { senderId, receiverId: userId });
    fetchRequests();
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const messageData = { senderId: userId, receiverId: activeChat, message: newMessage };
    socket.emit("sendMessage", messageData);
    setMessages((prev) => [...prev, messageData]);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar - Requests & Connections */}
      <div className="w-1/3 bg-black p-4 border-r">
        <h2 className="font-bold text-lg">Friend Requests</h2>
        {requests.map((req) => (
          <div key={req.senderId} className="flex justify-between items-center p-2 bg-black my-2 rounded">
            <span>{req.senderId.username}</span>
            <div>
              <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => acceptRequest(req.senderId._id)}>Accept</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded ml-2" onClick={() => rejectRequest(req.senderId._id)}>Reject</button>
            </div>
          </div>
        ))}
        <h2 className="font-bold text-lg mt-4">Connections</h2>
        {connections.map((conn) => (
          <div key={conn._id} className="p-2 bg-black my-2 rounded cursor-pointer" onClick={() => setActiveChat(conn._id)}>
            {conn.username}
          </div>
        ))}
      </div>
      
      {/* Chat Window */}
      <div className="w-2/3 flex flex-col bg-black">
        {activeChat ? (
          <>
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className={`p-2 my-2 ${msg.senderId === userId ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black"} rounded w-fit`}>{msg.message}</div>
              ))}
            </div>
            <div className="p-4 border-t flex bg-black">
              <input className="flex-1 p-2 border bg-black" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
              <button className="bg-blue-500 text-white px-4" onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">Select a connection to chat</div>
        )}
      </div>
    </div>
  );
};

export default RequestInbox;
