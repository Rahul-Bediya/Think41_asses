import React, { useContext } from "react";
import { CustomerContext } from "../context/CustomerContext";
import CustomerCard from "./CustomerCard";

const CustomerList = () => {
  const { customers, loading } = useContext(CustomerContext);

  if (loading) return <p>Loading customers...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {customers.map((customer) => (
        <CustomerCard key={customer.id} customer={customer} />
      ))}
    </div>
  );
};

export default CustomerList;
