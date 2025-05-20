import React from 'react';
import { useNavigate } from 'react-router-dom';

const HelpCenterV = () => {
  const navigate = useNavigate();

  const helpTopics = [
    {
      title: 'Getting Started',
      description: 'Learn how to create an account and get started with Vertex Labs.',
    },
    {
      title: 'Using the Dashboard',
      description: 'Understand the features and navigation of your creator dashboard.',
    },
    {
      title: 'Credit System',
      description: 'Details on how credits work and how to earn or redeem them.',
    },
    {
      title: 'Feed Aggregation',
      description: 'How we aggregate content from Twitter, Reddit, and LinkedIn.',
    },
    {
      title: 'Profile & Settings',
      description: 'Customize your profile and manage personal preferences.',
    },
    {
      title: 'Security & Privacy',
      description: 'Learn about our security measures and privacy controls.',
    },
    {
      title: 'Troubleshooting',
      description: 'Fix common issues and find quick solutions.',
    },
  ];

  return (
    <div className="fixed inset-0 bg-[#000000]/80 flex justify-center items-center z-50">
      <div className="w-[70%] max-sm:w-[95%] bg-black rounded-2xl border border-[#75757569] p-6 max-sm:p-2 pb-10 h-[95%] max-sm:h-[85%] overflow-hidden relative">
        <main className="overflow-y-scroll pt-12 h-full scrollbar-hide">
          <div className="bg-black text-gray-300 min-h-screen flex flex-col">
            <div className="flex justify-end">
              <button onClick={() => navigate(-1)} className="mr-2">
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
              <h1 className="text-4xl max-sm:text-2xl font-bold text-white text-center mb-8">Help Center</h1>
              <p className="text-gray-400 mb-6 max-sm:text-sm text-center">
                Find answers, get support, and explore resources to make the most of Vertex Labs.
              </p>

              <ol className="space-y-6 max-sm:space-y-4">
                {helpTopics.map((topic, index) => (
                  <li key={index}>
                    <div className="flex gap-2">
                      <span className="font-bold text-white">{index + 1}.</span>
                      <div>
                        <h2 className="font-bold text-white inline max-sm:text-sm">{topic.title}</h2>
                        <span className="text-gray-400 max-sm:text-xs"> {topic.description}</span>
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
                      Contact Support
                    </a>
                    <a href="#" className="text-white-400 hover:text-white">
                      Report an Issue
                    </a>
                    <a href="#" className="text-white-400 hover:text-white">
                      Community Forums
                    </a>
                    <a href="#" className="text-white-400 hover:text-white">
                      Feedback
                    </a>
                  </div>
                  <div className="text-gray-500 text-sm mt-6 max-sm:text-xs">
                    © 2025 Vertex Labs. All rights reserved.
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

export default HelpCenterV;
