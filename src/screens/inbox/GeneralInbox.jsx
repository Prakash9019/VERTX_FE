
import { useState } from "react"
import { ArrowLeft, Heart, Send } from "lucide-react"

export default function GeneralInbox({ onMessageClick, detailSidebarOpen, setDetailSidebarOpen }) {
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [inputText, setInputText] = useState("")
  const [likedMessages, setLikedMessages] = useState({})

  const connectedMessages = [
    {
      id: 1,
      sender: "Praneeth Regulavalasa",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "Connected",
      date: "March 17",
      messages: [
        {
          text: "Hey, this is praneeth, let's connect",
          time: "18:06",
          sender: "them"
        },
        {
          text: "Hello man, how are you?",
          time: "18:20",
          sender: "them"
        }
      ],
      type: "connected",
    },
    {
      id: 2,
      sender: "Surya Prakash",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "Connected",
      date: "March 16",
      messages: [
        {
          text: "Hi there, I wanted to reach out about that project",
          time: "14:30",
          sender: "them"
        },
        {
          text: "Let me know when you're free to chat",
          time: "14:35",
          sender: "them"
        }
      ],
      type: "connected",
    },
  ]

  const handleMessageClick = (message) => {
    setSelectedMessage(message)
    setDetailSidebarOpen(true)
    if (onMessageClick) {
      onMessageClick(message)
    }
  }

  const handleBackClick = () => {
    setDetailSidebarOpen(false)
    setSelectedMessage(null)
  }

  const handleSendMessage = () => {
    if (inputText.trim() === "" || !selectedMessage) return

    // Get current time in HH:MM format
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const time = `${hours}:${minutes}`

    // Create new message
    const newMessage = {
      text: inputText,
      time: time,
      sender: "you"
    }

    // Update selected message with new message
    setSelectedMessage(prevMessage => ({
      ...prevMessage,
      messages: [...prevMessage.messages, newMessage]
    }))

    // Clear input field
    setInputText("")
  }

  const toggleLike = (messageIndex) => {
    const key = `${selectedMessage.id}-${messageIndex}`
    setLikedMessages(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const isMessageLiked = (messageIndex) => {
    const key = `${selectedMessage?.id}-${messageIndex}`
    return likedMessages[key] || false
  }
// No messages found. All messages that you sent or received after connecting will appear here.
  return (
    <>
      <div className="flex-grow -mt-7 bg-black rounded-lg p-2" style={{ height: '500px', borderRadius: '10px' }}>
        {connectedMessages.length>0 ? connectedMessages.map((message) => (
          <div
            key={message.id}
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
                <h3 className="font-medium text-sm">{message.sender}</h3>
              </div>
            </div>
            <div className="flex items-center justify-center flex-1">
              <span className="bg-black text-xs px-3 py-1 rounded-full border border-[#757575] border-opacity-25">
                {message.status}
              </span>
            </div>
            <div className="flex-1 text-right">
              <span className="text-xs text-white">{message.date}</span>
            </div>
          </div>
        )) :  
        
        <div className="flex-grow -mt-7 bg-black rounded-lg p-2" style={{ height: '500px', borderRadius: '10px' }}>
        <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-400">No messages found. All messages that you sent or received after connecting will appear here.</p>
        <p className='text-white font-bold'> Connect Now</p>
      </div> 
      </div> }
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
              <h2 className="text-xl font-medium">General</h2>
            </div>

            {/* Message Content */}
            <div className="flex-grow overflow-y-auto p-4">
              <div className="flex justify-center mb-4">
                <div className="bg-[#1E1E1E] rounded-lg px-3 py-1 inline-block">
                  <span className="text-xs text-white font-bold">Today</span>
                </div>
              </div>

              {selectedMessage.messages.map((msg, index) => (
                <div className={`flex mb-4 ${msg.sender === "you" ? "justify-end" : ""}`} key={index}>
                  {msg.sender !== "you" && (
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                      <img
                        src={selectedMessage.avatar || "/placeholder.svg"}
                        alt={selectedMessage.sender}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
               <div className={`flex flex-col ${msg.sender === "you" ? "items-end" : "w-full"}`}>
  <div className="flex justify-between mb-1">
    <div className={`p-3 ${msg.sender === "you" ? "bg-[#757575] rounded-lg" : "bg-[#1E1E1E] rounded-lg"}`}>
      <p className="text-sm">{msg.text}</p>
    </div> 


                      <div className="self-end ml-2 flex items-center">
                      <span className="text-xs text-white flex items-center gap-0.5">
  {msg.time}
  {msg.sender === "you" && <span className="text-[#757575] text-[20px] material-symbols-outlined">done_all</span>}
</span>



                      </div>
                    </div>
                    {msg.sender === "them" && (
                      <div className="flex items-center">
                        <button onClick={() => toggleLike(index)}>
                          <Heart 
                            size={14} 
                            className={isMessageLiked(index) ? "text-red-500 fill-red-500" : "text-[#E3E3E3]"} 
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-[#1E1E1E]">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Write a message request to Mark..."
                  className="flex-grow bg-black text-white py-3 px-4 rounded-full pr-12 border border-[#757575] border-opacity-50 placeholder-[#757575] text-xs"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage()
                    }
                  }}
                />
                <button 
                  className="absolute right-3 bg-black p-2 rounded-full" 
                  onClick={handleSendMessage}
                >
                  <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.969284 11.5861V7.39652L6.55535 6.00001L0.969284 4.60349V0.41394L14.2362 6.00001L0.969284 11.5861Z" fill="white"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}