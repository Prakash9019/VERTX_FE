import { useState, useEffect } from "react";
import { io } from "socket.io-client";

import { MessageCircle, Bookmark, XCircle } from "lucide-react";

const socket = io("http://localhost:5000");

const users = [
  { id: 1, name: "John Doe", profilePic: "https://via.placeholder.com/50" },
  { id: 2, name: "Jane Smith", profilePic: "https://via.placeholder.com/50" },
];

const Card = ({ children }) => (
    <div className="p-4 bg-white shadow-md rounded-lg">{children}</div>
  );
  
  const Button = ({ children, onClick }) => (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
      {children}
    </button>
  );
  
  const Input = ({ value, onChange, placeholder }) => (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );

  
  export default function Inbox() {
    const [marked, setMarked] = useState([]);
    const [requested, setRequested] = useState([]);
    const [general, setGeneral] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
  
    useEffect(() => {
      socket.on("message", (message) => {
        setMessages((prev) => [...prev, message]);
      });
      return () => {
        socket.off("message");
      };
    }, []);
  
    const markUser = (user) => setMarked([...marked, user]);
    const requestConnection = (user) => setRequested([...requested, user]);
    const acceptRequest = (user) => {
      setGeneral([...general, user]);
      setRequested(requested.filter((u) => u.id !== user.id));
    };
    const openChat = (user) => setSelectedChat(user);
    const sendMessage = () => {
      if (newMessage.trim() && selectedChat) {
        const messageData = { user: selectedChat.name, text: newMessage };
        socket.emit("message", messageData);
        setMessages([...messages, messageData]);
        setNewMessage("");
      }
    };
  
    return (
      <div className="flex gap-4 p-4 h-screen">
        <div className="w-1/3 border p-4 bg-gray-50 rounded-lg h-full">
          <h2 className="text-lg font-semibold border-b pb-2">Users</h2>
          {users.map((user) => (
            <div key={user.id} className="p-3 border rounded-lg my-2 flex items-center gap-3 bg-white shadow">
              <img src={user.profilePic} alt={user.name} className="rounded-full w-12 h-12 border" />
              <span className="font-medium">{user.name}</span>
              <button onClick={() => markUser(user)} className="ml-auto p-2 bg-yellow-400 rounded-lg">
                <Bookmark size={16} />
              </button>
              <button onClick={() => requestConnection(user)} className="p-2 bg-blue-400 rounded-lg">
                <MessageCircle size={16} />
              </button>
              <button className="p-2 bg-red-400 rounded-lg">
                <XCircle size={16} />
              </button>
            </div>
          ))}
        </div>
        <div className="w-1/3 border p-4 bg-gray-50 rounded-lg h-full overflow-auto">
          <h2 className="text-lg font-semibold border-b pb-2">Inbox</h2>
          <div>
            <h3 className="font-semibold mt-4">Marked</h3>
            {marked.map((user) => (
              <div key={user.id} className="flex gap-2 items-center my-2 p-3 border rounded-lg bg-white shadow">
                <img src={user.profilePic} alt={user.name} className="rounded-full w-10 h-10 border" />
                <span>{user.name}</span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-semibold mt-4">Requested</h3>
            {requested.map((user) => (
              <div key={user.id} className="flex gap-2 items-center my-2 p-3 border rounded-lg bg-white shadow">
                <img src={user.profilePic} alt={user.name} className="rounded-full w-10 h-10 border" />
                <span>{user.name}</span>
                <button onClick={() => acceptRequest(user)} className="ml-auto bg-green-400 px-3 py-1 rounded-lg text-white">
                  Accept
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3 border p-4 bg-gray-50 rounded-lg h-full">
          <h2 className="text-lg font-semibold border-b pb-2">Chat</h2>
          {general.map((user) => (
            <div key={user.id} className="flex gap-2 items-center my-2 p-3 border rounded-lg bg-white shadow cursor-pointer" onClick={() => openChat(user)}>
              <img src={user.profilePic} alt={user.name} className="rounded-full w-10 h-10 border" />
              <span className="font-medium">{user.name}</span>
            </div>
          ))}
          {selectedChat && (
            <div className="border p-4 mt-4 h-3/4 bg-white shadow rounded-lg flex flex-col">
              <h3 className="font-semibold mb-2">Chat with {selectedChat.name}</h3>
              <div className="h-full overflow-y-auto border p-2 rounded-lg bg-gray-100">
                {messages.map((msg, index) => (
                  <div key={index} className="my-1 text-sm p-2 rounded-md w-fit max-w-xs bg-blue-300 text-white">
                    <strong>{msg.user}: </strong>{msg.text}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Send</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  