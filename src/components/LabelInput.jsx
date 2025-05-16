import { useEffect, useState } from "react";

export default function FloatingLabelInput({
  id,
  label,
  type = "text",
  maxLength = 50,
  validateidentifier = false,
  value,
  onChange,
  className = "",
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");

  const validateInput = (inputValue) => {
    let valid = true;
    if (validateidentifier) {
      const identifierRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!identifierRegex.test(inputValue)) {
        setError("Please enter a valid identifier address");
        valid = false;
      } else {
        setError("");
      }
    } else if (inputValue.length === 0) {
      setError(`${label} is required`);
      valid = false;
    } else {
      setError("");
    }
  };

  useEffect(() => {
    if (value && !isFocused) {
      validateInput(value);
    }
  }, [value, isFocused]);

  return (
    <div className="relative w-full">
      {/* Input field */}
      <input
        id={id}
        type={type}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          validateInput(value);
        }}
        className={`w-full px-4 pt-6 pb-2 text-white rounded-md bg-transparent border ${
          error ? "border-red-500" : "border-gray-700"
        } focus:outline-none focus:ring-0 ${className}`}
        placeholder=" " // <-- Invisible placeholder space to enable label animation
      />

      {/* Floating label */}
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isFocused || value
            ? "top-1 text-xs text-blue-500"
            : "top-3 text-sm text-gray-500"
        }`}
      >
        {label}
      </label>

      {/* Error message */}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
