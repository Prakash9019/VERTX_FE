import * as React from "react";

// Reusable Button Component
export function Button({ context, theme, callback, disabled }) {
  return (
    <button
      onClick={callback}
      disabled={disabled}
      className={`w-full py-3 px-4 rounded-full font-medium text-sm mb-3 transition-colors ${
        theme === "light"
          ? disabled 
            ? "bg-gray-400 text-gray-700 cursor-not-allowed" 
            : "bg-white text-black hover:bg-gray-200"
          : "bg-transparent text-white border border-gray-700 hover:bg-gray-900"
      }`}
    >
      {context}
    </button>
  );
}

// Reusable Back Button Component
export function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-transparent p-2 text-white hover:bg-gray-900 border border-gray-700 h-10 w-10 flex items-center justify-center"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

// Reusable Authentication Container
export function AuthContainer({ children, title }) {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-[2px] flex justify-center items-center z-50">
      <div className="w-[60%] bg-black rounded-2xl border border-[#75757569] p-6 pb-10 h-[70%] relative">
        {children}
      </div>
    </div>
  );
}