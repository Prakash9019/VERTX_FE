import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ placeholder = "Search naturally (e.g., 'best investors in India offering $500k to $1M')", onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      <form 
        onSubmit={handleSearch} 
        className="flex items-center bg-[#111] shadow-md rounded-full p-2 mt-2 w-full"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-grow bg-[#111] text-white px-4 py-2 focus:outline-none rounded-l-full"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-[#222] text-white rounded-full hover:bg-[#333] transition"
        >
          <Search size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
