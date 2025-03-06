"use client"

export const Button = ({ context, theme, callback, disabled = false }) => {
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
  )
}

export const BackButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-transparent p-2 text-white hover:bg-gray-900 border border-gray-700 h-10 w-10 flex items-center justify-center"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </button>
  )
}

export const AuthContainer = ({ children, onClose, isPopup = false }) => {
  if (isPopup) {
    return (
      <div className="w-[90%] md:w-[200%] bg-black rounded-2xl border border-[#75757569] p-6 pb-10 max-h-[90vh] relative overflow-auto left-0 transform -translate-x-1/4">
        {children}
      </div>
    )
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-black text-white">
      <div className="w-full h-full absolute top-0 left-0 bg-black z-0"></div>
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center py-8 px-4">{children}</div>
    </div>
  )
}