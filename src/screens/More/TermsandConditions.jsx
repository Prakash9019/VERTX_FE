import React from 'react';
import { useNavigate } from 'react-router-dom';
const TermsAndConditions = ({onClose}) => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-[#000000]/80 flex justify-center items-center z-50">
      <div className="w-[70%] max-sm:w-[95%] bg-black rounded-2xl border border-[#75757569] p-6 max-sm:p-2 pb-10 h-[95%] max-sm:h-[85%] overflow-hidden relative">
        <main className="overflow-y-scroll pt-12 h-full scrollbar-hide">
          <div className="bg-black text-gray-300 min-h-screen flex flex-col">
            {/* Close button moved to top right */}
            <div className="flex justify-end ">
                <button 
                  onClick={()=> navigate(-1)}
                  className="mr-2"
                  // className="p-2  text-white bg-gray-800 rounded-full  hover:bg-gray-700 transition-colors"
                >
                  <svg width="40" height="40" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.25" y="0.25" width="31.5" height="25.5" rx="12.75" stroke="#757575" stroke-width="0.5"/>
<path d="M12.9834 8.04688L15.7861 12.251L18.5957 8.04688H19.5938L16.2988 12.9482L19.6963 18H18.6914L15.7861 13.6592L12.8809 18H11.8828L15.2803 12.9482L11.9854 8.04688H12.9834Z" fill="#757575"/>
</svg>

                </button>
              </div>
            
            <main className="flex flex-col w-full mx-auto px-6 max-sm:px-4">
              <h1 className="text-4xl max-sm:text-2xl font-bold text-white text-center mb-8">Terms and Conditions</h1>
              <p className="text-gray-400 mb-6 max-sm:text-sm">
                Welcome to vertx web application. Please read these terms and conditions carefully
                before using our website.
              </p>
              
              <ol className="space-y-6 max-sm:space-y-4">
                {[
                  {
                    title: "Acceptance of Terms and Conditions",
                    description: "By accessing and using our website, you agree to be bound by these terms and conditions. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
                  },
                  {
                    title: "Use of Our Website",
                    description: "You may use our website for personal, non-commercial purposes only. You may not use any content from our website for any commercial purpose without our prior written consent."
                  },
                  {
                    title: "Intellectual Property Rights",
                    description: "All content on our website, including but not limited to images, text, and screenshots, is our property or the property of our licensors. You may not copy, reproduce, distribute, or create derivative works based on our content without our or their prior written consent."
                  },
                  {
                    title: "User Accounts",
                    description: "In order to use certain features of our website, such as saving websites to your favorites and suggesting new websites, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account."
                  },
                  {
                    title: "User-Generated Content",
                    description: "We may allow users to submit comments and suggestions on our website. By submitting any content to us, you grant us a non-exclusive, worldwide, perpetual, irrevocable, royalty-free, sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content in any media."
                  },
                  {
                    title: "Disclaimer of Warranties",
                    description: "We do not warrant that our website will be error-free or uninterrupted, or that any defects will be corrected. We make no representations or warranties about the accuracy, reliability, completeness, or timeliness of the content on our website."
                  },
                  {
                    title: "Limitation of Liability",
                    description: "In no event shall we be liable for any damages arising out of the use or inability to use our website, including but not limited to damages for loss of data, loss of profits, or any other monetary loss."
                  }
                ].map((item, index) => (
                  <li key={index}>
                    <div className="flex gap-2">
                      <span className="font-bold text-white">{index + 1}.</span>
                      <div>
                        <h2 className="font-bold text-white inline max-sm:text-sm">{item.title}.</h2>
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
                    <a href="#" className="text-white-400 hover:text-white">Whatsapp</a>
                    <a href="#" className="text-white-400 hover:text-white">Discord</a>
                    <a href="#" className="text-white-400 hover:text-white">LinkedIn</a>
                    <a href="#" className="text-white-400 hover:text-white">Twitter</a>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-6 max-sm:gap-2 max-sm:text-xs">
                    <a href="#" className="text-white-400 hover:text-white">Newsletter</a>
                    <a href="#" className="text-white-400 hover:text-white">About</a>
                    <a href="#" className="text-white-400 hover:text-white">Terms of use</a>
                    <a href="#" className="text-white-400 hover:text-white">Privacy policy</a>
                  </div>
                  <div className="flex items-center mt-6">
                    <svg width="47" height="12" viewBox="0 0 47 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.72 0.799999H8.656V8.176L5.008 12H3.584L0.944 8.096V0.799999H2.88V7.728L4.416 10.016L6.72 7.6V0.799999ZM11.8498 0.799999H18.0898V2.608H12.5858L12.2978 2.928V5.44H15.9938V7.248H12.2978V9.488L12.7618 10.192H18.0898V12H11.8018L10.3618 9.856V2.32L11.8498 0.799999ZM20.1155 0.799999H25.9875L27.8595 3.536V5.408L26.3875 6.928L27.8595 9.088V12H25.9235V9.424L24.4675 7.296H22.8995L22.0515 6.768V12H20.1155V0.799999ZM22.0515 2.608V5.488H25.2995L25.9235 4.848V3.92L25.0115 2.608H22.0515ZM29.4053 0.799999H37.7573V2.608H33.5013L34.5573 3.552V12H32.6213V4L32.1573 2.608H29.4053V0.799999ZM44.791 0.799999H46.727V4.208L45.207 5.76L46.727 7.984V12H44.791V8.352L43.975 7.216H43.239L41.559 8.976V12H39.623V8.368L41.143 6.816L39.623 4.592V0.799999H41.559V4.224L42.343 5.408H43.111L44.791 3.648V0.799999Z" fill="white"/>
                    </svg>
                    <div className="text-gray-500 text-sm ml-2 max-sm:text-xs">2025 Vertxlabs, Inc. All rights reserved</div>
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

export default TermsAndConditions;