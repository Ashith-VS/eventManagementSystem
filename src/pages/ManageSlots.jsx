import React, { useState } from 'react';

const ManageSlots = () => {
  const [slots, setSlots] = useState([
    { id: 1, time: '10:00 AM', available: true },
    { id: 2, time: '11:00 AM', available: false },
  ]);

  const toggleSlotAvailability = (id) => {
    setSlots(slots.map(slot => slot.id === id ? { ...slot, available: !slot.available } : slot));
  };

  return (
    <div>
      <h3>Manage Slots</h3>
      <ul className="list-group">
        {slots.map(slot => (
          <li key={slot.id} className="list-group-item d-flex justify-content-between align-items-center">
            {slot.time}
            <button
              className={`btn btn-${slot.available ? 'success' : 'danger'}`}
              onClick={() => toggleSlotAvailability(slot.id)}
            >
              {slot.available ? 'Available' : 'Unavailable'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageSlots;
