import React from 'react';

const ManagePayments = () => {
  const payments = [
    { id: 1, event: 'Event 1', amount: 50, status: 'Paid' },
    { id: 2, event: 'Event 2', amount: 30, status: 'Pending' },
  ];

  return (
    <div>
      <h3>Manage Payments</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Event</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.event}</td>
              <td>${payment.amount}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePayments;
