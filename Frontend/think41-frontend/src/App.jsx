import React from "react";
import { CustomerProvider } from "./context/CustomerContext";
import CustomerList from "./components/CustomerList";
import SearchBar from "./components/SearchBar"; // moved SearchBar to its own file

function App() {
  return (
    <CustomerProvider>
      <div className="min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-center py-6">Customer Dashboard</h1>
        <SearchBar />
        <CustomerList />
      </div>
    </CustomerProvider>
  );
}

export default App;
