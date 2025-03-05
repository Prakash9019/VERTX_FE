import { useEffect,useState } from "react";

export default function FloatingLabelInput({ id, label, type = 'text', maxLength = 50, validateidentifier = false, value, onChange, className = '' }){
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState('');
  
    const validateInput = (inputValue) => {
      let valid = true;
      if (validateidentifier) {
        const identifierRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!identifierRegex.test(inputValue)) {
          setError('Please enter a valid identifier address');
          valid = false;
        } else {
          setError('');
        }
      } else if (inputValue.length === 0) {
        setError(`${label} is required`);
        valid = false;
      } else {
        setError('');
      }
      // onValidate(valid);
    };
  
    useEffect(() => {
      if (value && !isFocused) {
        validateInput(value);
      }
    }, [value, isFocused]);
  
    return (
      <div className="relative">
        <label
          htmlFor={id}
          className={`absolute text-sm p-1 transition-all duration-200 ${
            isFocused || value
              ? 'top-[-0.25rem] pb-2 text-blue-500'
              : 'top-2 text-gray-500'
          }`}
        >
          {label}
        </label>
        <input
          id={id}
          type={type}
          value={value}
          maxLength={maxLength}
          className={`${className} ${error ? 'border-red-500' : ''} ${ isFocused || value
                ? 'pt-1.25'
                : ''
            }`}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            validateInput(value);
          }}
        />
        {error && <p className="text-md pb-4 text-red-500 mt-1">{error}</p>}
      </div>
    );
  };