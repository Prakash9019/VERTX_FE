// import { useState } from "react"
// import React from 'react'

// import { ArrowLeft, Heart } from "lucide-react"
// import List from "../explore/List"
// const MarkInbox = ({marked}) => {
//      const [selectedMessage, setSelectedMessage] = useState(null)

//   const [detailSidebarOpen, setDetailSidebarOpen] = useState(false)
   
//   const handleMessageClick = (message) => {
//     setSelectedMessage(message)
//     setDetailSidebarOpen(true)
   
//   }

//   const handleBackClick = () => {
//     setDetailSidebarOpen(false)
//     setSelectedMessage(null)
//   }
//   return (
//     <div className="flex-grow -mt-7 bg-black rounded-lg p-2" style={{ height: '500px', borderRadius: '10px' }}>
//     {marked.length==0 ? <div className="flex flex-col items-center justify-center h-full">
//       <p className="text-gray-400">No profiles found. All profiles you mark will appear here.</p>
//       <p className='text-white font-bold'> Connect Now</p>
//     </div>: 
    
//     <div className={`flex-grow bg-black p-4 `} style={{ borderRadius: "10px" }}>
//         {marked.map((message) => (
//           <div
//             key={message.id}
//             className="flex items-center p-4 rounded-lg mb-4 cursor-pointer hover:bg-gray-800 transition-colors"
//             onClick={() => handleMessageClick(message)}
//           >
//             <div className="flex items-center flex-1">
//               <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
//                 {message.avatar?  <img src={message.avatar || "/placeholder.svg"} alt={message.firstName} className="w-full h-full object-cover" /> :
//                     <svg
//                     className="w-full h-full object-cover"
//                     viewBox="0 0 469 469"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <circle
//                       cx="234.5"
//                       cy="234.5"
//                       r="234.5"
//                       fill="#111111"
//                     />
//                     <circle
//                       cx="234.5"
//                       cy="217.5"
//                       r="91"
//                       fill="#EEEEEE"
//                       fillOpacity="0.93"
//                     />
//                     <path
//                       d="M379.86 417.556C339.877 449.371 289.26 468.37 234.186 468.37C179.112 468.37 128.496 449.371 88.5095 417.556C117.79 374.542 172.07 345.654 234.186 345.654C296.302 345.654 350.587 374.535 379.86 417.556Z"
//                       fill="#EEEEEE"
//                       fillOpacity="0.933333"
//                     />
//                   </svg>
                   
//                 }
               
//               </div>
//               <div>
//                 <h3 className="font-medium text-sm">{message.firstName + " " +message.lastName}</h3>
//               </div>
//             </div>
//             <div className="flex items-center justify-center flex-1">
//               <span className="bg-black text-xs px-3 py-1 rounded-full border border-[#757575] border-opacity-25">Profile Marked</span>
//             </div>
//             <div className="flex-1 text-right">
//               <span className="text-xs text-white">{message.creat}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//         }

// <div
//   className={`fixed top-0 right-0 h-full w-full md:w-1/2 bg-black border-l border-[#1E1E1E] z-50 transform transition-transform duration-300 ease-in-out ${
//     detailSidebarOpen ? "translate-x-0" : "translate-x-full"
//   }`}
//   style={{
//     overflowY: "auto", // Enable vertical scrolling
//     scrollbarWidth: "none", // Hide scrollbar for Firefox
//   }}
// >
//   {selectedMessage && (
//     <div className="flex flex-col p-4">
//       {/* Header */}
//       <div className="p-4 border-b border-[#1E1E1E] flex items-center">
//         <button
//           onClick={handleBackClick}
//           className="p-2 rounded-full hover:bg-gray-800 mr-2"
//         >
//           <ArrowLeft size={20} />
//         </button>
//         <h2 className="text-xl font-medium">Marked</h2>
//       </div>

//       {/* Content */}
//       <List userId={selectedMessage._id} />
//     </div>
//   )}
// </div>


//   </div>
//   )
// }

