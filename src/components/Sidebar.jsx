import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column bg-light vh-100">
      <h2 className="p-3">Admin Dashboard</h2>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/admin/create-event">Create Event</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/manage-slots">Manage Slots</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/manage-payments">Manage Payments</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
