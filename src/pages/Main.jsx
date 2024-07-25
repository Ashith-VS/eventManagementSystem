import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetEvents } from '../redux/action/commonAction';

const Main = () => {
const dispatch=useDispatch()
const {getUser} =useSelector((state)=>state.Reducers)

 useEffect(() => {
 dispatch(GetEvents())
 }, [])
 
  return (
    <div className="App">
      <Navbar />
      <section className="d-flex justify-content-center align-items-center gradient-form" >
        <div className="container py-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-12">
              <div className="card rounded-3 text-black">
                <div className="card-body p-md-5 mx-md-4">
                  <div className="text-center">
                    <span>All upcoming</span>
                    <h4 className="mt-1 mb-5 pb-1">Events</h4>
                  </div>
                  <div className="row text-center">
                    {getUser?.map(event => (
                      <div key={event.id} className="col-md-3 mb-4">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title">{event.name}</h5>
                            <p className="card-text">{event.description}</p>
                            <p className="card-text">
                              <small className="text-muted">{event.date}</small>
                            </p>
                            <Link to={`/event/${event.id}`} className="btn btn-primary">View Details</Link></div>
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
