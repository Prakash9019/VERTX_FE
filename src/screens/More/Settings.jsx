import React from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsV = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-[#000000]/80 flex justify-center items-center z-50">
      <div className="w-[70%] max-sm:w-[95%] bg-black rounded-2xl border border-[#75757569] p-6 max-sm:p-2 pb-10 h-[95%] max-sm:h-[85%] overflow-hidden relative">
        <main className="overflow-y-scroll pt-12 h-full scrollbar-hide">
          <div className="bg-black text-gray-300 min-h-screen flex flex-col">
            {/* Close button moved to top right */}
            <div className="flex justify-end ">
              <button
                onClick={() => navigate(-1)}
                className="mr-2"
                // className="p-2  text-white bg-gray-800 rounded-full  hover:bg-gray-700 transition-colors"
              >
                <svg width="40" height="40" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.25" y="0.25" width="31.5" height="25.5" rx="12.75" stroke="#757575" strokeWidth="0.5" />
                  <path
                    d="M12.9834 8.04688L15.7861 12.251L18.5957 8.04688H19.5938L16.2988 12.9482L19.6963 18H18.6914L15.7861 13.6592L12.8809 18H11.8828L15.2803 12.9482L11.9854 8.04688H12.9834Z"
                    fill="#757575"
                  />
                </svg>
              </button>
            </div>

            <main className="flex flex-col w-full mx-auto px-6 max-sm:px-4">
              <h1 className="text-4xl max-sm:text-2xl font-bold text-white text-center mb-8">Account Settings</h1>
              <p className="text-gray-400 mb-6 max-sm:text-sm">
                Manage your account preferences and information here.
              </p>

              <ol className="space-y-6 max-sm:space-y-4">
                {[
                  {
                    title: 'Profile Information',
                    description: 'Update your name, email, and other personal details.',
                  },
                  {
                    title: 'Change Password',
                    description: 'Modify your account password for security.',
                  },
                  {
                    title: 'Notification Preferences',
                    description: 'Manage the types of notifications you receive from our service.',
                  },
                  {
                    title: 'Privacy Settings',
                    description: 'Control who can see your information and how your data is used.',
                  },
                  {
                    title: 'Connected Accounts',
                    description: 'View and manage other accounts linked to your profile.',
                  },
                  {
                    title: 'Language',
                    description: 'Set your preferred language for the application interface.',
                  },
                  {
                    title: 'Support',
                    description: 'Get help and find answers to your questions.',
                  },
                ].map((item, index) => (
                  <li key={index}>
                    <div className="flex gap-2">
                      <span className="font-bold text-white">{index + 1}.</span>
                      <div>
                        <h2 className="font-bold text-white inline max-sm:text-sm">{item.title}</h2>
                        <span className="text-gray-400 max-sm:text-xs"> {item.description}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </main>

            <footer className="border-t border-gray-800 mt-12 max-sm:mt-6 pt-6 pb-8 px-6 max-sm:px-4">
              <div className="max-w-3xl ml-0">
                <div className="text-left">
                  <div className="flex flex-wrap gap-4 mb-4 max-sm:gap-2 max-sm:text-xs">
                    <a href="#" className="text-white-400 hover:text-white">
                      Help Center
                    </a>
                    <a href="#" className="text-white-400 hover:text-white">
                      FAQ
                    </a>
                    <a href="#" className="text-white-400 hover:text-white">
                      Contact Us
                    </a>
                    <a href="#" className="text-white-400 hover:text-white">
                      Report a Problem
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-6 max-sm:gap-2 max-sm:text-xs">
                    <a href="#" className="text-white-400 hover:text-white">
                      Terms of Service
                    </a>
                    <a href="#" className="text-white-400 hover:text-white">
                      Community Guidelines
                    </a>
                    <a href="#" className="text-white-400 hover:text-white">
                      Data Policy
                    </a>
                    <a href="#" className="text-white-400 hover:text-white">
                      Cookie Policy
                    </a>
                  </div>
                  <div className="flex items-center mt-6">
                    <svg width="47" height="12" viewBox="0 0 47 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.72 0.799999H8.656V8.176L5.008 12H3.584L0.944 8.096V0.799999H2.88V7.728L4.416 10.016L6.72 7.6V0.799999ZM11.8498 0.799999H18.0898V2.608H12.5858L12.2978 2.928V5.44H15.9938V7.248H12.2978V9.488L12.7618 10.192H18.0898V12H11.8018L10.3618 9.856V2.32L11.8498 0.799999ZM20.1155 0.799999H25.9875L27.8595 3.536V5.408L26.3875 6.928L27.8595 9.088V12H25.9235V9.424L24.4675 7.296H22.8995L22.0515 6.768V12H20.1155V0.799999ZM22.0515 2.608V5.488H25.2995L25.9235 4.848V3.92L25.0115 2.608H22.0515ZM29.4053 0.799999H37.7573V2.608H33.5013L34.5573 3.552V12H32.6213V4L32.1573 2.608H29.4053V0.799999ZM44.791 0.799999H46.727V4.208L45.207 5.76L46.727 7.984V12H44.791V8.352L43.975 7.216H43.239L41.559 8.976V12H39.623V8.368L41.143 6.816L39.623 4.592V0.799999H41.559V4.224L42.343 5.408H43.111L44.791 3.648V0.799999Z"
                        fill="white"
                      />
                    </svg>
                    <div className="text-gray-500 text-sm ml-2 max-sm:text-xs">
                      © 2025 Your Company Name. All rights reserved.
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsV;