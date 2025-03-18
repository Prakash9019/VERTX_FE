import { useState } from "react";

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    introRequests: false,
    directMessages: false,
  });

  const [whatsappNotifications, setWhatsappNotifications] = useState({
    introRequests: false,
    directMessages: false,
  });

  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showWhatsappPopup, setShowWhatsappPopup] = useState(false);

  const toggleEmail = (type) => {
    if (type === "directMessages") {
      if (!emailNotifications.directMessages) {
        setShowEmailPopup(true);
      } else {
        setEmailNotifications((prev) => ({
          ...prev,
          [type]: false,
        }));
      }
    } else {
      setEmailNotifications((prev) => ({
        ...prev,
        [type]: !prev[type],
      }));
    }
  };

  const toggleWhatsapp = (type) => {
    if (type === "directMessages") {
      if (!whatsappNotifications.directMessages) {
        setShowWhatsappPopup(true);
      } else {
        setWhatsappNotifications((prev) => ({
          ...prev,
          [type]: false,
        }));
      }
    } else {
      setWhatsappNotifications((prev) => ({
        ...prev,
        [type]: !prev[type],
      }));
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setEmailNotifications((prev) => ({
      ...prev,
      directMessages: true,
    }));
    setShowEmailPopup(false);
  };

  const handleWhatsappSubmit = (e) => {
    e.preventDefault();
    setWhatsappNotifications((prev) => ({
      ...prev,
      directMessages: true,
    }));
    setShowWhatsappPopup(false);
  };

  return (
    <div className="relative">
      <div 
        className="bg-black text-white p-8 shadow-lg max-w-2xl w-full rounded-[10px] overflow-hidden border border-[#757575] mx-auto"
        style={{ 
          fontFamily: 'Manrope, sans-serif',
          letterSpacing: '-0.04em'
        }}
      >
        {/* Email Notifications */}
        <div className="mb-8">
          <h2 className="text-xl font-extrabold mb-6">Email Notifications</h2>
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#CAC5C5]">Intro requests</span>
            <button
              className={`w-12 h-6 ml-30 flex items-center rounded-full p-1 transition duration-300 ${
                emailNotifications.introRequests ? "bg-green-500" : "bg-[#1E1E1E]"
              }`}
              onClick={() => toggleEmail("introRequests")}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition duration-300 ${
                  emailNotifications.introRequests ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#CAC5C5]">Direct messages</span>
            <button
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                emailNotifications.directMessages ? "bg-green-500" : "bg-[#1E1E1E]"
              }`}
              onClick={() => toggleEmail("directMessages")}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition duration-300 ${
                  emailNotifications.directMessages ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>
        </div>

        {/* WhatsApp Notifications */}
        <div>
          <h2 className="text-xl font-extrabold mt-14 mb-6">Whatsapp Notifications</h2>
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#CAC5C5]">Intro requests</span>
            <button
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                whatsappNotifications.introRequests ? "bg-green-500" : "bg-[#1E1E1E]"
              }`}
              onClick={() => toggleWhatsapp("introRequests")}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition duration-300 ${
                  whatsappNotifications.introRequests ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#CAC5C5]">Direct messages</span>
            <button
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                whatsappNotifications.directMessages ? "bg-green-500" : "bg-[#1E1E1E]"
              }`}
              onClick={() => toggleWhatsapp("directMessages")}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition duration-300 ${
                  whatsappNotifications.directMessages ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {/* Email Popup */}
      {showEmailPopup && (
   <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center backdrop-blur-[2px] z-50">

          <div className="bg-black border border-[#757575] rounded-[10px] w-full max-w-lg mx-4">
            <form onSubmit={handleEmailSubmit} className="flex w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent text-white placeholder-[#757575] text-sm outline-none flex-grow px-6 py-4"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  letterSpacing: '-0.04em',
                  fontSize: '14px',

                }}
                required
              />
              <button
                type="submit"
                className="text-white font-bold px-6 py-4"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* WhatsApp Popup */}
      {showWhatsappPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-black border border-[#757575] rounded-[10px] w-full max-w-lg mx-4">
            <form onSubmit={handleWhatsappSubmit} className="flex w-full">
              <input
                type="text"
                placeholder="Enter your whatsapp no. with country code"
                className="bg-transparent text-white placeholder-[#757575] outline-none flex-grow px-6 py-4"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  letterSpacing: '-0.04em',
                  fontSize: '14px',

                }}
                required
              />
              <button
                type="submit"
                className="text-white px-6 py-4"
                style={{
                  fontSize: '10px'
                }}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSettings;