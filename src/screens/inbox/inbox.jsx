"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Heart } from "lucide-react"
import { Layout, MobileFooter } from "../layout/bars"

export default function InboxPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [currentPage, setCurrentPage] = useState("inbox")
  const [activeTab, setActiveTab] = useState("general")
  const [isMobile, setIsMobile] = useState(false)
  const [detailSidebarOpen, setDetailSidebarOpen] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Run check immediately
    checkIsMobile()

    // Listen for resize events
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  const messages = [
    {
      id: 1,
      sender: "Praneeth Regulavalasa",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "Requested",
      date: "March 17",
      message: "Hey, this is praneeth, let's connect",
      time: "18:06",
      type: "request",
    },
    {
      id: 2,
      sender: "Praneeth Regulavalasa",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "Requested",
      date: "March 17",
      message: "Hey, this is praneeth, let's connect",
      time: "18:06",
      type: "request",
    },
  ]

  const handleMessageClick = (message) => {
    setSelectedMessage(message)
    setDetailSidebarOpen(true)
  }

  const handleBackClick = () => {
    setDetailSidebarOpen(false)
    setSelectedMessage(null)
  }

  const tabs = [
    { id: "general", label: "General" },
    { id: "requests", label: "Requests" },
    { id: "marked", label: "Marked" },
  ]

  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="flex flex-col min-h-screen text-white font-['Manrope'] tracking-[-0.04em]">
        <div
          className={`${isMobile ? "px-4 -mt-5 pb-24 flex-grow" : "w-full px-4 mx-auto mt-2"} overflow-y-auto relative`}
        >
          <div className="flex flex-col h-full">
            <div className="bg-[#111] pb-6">
              <h1 className="text-4xl font-bold mb-6">Inbox</h1>

              {/* Tabs */}
              <div className="flex space-x-8 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`pb-2 ${activeTab === tab.id ? "text-white" : "text-[#757575]"}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-grow -mt-7 bg-black rounded-lg p-2" style={{ height: '500px', borderRadius: '10px'  }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-center p-4 rounded-lg mb-4 cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => handleMessageClick(message)}
                >
                  <div className="flex items-center flex-1">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                      <img
                        src={message.avatar || "/placeholder.svg"}
                        alt={message.sender}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{message.sender}</h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-center flex-1">
                    <span className="bg-black text-xs px-3 py-1 rounded-full border border-[#757575] border-opacity-25">
                      {message.status}
                    </span>
                  </div>
                  <div className="flex-1 text-right">
                    <span className="text-sm text-white">{message.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-full md:w-1/3 bg-black border-l border-[#1E1E1E] z-50 transform transition-transform duration-300 ease-in-out ${
            detailSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {selectedMessage && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-[#1E1E1E] flex items-center">
                <button onClick={handleBackClick} className="p-2 rounded-full hover:bg-gray-800 mr-2">
                  <ArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-medium">Request recieved</h2>
              </div>

              {/* Message Content */}
              <div className="flex-grow overflow-y-auto p-4">
                <div className="flex justify-center mb-4">
                  <div className="bg-[#1E1E1E] rounded-lg px-3 py-2 inline-block">
                    <span className="text-xs text-gray-400 font-bold">Today</span>
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
                        <p>{selectedMessage.message}</p>
                      </div>
                      <div className="self-end">
                        <span className="text-xs text-white">{selectedMessage.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Heart size={16} className="text-[#E3E3E3] mr-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection Request */}
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

        {/* Mobile Footer */}
        {isMobile && <MobileFooter currentPage={currentPage} />}
      </div>
    </Layout>
  )
}