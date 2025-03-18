// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";

// import { MessageCircle, Bookmark, XCircle } from "lucide-react";

// const socket = io("http://localhost:5000");

// const users = [
//   { id: 1, name: "John Doe", profilePic: "https://via.placeholder.com/50" },
//   { id: 2, name: "Jane Smith", profilePic: "https://via.placeholder.com/50" },
// ];

// const Card = ({ children }) => (
//     <div className="p-4 bg-white shadow-md rounded-lg">{children}</div>
//   );
  
//   const Button = ({ children, onClick }) => (
//     <button
//       onClick={onClick}
//       className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//     >
//       {children}
//     </button>
//   );
  
//   const Input = ({ value, onChange, placeholder }) => (
//     <input
//       type="text"
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//     />
//   );

  
//   export default function Inbox() {
//     const [marked, setMarked] = useState([]);
//     const [requested, setRequested] = useState([]);
//     const [general, setGeneral] = useState([]);
//     const [selectedChat, setSelectedChat] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
  
//     useEffect(() => {
//       socket.on("message", (message) => {
//         setMessages((prev) => [...prev, message]);
//       });
//       return () => {
//         socket.off("message");
//       };
//     }, []);
  
//     const markUser = (user) => setMarked([...marked, user]);
//     const requestConnection = (user) => setRequested([...requested, user]);
//     const acceptRequest = (user) => {
//       setGeneral([...general, user]);
//       setRequested(requested.filter((u) => u.id !== user.id));
//     };
//     const openChat = (user) => setSelectedChat(user);
//     const sendMessage = () => {
//       if (newMessage.trim() && selectedChat) {
//         const messageData = { user: selectedChat.name, text: newMessage };
//         socket.emit("message", messageData);
//         setMessages([...messages, messageData]);
//         setNewMessage("");
//       }
//     };
  
