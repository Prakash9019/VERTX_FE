import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router";
import {Chat_key} from "../../../key";
import { ArrowLeft, Heart } from "lucide-react"
import GeneralInbox from "./GeneralInbox";
const socket = io("https://chat.govertx.com", {
  transports: ["websocket", "polling"],
  withCredentials: true
});


const RequestInbox = ({ userId }) => {
  const navigate =useNavigate()
  const [requests, setRequests] = useState([]);
  const [connections, setConnections] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  //  const [userId , setUserId ] = useState("")
  const [isConnected, setIsConnected] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  
     useEffect(() => {
        const fetchMessages = async () => {
          try {
            const res = await axios.get(
              `${Chat_key}/api/messages/${userId}/${activeChat}`
            );
            console.log(res.data)
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
    // handleUser();
    fetchRequests();
    // fetchConnections();
    socket.emit("joinRoom", { userId });

    socket.on("receiveRequest", ({ senderId }) => {
      fetchRequests();
    });

    socket.on("receiveMessage", (message) => {
      if (message.senderId === activeChat) {
        setMessages((prev) => [...prev, message]);
      }
    });
  }, [userId, activeChat]);

  const fetchRequests = async () => {
    const res = await axios.get(`${Chat_key}/api/connections/requests/${userId}`);
    // console.log(res.data)
    setRequests(res.data);
  };

  const acceptRequest = async (senderId) => {
    await axios.post(`${Chat_key}/api/connections/accept`, { senderId, receiverId: userId });
    setDetailSidebarOpen(false);
    fetchRequests();
  };
  const [detailSidebarOpen, setDetailSidebarOpen] = useState(false)
  const rejectRequest = async (senderId) => {
    await axios.post(`${Chat_key}/api/connections/reject`, { senderId, receiverId: userId });
    fetchRequests();
  };

  // const sendMessage = async () => {
  //   if (!newMessage.trim()) return;
  //   const messageData = { senderId: userId, receiverId: activeChat, message: newMessage };
  //   socket.emit("sendMessage", messageData);
  //   setMessages((prev) => [...prev, messageData]);
  //   setNewMessage("");
  // };
  
  const [isChatActive, setIsChatActive] = useState(false);

  const sendMessage = async () => {
    if (text.trim()) {
      const newMessage = {
        senderId: userId,
        receiverId: activeChat,
        senderName: user.firstName, // include sender's name
        message: newMessage,
        createdAt: new Date().toISOString(),
        isRead: false,
      };
      setMessages((prev) => [...prev, newMessage]);
      socket.emit("sendMessage", newMessage);
      await axios.post(`${Chat_key}/api/messages`, newMessage);
      // console.log("Send Message");
      // console.log(newMessage);
      setNewMessage("");
    }
  };

  useEffect(() => {
    //activate the chat
    if (activeChat) {
      const unreadMessages = messages.filter(
        (msg) => msg.senderId === activeChat && !msg.isRead
      );
      // console.log("isChatActive");
      // console.log(unreadMessages);
      if (unreadMessages.length > 0) {
        axios
          .put(`${Chat_key}/api/messages/read`, {
            senderId: activeChat,
            receiverId: userId,
          })
          .then(() => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.senderId === activeChat ? { ...msg, isRead: true } : msg
              )
            );
          })
          .catch((err) =>
            console.error("Error marking messages as read:", err)
          );
      }
    }
  }, [messages,  activeChat, userId]);

  useEffect(() => {
    const handleReadUpdate = (data) => {
      if (userId === data.senderId) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.senderId === userId && msg.receiverId === data.receiverId
              ? { ...msg, isRead: true }
              : msg
          )
        );
      }
    };
    socket.on("messagesReadUpdated", handleReadUpdate);
    return () => {
      socket.off("messagesReadUpdated", handleReadUpdate);
    };
  }, [messages,userId,activeChat]);

            useEffect(() => {
                // console.log("handleReceived")
                const handleReceiveMessage = (message) => {
                if (message.receiverId === userId) {
                    setMessages((prev) => {
                    if (
                        prev.find(
                        (m) =>
                            m.createdAt === message.createdAt &&
                            m.senderId === message.senderId
                        )
                    ) {
                        return prev;
                    }
                    return [...prev, message];
                    });
                    if (message.senderId !== activeChat) {
                    alert(`New message from ${message.senderName}!`);
                    }
                }
                };
                socket.on("receiveMessage", handleReceiveMessage);
                return () => {
                socket.off("receiveMessage", handleReceiveMessage);
                };
            }, [userId, activeChat,isConnected,messages]);

            const handleMessageClick = (message) => {
              setSelectedMessage(message)
              setDetailSidebarOpen(true)
              setIsConnected(true);
            }
          
            const handleBackClick = () => {
              setDetailSidebarOpen(false)
              // setSelectedMessage(null)
            }

  return (
    
    // <div className="flex h-screen bg-black">
    //   {/* Sidebar - Requests & Connections */}
    //   <div className="w-1/3 bg-black p-4 border-r">
    //     <h2 className="font-bold text-lg">Friend Requests</h2>
    //     {requests.map((req) => (
    //       <div key={req.senderId} className="flex justify-between items-center p-2 bg-black my-2 rounded">
    //         <span>{req.senderId.username}</span>
    //         <div>
    //           <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => acceptRequest(req.senderId._id)}>Accept</button>
    //           <button className="bg-red-500 text-white px-2 py-1 rounded ml-2" onClick={() => rejectRequest(req.senderId._id)}>Reject</button>
    //         </div>
    //       </div>
    //     ))}
    //     <h2 className="font-bold text-lg mt-4">Connections</h2>
    //     {connections.map((conn) => (
    //       <div key={conn._id} className="p-2 bg-black my-2 rounded cursor-pointer" onClick={() => {setActiveChat(conn._id); setIsConnected(true);}}>
    //         {conn.username}
    //       </div>
    //     ))}
    //   </div>
      
    //   {/* Chat Window */}
    //   <div className="w-2/3 flex flex-col bg-black">
    //     {activeChat ? (
    //       <>
    //         <div className="flex-1 p-4 overflow-y-auto">
    //           {messages.map((msg, index) => (
    //             <div key={index} className={`p-2 my-2 ${msg.senderId === userId ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black"} rounded w-fit`}>{msg.message}</div>
    //           ))}
    //         </div>
    //         <div className="p-4 border-t flex bg-black">
    //           <input className="flex-1 p-2 border bg-black" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
    //           <button className="bg-blue-500 text-white px-4" onClick={sendMessage}>Send</button>
    //         </div>
    //       </>
    //     ) : (
    //       <div className="flex items-center justify-center flex-1 text-gray-500">Select a connection to chat</div>
    //     )}
    //   </div>
    // </div>
    <div className="flex h-full">
  
    <div className={`flex-grow bg-black p-4 ${detailSidebarOpen ? "hidden md:block" : "block"}`} style={{ borderRadius: "10px" }}>
      {requests.length>0  ? requests.map((message) => (
        <div
        key={message._id}
          className="flex items-center p-4 rounded-lg mb-4 cursor-pointer hover:bg-gray-800 transition-colors"
          onClick={() => handleMessageClick(message)}
        >

          <div className="flex items-center flex-1">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
            {message.user?.avatar?  <img src={message.user.avatar || "/placeholder.svg"} alt={message.firstName} className="w-full h-full object-cover" /> :
                  <svg
                  className="w-full h-full object-cover"
                  viewBox="0 0 469 469"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="234.5"
                    cy="234.5"
                    r="234.5"
                    fill="#111111"
                  />
                  <circle
                    cx="234.5"
                    cy="217.5"
                    r="91"
                    fill="#EEEEEE"
                    fillOpacity="0.93"
                  />
                  <path
                    d="M379.86 417.556C339.877 449.371 289.26 468.37 234.186 468.37C179.112 468.37 128.496 449.371 88.5095 417.556C117.79 374.542 172.07 345.654 234.186 345.654C296.302 345.654 350.587 374.535 379.86 417.556Z"
                    fill="#EEEEEE"
                    fillOpacity="0.933333"
                  />
                </svg>
                 
              }
            </div>
            <div>
              <h3 className="font-medium text-sm">{message.user?.firstName + "   " +message.user?.lastName}</h3>
            </div>
          </div>
          <div className="flex items-center justify-center flex-1">
            <span className="bg-black text-xs px-3 py-1 rounded-full border border-[#757575] border-opacity-25">Requested</span>
          </div>
          <div className="flex-1 text-right">
            <span className="text-xs text-white">{message?.createdAt}</span>
          </div>
        </div>
      )) :  
      
      <div className="flex-grow -mt-7 bg-black rounded-lg p-2" style={{ height: '500px', borderRadius: '10px' }}>
      <div className="flex flex-col items-center justify-center h-full">
      <p className="text-gray-400 text-center">No messages found. All message requests you receive to connect will appear here.</p>
      <p className='text-white font-bold mt-2'> Connect Now</p>
    </div> 
    </div> }
    </div>

    {/* Detail Sidebar */}
    {detailSidebarOpen && selectedMessage && (
      <div className="fixed top-0 right-0 h-full w-full md:w-1/3 bg-black border-l border-[#1E1E1E] z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-[#1E1E1E] flex items-center">
            <button onClick={handleBackClick} className="p-2 rounded-full hover:bg-gray-800 mr-2">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-medium">Request Received</h2>
          </div>

          <div className="flex-grow overflow-y-auto p-4">
            <div className="flex justify-center mb-4">
              <div className="bg-[#1E1E1E] rounded-lg px-3 py-1 inline-block">
                <span className="text-xs text-white font-bold">Today</span>
              </div>
            </div>

            <div className="flex mb-4">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                <img src={selectedMessage.user.avatar || "/placeholder.svg"} alt={selectedMessage.user.sender} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex justify-between mb-1">
                  <div className="p-3">
                    <p className="text-sm">{selectedMessage.newMessage[0].text}</p>
                  </div>
                  <div className="self-end">
                    <span className="text-xs text-white">{selectedMessage.newMessage[0].time}</span>
                  </div>
                </div>
                
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-[#1E1E1E]">
            <p className="mb-4 text-sm">{selectedMessage.user.firstName + "   " +selectedMessage.user.lastName} sent you a connection request. Do you want to accept it?</p>
            <div className="flex space-x-4">
              <button onClick={() => acceptRequest(selectedMessage.senderId)} className="flex-1 bg-white text-black py-3 rounded-lg font-extrabold">Accept</button>
              <button className="flex-1 bg-[#1E1E1E] text-white py-3 rounded-lg font-extrabold">Accept only message</button>
            </div>
          </div>
        </div>


      </div>
    )}




  
  </div>
  );
};

export default RequestInbox;