// export default MarkInbox
import React, { useState } from 'react';
import { ArrowLeft } from "lucide-react";
import List from "../explore/List";

const MarkInbox = ({ marked }) => {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [detailSidebarOpen, setDetailSidebarOpen] = useState(false);

    const handleMessageClick = (message) => {
        setSelectedMessage(message);
        setDetailSidebarOpen(true);
    };

    const handleBackClick = () => {
        setDetailSidebarOpen(false);
        setSelectedMessage(null);
    };

    const mainContentStyles = {
        borderRadius: "10px",
        height: '500px',
    };

    return (
        <div className="flex h-full -mt-5">
            <div
                className={`flex-grow bg-black p-2 ${detailSidebarOpen ? "hidden md:block" : "flex flex-col"}`}
                style={mainContentStyles}
            >
                {marked && marked.length > 0 ? (
                    marked.map((message) => (
                        <div
                            key={message.id}
                            className="flex items-center p-2 rounded-lg mb-4 cursor-pointer hover:bg-gray-800 transition-colors"
                            onClick={() => handleMessageClick(message)}
                        >
                            <div className="flex items-center flex-1">
                                <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                                    {message.avatar ? (
                                        <img src={message.avatar || "/placeholder.svg"} alt={`${message.firstName} ${message.lastName}`} className="w-full h-full object-cover" />
                                    ) : (
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
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm">{message.firstName + " " + message.lastName}</h3>
                                </div>
                            </div>
                            <div className="flex items-center justify-center flex-1">
                                <span className="bg-black text-xs px-3 py-1 rounded-full border border-[#757575] border-opacity-25">Profile Marked</span>
                            </div>
                            <div className="flex-1 text-right">
                                <span className="text-xs text-white">{message.creat}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-gray-400 text-center">No profiles found. All profiles you mark will appear here.</p>
                        <p className='text-white font-bold mt-2'> Connect Now</p>
                    </div>
                )}
            </div>

            {/* Detail Sidebar */}
            {detailSidebarOpen && selectedMessage && (
                <div className="fixed top-0 right-0 h-full w-full md:w-1/3 bg-black border-l border-[#1E1E1E] z-50 transform transition-transform duration-300 ease-in-out">
                    <div className="flex flex-col h-full">
                        <div className="p-4 border-b border-[#1E1E1E] flex items-center">
                            <button onClick={handleBackClick} className="p-2 rounded-full hover:bg-gray-800 mr-2">
                                <ArrowLeft size={20} />
                            </button>
                            <h2 className="text-xl font-medium">Marked Profile</h2>
                        </div>

                        <div className="flex-grow overflow-y-auto p-4">
                            <div className="flex justify-center mb-4">
                                <div className="w-24 h-24 rounded-full overflow-hidden">
                                    {selectedMessage.avatar ? (
                                        <img src={selectedMessage.avatar || "/placeholder.svg"} alt={`${selectedMessage.firstName} ${selectedMessage.lastName}`} className="w-full h-full object-cover" />
                                    ) : (
                                        <svg
                                            className="w-full h-full object-cover"
                                            viewBox="0 0 469 469"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="234.5" cy="234.5" r="234.5" fill="#111111" />
                                            <circle cx="234.5" cy="217.5" r="91" fill="#EEEEEE" fillOpacity="0.93" />
                                            <path d="M379.86 417.556C339.877 449.371 289.26 468.37 234.186 468.37C179.112 468.37 128.496 449.371 88.5095 417.556C117.79 374.542 172.07 345.654 234.186 345.654C296.302 345.654 350.587 374.535 379.86 417.556Z" fill="#EEEEEE" fillOpacity="0.933333" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-center">{selectedMessage.firstName + " " + selectedMessage.lastName}</h3>
                            {selectedMessage._id && <List userId={selectedMessage._id} />}
                        </div>

                        <div className="p-4 border-t border-[#1E1E1E]">
                            <p className="mb-4 text-sm">{selectedMessage.firstName + " " + selectedMessage.lastName} is a profile you marked. You can view their details below.</p>
                            {/* You can add action buttons here if needed */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarkInbox;