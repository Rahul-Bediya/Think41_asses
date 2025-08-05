import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setCustomers(res.data);
      setFilteredCustomers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const searchCustomer = (query) => {
    if (!query) return setFilteredCustomers(customers);

    const filtered = customers.filter((cust) =>
      cust.first_name.toLowerCase().includes(query.toLowerCase()) ||
      cust.last_name.toLowerCase().includes(query.toLowerCase()) ||
      cust.email.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredCustomers(filtered);
  };

  return (
    <CustomerContext.Provider value={{ customers: filteredCustomers, loading, searchCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};
