import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5001");
import { ArrowLeft, Heart } from "lucide-react"

export default function RequestInbox({connections,user}) {
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [detailSidebarOpen, setDetailSidebarOpen] = useState(false)


  //chat code 

  const [isConnected, setIsConnected] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [text, setText] = useState("");
  const [isChatActive, setIsChatActive] = useState(true);
  const messagesRef = useRef([]);
  useEffect(() => {
    messagesRef.current = allMessages;
  }, [allMessages]);
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);
  useEffect(() => {
    if (user?._id) {
      socket.emit("joinRoom", { userId: user._id });
    }
  }, [user]);

  useEffect(() => {
    const fetchMessages = async () => {
        
      try {
        const res = await axios.get(
          `http://localhost:5001/api/messages/${user._id}/${selectedMessage._id}`
        );
        console.log("fetchmessage ");
        console.log(res.data);
        setAllMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    if (isConnected && selectedMessage) {
      fetchMessages();
    }
  }, [user, selectedMessage, isConnected]);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/connections/status/${user._id}/${selectedMessage._id}`
        );
        console.log("connections")
        console.log(res.data.connected);
        setIsConnected(res.data.connected);
      } catch (err) {
        console.error("Error checking connection:", err);
      }
    };
    if (selectedMessage) {
      checkConnection();
    }
  }, [user, selectedMessage]);

  const sendMessage = async () => {
    if (text.trim()) {
      const newMessage = {
        senderId: user._id,
        receiverId: selectedMessage._id,
        senderName: user.firstName, // include sender's name
        message: text,
        createdAt: new Date().toISOString(),
        isRead: false,
      };
      setAllMessages((prev) => [...prev, newMessage]);
      socket.emit("sendMessage", newMessage);
      await axios.post("http://localhost:5001/api/messages", newMessage);
      console.log("Send Message");
      console.log(newMessage);
      setText("");
    }
  };

  useEffect(() => {
    if (isChatActive) {
      const unreadMessages = allMessages.filter(
        (msg) => msg.senderId === selectedMessage._id && !msg.isRead
      );
      console.log("isChatActive");
      console.log(unreadMessages);
      if (unreadMessages.length > 0) {
        axios
          .put("http://localhost:5001/api/messages/read", {
            senderId: selectedMessage._id,
            receiverId: user._id,
          })
          .then(() => {
            setAllMessages((prev) =>
              prev.map((msg) =>
                msg.senderId === selectedMessage._id ? { ...msg, isRead: true } : msg
              )
            );
          })
          .catch((err) =>
            console.error("Error marking messages as read:", err)
          );
      }
    }
  }, [allMessages, isChatActive, selectedMessage, user]);

  useEffect(() => {
    console.log("handleReadUP")
    const handleReadUpdate = (data) => {
      if (user._id === data.senderId) {
        setAllMessages((prev) =>
          prev.map((msg) =>
            msg.senderId === user._id && msg.receiverId === data.receiverId
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
  }, [user]);

            useEffect(() => {
                console.log("handleReceived")
                const handleReceiveMessage = (message) => {
                if (message.receiverId === user._id) {
                    setAllMessages((prev) => {
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
                    if (message.senderId !== selectedMessage._id) {
                    alert(`New message from ${message.senderName}!`);
                    }
                }
                };
                socket.on("receiveMessage", handleReceiveMessage);
                return () => {
                socket.off("receiveMessage", handleReceiveMessage);
                };
            }, [user, selectedMessage, isChatActive]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/connections/requests/${user._id}`
        );
        console.log("REquested");
        console.log(res.data);
        setFriendRequests(res.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };
    fetchRequests();
  }, [user, selectedMessage]);

  const sendFriendRequest = async () => {
    try {
      await axios.post("http://localhost:5001/api/connections/request", {
        senderId: user._id,
        receiverId: selectedMessage._id,
      });
      console.log("sendRequest");
    //   console.log()
      setRequestSent(true);
      alert("Friend request sent!");
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  const acceptRequest = async (senderId) => {
    try {
        console.log("acceptRequest")
      await axios.post("http://localhost:5001/api/connections/accept", {
        senderId,
        receiverId: user._id,
      });
      setFriendRequests(friendRequests.filter((req) => req.senderId !== senderId));
      setIsConnected(true);
    } catch (err) {
      console.error("Error accepting request:", err);
    }
  };

  const messages = allMessages.filter(
    (msg) =>
      (msg.senderId === user._id && msg.receiverId === selectedMessage._id) ||
      (msg.senderId === selectedMessage._id && msg.receiverId === user._id)
  );

 
  const handleMessageClick = (message) => {
    setSelectedMessage(message)
    setDetailSidebarOpen(true)
    setIsConnected(true);
    console.log("hiii")
  }

  const handleBackClick = () => {
    setDetailSidebarOpen(false)
    // setSelectedMessage(null)
  }

  return (
    <div className="flex h-full">
  
      <div className={`flex-grow bg-black p-4 ${detailSidebarOpen ? "hidden md:block" : "block"}`} style={{ borderRadius: "10px" }}>
        {connections.length>0  ? connections.map((message) => (
          <div
            key={message._id}
            className="flex items-center p-4 rounded-lg mb-4 cursor-pointer hover:bg-gray-800 transition-colors"
            onClick={() => handleMessageClick(message)}
          >
  
            <div className="flex items-center flex-1">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
              {message.avatar?  <img src={message.avatar || "/placeholder.svg"} alt={message.firstName} className="w-full h-full object-cover" /> :
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
                <h3 className="font-medium text-sm">{message.firstName + " " +message.lastName}</h3>
              </div>
            </div>
            <div className="flex items-center justify-center flex-1">
              <span className="bg-black text-xs px-3 py-1 rounded-full border border-[#757575] border-opacity-25">Requested</span>
            </div>
            <div className="flex-1 text-right">
              <span className="text-xs text-white">{message.createdAt}</span>
            </div>
          </div>
        )) :  
        
        <div className="flex-grow -mt-7 bg-black rounded-lg p-2" style={{ height: '500px', borderRadius: '10px' }}>
        <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-400">No messages found. All message requests you receive to connect will appear here.</p>
        <p className='text-white font-bold'> Connect Now</p>
      </div> 
      </div> }
      </div>

      {/* Detail Sidebar */}
      {detailSidebarOpen && selectedMessage && (
        <div className=" top-0 right-0 h-full w-full md:w-1/3 bg-black border-l border-[#1E1E1E] z-50 transform transition-transform duration-300 ease-in-out">
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
                  <img src={selectedMessage.avatar || "/placeholder.svg"} alt={selectedMessage.sender} className="w-full h-full object-cover" />
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
              <p className="mb-4 text-sm">{selectedMessage.sender} sent you a connection request. Do you want to accept it?</p>
              <div className="flex space-x-4">
                <button onClick={() => acceptRequest(selectedMessage._id)} className="flex-1 bg-white text-black py-3 rounded-lg font-extrabold">Accept</button>
                <button className="flex-1 bg-[#1E1E1E] text-white py-3 rounded-lg font-extrabold">Accept only message</button>
              </div>
            </div>
          </div>


          <div style={styles.chatContainer}>
      <h3>Chat with {selectedMessage.firstName}</h3>
      {friendRequests.length > 0 &&
        friendRequests.map((req) => (
          <div key={req.senderId} style={styles.requestBox}>
            <p>{req.senderId.firstName} sent you a friend request.</p>
            <button
              onClick={() => acceptRequest(req.senderId)}
              style={styles.acceptButton}
            >
              Accept
            </button>
          </div>
        ))}
      {isConnected ? (
        <>
          <p>You are now connected with {selectedMessage.firstName}. Start chatting!</p>
          <div style={styles.messagesContainer}>
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.messageBubble,
                    backgroundColor:
                      msg.senderId === user._id ? "green" : "blue",
                    alignSelf:
                      msg.senderId === user._id ? "flex-start" : "flex-end",
                  }}
                >
                  <div>
                    <strong>
                      {msg.senderId === user._id ? "Me" : selectedMessage.firstName}:
                    </strong>{" "}
                    {msg.message}
                  </div>
                  <div style={styles.timeStamp}>
                    {msg.createdAt &&
                      new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </div>
                  {msg.senderId === user._id && (
                    <div style={styles.readReceipts}>
                      {msg.isRead ? (
                        <span style={{ color: "blue" }}>✔✔</span>
                      ) : (
                        <span style={{ color: "gray" }}>✔✔</span>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No messages yet.</p>
            )}
          </div>
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={styles.input}
            />
            <button onClick={sendMessage} style={styles.sendButton}>
              Send
            </button>
          </div>
        </>
      ) : (
        !requestSent && (
          <button onClick={sendFriendRequest} style={styles.requestButton}>
            Send Friend Request
          </button>
        )
      )}
    </div>
        </div>
      )}




    
    </div>
  )
}




const styles = {
    chatContainer: {
      maxWidth: "500px",
      margin: "auto",
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "20px",
      backgroundColor: "#f9f9f9",
    },
    messagesContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      maxHeight: "400px",
      overflowY: "auto",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      backgroundColor: "#fff",
    },
    messageBubble: {
      padding: "10px",
      borderRadius: "10px",
      color: "white",
      maxWidth: "70%",
      wordWrap: "break-word",
      margin: "5px 0",
      border: "2px solid blue",
    },
    timeStamp: {
      fontSize: "0.8rem",
      color: "#999",
      marginTop: "4px",
      textAlign: "right",
    },
    readReceipts: {
      fontSize: "0.8rem",
      marginTop: "4px",
      textAlign: "right",
    },
    inputContainer: {
      display: "flex",
      marginTop: "10px",
    },
    input: {
      flex: 1,
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    sendButton: {
      padding: "10px",
      marginLeft: "5px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#007bff",
      color: "white",
      cursor: "pointer",
    },
    requestBox: {
      margin: "10px 0",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
    },
    acceptButton: {
      backgroundColor: "green",
      color: "white",
      padding: "5px",
      border: "none",
      cursor: "pointer",
    },
    requestButton: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "10px",
      border: "none",
      cursor: "pointer",
    },
  };
  