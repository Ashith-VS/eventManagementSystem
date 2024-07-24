import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Main = () => {
  const events = [
    { id: 1, name: 'Event 1', description: 'Description for event 1', date: '2023-08-01' },
    { id: 2, name: 'Event 2', description: 'Description for event 2', date: '2023-09-15' },
    { id: 3, name: 'Event 3', description: 'Description for event 3', date: '2023-10-01' },
    { id: 4, name: 'Event 4', description: 'Description for event 4', date: '2023-11-15' },
    { id: 5, name: 'Event 5', description: 'Description for event 5', date: '2023-12-01' },
    { id: 6, name: 'Event 6', description: 'Description for event 6', date: '2024-01-15' },
  ];

  return (
    <div className="App">
      <Navbar />
      <section className="d-flex justify-content-center align-items-center gradient-form" style={{ height: "100vh" }}>
        <div className="container py-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-12">
              <div className="card rounded-3 text-black">
                <div className="card-body p-md-5 mx-md-4">
                  <div className="text-center">
                    <h4 className="mt-1 mb-5 pb-1">Events</h4>
                  </div>
                  <div className="row">
                    {events.map(event => (
                      <div key={event.id} className="col-md-3 mb-4">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title">{event.name}</h5>
                            <p className="card-text">{event.description}</p>
                            <p className="card-text">
                              <small className="text-muted">{event.date}</small>
                            </p>
                            <Link to={`/event/${event.id}`} className="btn btn-primary">More Details</Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
