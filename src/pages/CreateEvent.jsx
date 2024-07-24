import React, { useState } from 'react';

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle event creation logic
    console.log({ name, description, date });
  };

  return (
    <div>
      <h3>Create Event</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="name">Event Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="description">Event Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="date">Event Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
