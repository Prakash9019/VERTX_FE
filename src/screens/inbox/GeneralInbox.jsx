import { useEffect, useState, useRef } from "react";
import { ArrowLeft, CheckCheck } from "lucide-react";
import axios from "axios";
import { io } from "socket.io-client";
import { Chat_key } from "../../../key";

const socket = io(Chat_key, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

export default function GeneralInbox({
  userId,
  onMessageClick,
  detailSidebarOpen,
  setDetailSidebarOpen,
}) {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [inputText, setInputText] = useState("");
  const [connections, setConnections] = useState([]);
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.emit("joinRoom", { userId });

    socket.on("receiveMessage", (message) => {
      if (message.receiverId === userId) {
        setMessages((prev) => [...prev, message]);
        // console.log("Received message:", message);
        updateMessageStatus(message._id, "delivered");
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const fetchConnections = async () => {
        try {
          const res = await axios.get(
            `${Chat_key}/api/connections/status/${userId}`
          );
          setConnections(res.data);
        } catch (error) {
          console.error("Error fetching connections:", error);
        }
      };

      fetchConnections();
    }
  }, [userId]);

  const fetchMessages = async (receiverId) => {
    try {
      const res = await axios.get(
        `${Chat_key}/api/messages/${userId}/${receiverId}`
      );
      setMessages(res.data);
      markMessagesAsRead();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const markMessagesAsRead = async () => {
    if (!selectedMessage) return;

    try {
      // Find messages that need to be marked as read
      const unreadMessages = messages.filter(
        (msg) =>
          msg.senderId === selectedMessage.user &&
          (msg.status === "sent" || msg.status === "delivered")
      );

      if (unreadMessages.length === 0) return;

      // Update local state
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.senderId === selectedMessage.user && msg.status !== "read"
            ? { ...msg, status: "read" }
            : msg
        )
      );

      // Update on server
      await axios.put(`${Chat_key}/api/messages/read`, {
        senderId: selectedMessage.user,
        receiverId: userId,
      });

      // Notify sender via socket
      unreadMessages.forEach((msg) => {
        socket.emit("updateMessageStatus", {
          messageId: msg._id,
          status: "read",
        });
      });
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  useEffect(() => {
    if (selectedMessage) {
      fetchMessages(selectedMessage.user);
    }
  }, [selectedMessage]);

  useEffect(() => {
    if (selectedMessage && messages.length > 0) {
      markMessagesAsRead();
    }
  }, [selectedMessage, messages]);

  useEffect(() => {
    const handleStatusUpdate = ({ messageId, status }) => {
      setMessages((prevMessages) => {
        const updated = prevMessages.map((msg) =>
          msg._id === messageId ? { ...msg, status } : msg
        );
        return updated;
      });
    };

    socket.on("messageStatusUpdated", handleStatusUpdate);

    return () => {
      socket.off("messageStatusUpdated", handleStatusUpdate);
    };
  }, []);

  useEffect(() => {
    const handleTypingStarted = (senderId) => {
      if (senderId === selectedMessage?.user) {
        setTypingStatus("Typing...");
      }
    };

    const handleTypingStopped = (senderId) => {
      if (senderId === selectedMessage?.user) {
        setTypingStatus("");
      }
    };

    socket.on("typingStarted", handleTypingStarted);
    socket.on("typingStopped", handleTypingStopped);

    return () => {
      socket.off("typingStarted", handleTypingStarted);
      socket.off("typingStopped", handleTypingStopped);
    };
  }, [selectedMessage]);

  useEffect(() => {
    const handleMessageViewedUpdated = ({ messageId, status }) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === messageId ? { ...msg, status } : msg
        )
      );
    };

    socket.on("messageViewedUpdated", handleMessageViewedUpdated);

    return () => socket.off("messageViewedUpdated", handleMessageViewedUpdated);
  }, []);

  const updateMessageStatus = async (messageId, status) => {
    try {
      await axios.put(`${Chat_key}/api/messages/status/${messageId}`, {
        status,
      });
      socket.emit("updateMessageStatus", { messageId, status });
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setDetailSidebarOpen(true);
    fetchMessages(message.user);
    if (onMessageClick) onMessageClick(message);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === "" || !selectedMessage) return;
    try {
      const newMessage = {
        senderId: userId,
        receiverId: selectedMessage.user,
        message: inputText,
        status: "sent",
      };

      const res = await axios.post(`${Chat_key}/api/messages`, newMessage);
      const savedMessage = res.data;
      // console.log("Message saved:", savedMessage);

      setMessages((prevMessages) => [...prevMessages, savedMessage]);
      socket.emit("sendMessage", {
        ...savedMessage,
        room: selectedMessage.user,
      });

      setInputText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleTyping = () => {
    socket.emit("startTyping", {
      senderId: userId,
      receiverId: selectedMessage?.user,
    });

    setTimeout(() => {
      socket.emit("stopTyping", {
        senderId: userId,
        receiverId: selectedMessage?.user,
      });
    }, 2000);
  };

  return (
    <>
      <div
        className="flex-grow -mt-7 bg-black rounded-lg p-2"
        style={{ height: "500px", borderRadius: "10px" }}
      >
        {connections.length > 0 ? (
          connections.map((message) => (
            <div
              key={message.user}
              className="flex items-center p-4 rounded-lg mb-4 cursor-pointer hover:bg-gray-800 transition-colors"
              onClick={() => handleMessageClick(message)}
            >
              <div className="flex items-center flex-1">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                  {message.avatar ? (
                    <img
                      src={message.avatar || "/placeholder.svg"}
                      alt={message.firstName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-full h-full object-cover"
                      viewBox="0 0 469 469"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="234.5" cy="234.5" r="234.5" fill="#111111" />
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
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-sm">
                    {message.firstName + "   " + message.lastName}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-center flex-1">
                <span className="bg-black text-xs px-3 py-1 rounded-full border border-[#757575] border-opacity-25">
                  Requested
                </span>
              </div>
              <div className="flex-1 text-right">
                <span className="text-xs text-white">{message.createdAt}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-400">No messages found. Connect now!</p>
          </div>
        )}
      </div>
      {detailSidebarOpen && selectedMessage && (
        <div
          className={`fixed top-0 right-0 h-full w-full md:w-1/3 bg-black border-l border-[#1E1E1E] z-50 transform transition-transform duration-300 ease-in-out ${
            detailSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-[#1E1E1E] flex items-center">
              <button
                onClick={() => setDetailSidebarOpen(false)}
                className="p-2 rounded-full hover:bg-gray-800 mr-2"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-medium">General</h2>
            </div>
            <div className="flex-grow overflow-y-auto p-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.senderId === userId ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div className="bg-gray-800 text-white p-2 rounded-lg max-w-xs flex items-center">
                    {msg.message}
                    {msg.senderId === userId && (
                      <span className="ml-2 text-xs">
                        {msg.status === "read" ? (
                          <CheckCheck style={{ color: "blue" }} />
                        ) : msg.status === "delivered" ? (
                          "✔"
                        ) : (
                          <CheckCheck />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />

              {typingStatus && (
                <div className="flex items-center space-x-2 text-gray-400 mt-2 p-3 bg-gray-800 bg-opacity-40 rounded-lg max-w-[120px] animate-pulse">
                  <span className="text-sm font-medium">{typingStatus}</span>
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-[#1E1E1E]">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Write a message..."
                  className="flex-grow bg-black text-white py-3 px-4 rounded-full pr-12 border border-[#757575] border-opacity-50 placeholder-[#757575] text-xs"
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    handleTyping();
                  }}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  className="absolute right-3 bg-black p-2 rounded-full"
                  onClick={handleSendMessage}
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
