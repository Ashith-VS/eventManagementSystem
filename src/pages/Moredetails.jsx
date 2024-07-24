import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MoreDetails = () => {
  const { id } = useParams();
  
  const events = [
    { id: 1, name: 'Event 1', description: 'Description for event 1', date: '2023-08-01', details: 'Detailed information about Event 1' },
    { id: 2, name: 'Event 2', description: 'Description for event 2', date: '2023-09-15', details: 'Detailed information about Event 2' },
    { id: 3, name: 'Event 3', description: 'Description for event 3', date: '2023-10-01', details: 'Detailed information about Event 3' },
    { id: 4, name: 'Event 4', description: 'Description for event 4', date: '2023-11-15', details: 'Detailed information about Event 4' },
    { id: 5, name: 'Event 5', description: 'Description for event 5', date: '2023-12-01', details: 'Detailed information about Event 5' },
    { id: 6, name: 'Event 6', description: 'Description for event 6', date: '2024-01-15', details: 'Detailed information about Event 6' },
  ];

  const event = events.find(event => event.id === parseInt(id));

  return (
    <div className="App">
      <Navbar />
      <section className="d-flex justify-content-center align-items-center gradient-form" style={{ height: "100vh" }}>
        <div className="container py-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-10">
              <div className="card rounded-3 text-black">
                <div className="card-body p-md-5 mx-md-4">
                  {event ? (
                    <>
                      <div className="text-center">
                        <h4 className="mt-1 mb-5 pb-1">{event.name}</h4>
                      </div>
                      <div>
                        <p>{event.details}</p>
                        <p><strong>Date:</strong> {event.date}</p>
                        <p><strong>Description:</strong> {event.description}</p>
                        <button className="d-flex justify-content-center btn btn-primary">book now</button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <h4 className="mt-1 mb-5 pb-1">Event not found</h4>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoreDetails;
