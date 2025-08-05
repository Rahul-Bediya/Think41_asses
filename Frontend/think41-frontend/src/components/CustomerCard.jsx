import React from "react";

const CustomerCard = ({ customer }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-lg font-bold">
        {customer.first_name} {customer.last_name}
      </h2>
      <p className="text-gray-700">{customer.email}</p>
      <p className="text-sm text-gray-600">Orders: {customer.orderCount || 0}</p>
    </div>
  );
};

export default CustomerCard;