//     return (
//       <div className="flex gap-4 p-4 h-screen">
//         <div className="w-1/3 border p-4 bg-gray-50 rounded-lg h-full">
//           <h2 className="text-lg font-semibold border-b pb-2">Users</h2>
//           {users.map((user) => (
//             <div key={user.id} className="p-3 border rounded-lg my-2 flex items-center gap-3 bg-white shadow">
//               <img src={user.profilePic} alt={user.name} className="rounded-full w-12 h-12 border" />
//               <span className="font-medium">{user.name}</span>
//               <button onClick={() => markUser(user)} className="ml-auto p-2 bg-yellow-400 rounded-lg">
//                 <Bookmark size={16} />
//               </button>
//               <button onClick={() => requestConnection(user)} className="p-2 bg-blue-400 rounded-lg">
//                 <MessageCircle size={16} />
//               </button>
//               <button className="p-2 bg-red-400 rounded-lg">
//                 <XCircle size={16} />
//               </button>
//             </div>
//           ))}
//         </div>
//         <div className="w-1/3 border p-4 bg-gray-50 rounded-lg h-full overflow-auto">
//           <h2 className="text-lg font-semibold border-b pb-2">Inbox</h2>
//           <div>
//             <h3 className="font-semibold mt-4">Marked</h3>
//             {marked.map((user) => (
//               <div key={user.id} className="flex gap-2 items-center my-2 p-3 border rounded-lg bg-white shadow">
//                 <img src={user.profilePic} alt={user.name} className="rounded-full w-10 h-10 border" />
//                 <span>{user.name}</span>
//               </div>
//             ))}
//           </div>
//           <div>
//             <h3 className="font-semibold mt-4">Requested</h3>
//             {requested.map((user) => (
//               <div key={user.id} className="flex gap-2 items-center my-2 p-3 border rounded-lg bg-white shadow">
//                 <img src={user.profilePic} alt={user.name} className="rounded-full w-10 h-10 border" />
//                 <span>{user.name}</span>
//                 <button onClick={() => acceptRequest(user)} className="ml-auto bg-green-400 px-3 py-1 rounded-lg text-white">
//                   Accept
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="w-1/3 border p-4 bg-gray-50 rounded-lg h-full">
//           <h2 className="text-lg font-semibold border-b pb-2">Chat</h2>
//           {general.map((user) => (
//             <div key={user.id} className="flex gap-2 items-center my-2 p-3 border rounded-lg bg-white shadow cursor-pointer" onClick={() => openChat(user)}>
//               <img src={user.profilePic} alt={user.name} className="rounded-full w-10 h-10 border" />
//               <span className="font-medium">{user.name}</span>
//             </div>
//           ))}
//           {selectedChat && (
//             <div className="border p-4 mt-4 h-3/4 bg-white shadow rounded-lg flex flex-col">
//               <h3 className="font-semibold mb-2">Chat with {selectedChat.name}</h3>
//               <div className="h-full overflow-y-auto border p-2 rounded-lg bg-gray-100">
//                 {messages.map((msg, index) => (
//                   <div key={index} className="my-1 text-sm p-2 rounded-md w-fit max-w-xs bg-blue-300 text-white">
//                     <strong>{msg.user}: </strong>{msg.text}
//                   </div>
//                 ))}
//               </div>
//               <div className="flex gap-2 mt-2">
//                 <input
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder="Type a message..."
//                   className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Send</button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
  
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ChatApp() {
  const [users, setUsers] = useState([]);
  const [markedUsers, setMarkedUsers] = useState([]);
  const [requestedUsers, setRequestedUsers] = useState([]);
  const [acceptedUsers, setAcceptedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState("");
  const userId = "USER_ID_1"; // Replace with actual logged-in user ID

  useEffect(() => {
    socket.on("user-marked", ({ userId, markedUserId }) => {
      if (userId === "USER_ID_1") setMarkedUsers((prev) => [...prev, markedUserId]);
    });

    socket.on("request-sent", ({ userId, requestedUserId }) => {
      if (userId === "USER_ID_1") setRequestedUsers((prev) => [...prev, requestedUserId]);
      if (requestedUserId === "USER_ID_1") setRequestedUsers((prev) => [...prev, userId]);
    });

    socket.on("request-accepted", ({ userId, requesterId }) => {
      if (userId === "USER_ID_1" || requesterId === "USER_ID_1") {
        setAcceptedUsers((prev) => [...prev, userId, requesterId]);
      }
    });

    socket.on("new-message", ({ senderId, receiverId, message }) => {
      if (senderId === userId || receiverId === userId) {
        setMessages((prev) => [...prev, { senderId, receiverId, message }]);
      }
    });
  }, []);

  const handleMark = (markedUserId) => {
    socket.emit("mark-user", { userId, markedUserId });
  };

  const handleRequest = (requestedUserId) => {
    socket.emit("send-request", { userId, requestedUserId });
  };

  const handleAccept = (requesterId) => {
    socket.emit("accept-request", { userId, requesterId });
  };

  const sendMessage = () => {
    if (currentChat && message.trim()) {
      socket.emit("send-message", { senderId: userId, receiverId: currentChat, message });
      setMessage("");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto border border-gray-300 h-screen flex flex-col">
      <h2 className="text-xl font-bold mb-4">Inbox</h2>
      <div className="flex gap-2">
        <button onClick={() => setUsers([...users, "New User"])} className="border px-4 py-2">Add User</button>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="border p-2 h-96 overflow-auto">
          <h3 className="font-semibold">Users</h3>
          {users.map((user, index) => (
            <div key={index} className="flex justify-between p-2 border-b">
              <span>{user}</span>
              <button onClick={() => handleMark(user)} className="text-blue-500">Mark</button>
              <button onClick={() => handleRequest(user)} className="text-green-500">Connect</button>
            </div>
          ))}
        </div>
        <div className="border p-2 h-96 overflow-auto">
          <h3 className="font-semibold">Requests</h3>
          {requestedUsers.map((user, index) => (
            <div key={index} className="flex justify-between p-2 border-b">
              <span>{user}</span>
              <button onClick={() => handleAccept(user)} className="text-green-500">Accept</button>
            </div>
          ))}
        </div>
        <div className="border p-2 h-96 overflow-auto">
          <h3 className="font-semibold">Chat</h3>
          {acceptedUsers.map((user, index) => (
            <div key={index} className="p-2 border-b" onClick={() => setCurrentChat(user)}>
              {user}
            </div>
          ))}
        </div>
      </div>
      {currentChat && (
        <div className="border mt-4 p-4 h-40 overflow-auto">
          <h3 className="font-semibold">Chat with {currentChat}</h3>
          <div>
            {messages.filter(msg => msg.receiverId === currentChat || msg.senderId === currentChat).map((msg, index) => (
              <div key={index} className={msg.senderId === userId ? "text-right" : "text-left"}>
                {msg.message}
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              className="border p-2 flex-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage} className="border px-4 py-2">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
