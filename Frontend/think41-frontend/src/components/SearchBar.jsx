import React, { useContext, useState } from "react";
import { CustomerContext } from "../context/CustomerContext";

const SearchBar = () => {
  const { searchCustomer } = useContext(CustomerContext);
  const [query, setQuery] = useState("");

  const handleSearchClick = () => {
    searchCustomer(query);
  };

  return (
    <div className="p-4 flex flex-col md:flex-row items-center gap-4">
      <input
        type="text"
        placeholder="Search by name or email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full md:w-1/2 border p-2 rounded"
      />
      <button
        onClick={handleSearchClick}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
