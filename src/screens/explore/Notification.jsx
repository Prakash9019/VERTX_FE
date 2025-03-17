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

  const toggleEmail = (type) => {
    setEmailNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const toggleWhatsapp = (type) => {
    setWhatsappNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className="bg-black text-white p-6 rounded-2xl shadow-lg w-full max-w-md">
      {/* Email Notifications */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Email Notifications</h2>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-400">Intro requests</span>
          <button
            className={`w-12 h-6 flex items-center bg-gray-600 rounded-full p-1 transition duration-300 ${
              emailNotifications.introRequests ? "bg-green-500" : "bg-gray-600"
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
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-400">Direct messages</span>
          <button
            className={`w-12 h-6 flex items-center bg-gray-600 rounded-full p-1 transition duration-300 ${
              emailNotifications.directMessages ? "bg-green-500" : "bg-gray-600"
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
        <h2 className="text-xl font-bold">Whatsapp Notifications</h2>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-400">Intro requests</span>
          <button
            className={`w-12 h-6 flex items-center bg-gray-600 rounded-full p-1 transition duration-300 ${
              whatsappNotifications.introRequests ? "bg-green-500" : "bg-gray-600"
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
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-400">Direct messages</span>
          <button
            className={`w-12 h-6 flex items-center bg-gray-600 rounded-full p-1 transition duration-300 ${
              whatsappNotifications.directMessages ? "bg-green-500" : "bg-gray-600"
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
  );
};

export default NotificationSettings;
