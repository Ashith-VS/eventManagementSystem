import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { isEmpty } from 'lodash';
import { addDoc, collection, doc, getDoc, setDoc, updateDoc} from 'firebase/firestore';
import { db } from '../servies/firebase';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

const AdminDashboard = () => {
  const dispatch =useDispatch()
  const {getUser} =useSelector((state)=>state.Reducers)
  const {id}=useParams()
  const [error ,setError] =useState({})
  const uid=Date.now().toString()
  const [events, setEvents] = useState({
    id: "",
    name: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    price: "",
    venue:"",
    participantLimit:0
  });
  const filteredEvents = getUser.find((event) => event.id === id)
 
  useEffect(() => {
    if(filteredEvents){
    setEvents({
    id:filteredEvents?.id,
    name: filteredEvents.name,
    description: filteredEvents.description,
    date: filteredEvents.date,
    startTime:filteredEvents.startTime,
    endTime: filteredEvents.endTime,
    price: filteredEvents.price,
    venue: filteredEvents.venue,
    participantLimit: filteredEvents.participantLimit
    })
 }
}, [id])
  
 
  const validateForm = () => {
    const errors = {};
    if (isEmpty(events.name)) errors.name = "Event Name is required";
    if (isEmpty(events.description)) errors.description = "Description is required";
    if (isEmpty(events.date)) errors.date = "Date is required";
    if (isEmpty(events.startTime)) errors.startTime = "Start Time is required";
    if (isEmpty(events.endTime)) errors.endTime = "End Time is required";
    if (isEmpty(events.price)) errors.price = "Price is required";
    if (isEmpty(events.venue)) errors.venue = "Venue is required";
    if (isEmpty(events.participantLimit)) errors.participantLimit = "Participant Limit is required";
    return errors;
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (!isEmpty(formErrors)) {
      setError(formErrors);
    } else {
      try {
        await setDoc(doc(db, "events",uid), {...events,id:uid});
        toast.success('Event successfully created!');
         // Reset the form
         setEvents({
          id: "",
          name: "",
          description: "",
          date: "",
          startTime: "",
          endTime: "",
          price: "",
          venue:"",
          participantLimit:0
        });
        setError({});
      } catch (error) {
        console.error(error)
      }
    }
  };
  
  const handleUpdate = async(e) => {
    e.preventDefault()
    const formErrors = validateForm();
    if (!isEmpty(formErrors)) {
      setError(formErrors);
    } else {
      if(events.id){
      const eventRef = doc(db, 'events',events.id);
      await updateDoc(eventRef, events);
      toast.success('Event updated successfully!');
     }
    }
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div className='container'>
        <h3 className="mt-5">Create Event</h3>
             {Object.keys(error).length > 0 && (
                  <div style={{background: "rgb(230, 190, 199)"}}>
                    {Object.entries(error).map(([key, value]) => (
                      <li key={key} style={{ display: value ? "" : "none" }}>
                        {value}
                      </li>
                    ))}
                  </div>
                )}
      <div className="col-md-8 p-3">
        <form onSubmit={!isEmpty(id) ? handleUpdate:handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={events.name}
              onChange={(e) => {
                setEvents({ ...events, name: e.target.value })
                setError({...error, name: "" });
              }
              }
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="description">Event Description</label>
            <textarea
              className="form-control"
              id="description"
              value={events.description}
              onChange={(e) =>{ setEvents({ ...events, description: e.target.value })
               setError({...error, description: ""})}}
             
            ></textarea>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="date">Event Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={events.date}
              onChange={(e) =>{ setEvents({ ...events, date: e.target.value })
              setError({...error, date: ""})}}
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="price">Event Venue</label>
            <input
              type="text"
              className="form-control"
              id="price"
              value={events.venue}
              onChange={(e) =>{ setEvents({ ...events, venue: e.target.value })
             setError({...error, venue: ""})}}
             
            />
          </div>
          <div className='row'>
          <div className="col-md-6 mb-4">
              <label htmlFor="startTime">Start Time</label>
              <input
                type="time"
                className="form-control"
                id="startTime"
                value={events.startTime}
                onChange={(e) => {
                  setEvents({ ...events, startTime: e.target.value });
                  setError({ ...error, startTime: "" });
                }}
              />
            </div>
            <div className="col-md-6 mb-4">
              <label htmlFor="endTime">End Time</label>
              <input
                type="time"
                className="form-control"
                id="endTime"
                value={events.endTime}
                onChange={(e) => {
                  setEvents({ ...events, endTime: e.target.value });
                  setError({ ...error, endTime: "" });
                }}
              />
            </div></div>
          <div className="form-group mb-4">
            <label htmlFor="price">Event Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              value={events.price}
              onChange={(e) =>{ setEvents({ ...events, price: e.target.value })
             setError({...error, price: ""})}}
              placeholder="Enter 0 for free events"
            />
          </div>
          
          <div className="form-group mb-4">
            <label htmlFor="price">Event Participant Limit</label>
            <input
              type="text"
              className="form-control"
              id="price"
              value={events.participantLimit}
              onChange={(e) =>{ setEvents({ ...events, participantLimit: e.target.value })
             setError({...error, participantLimit: ""})}}
            />
          </div>

          <button type="submit" className="btn btn-primary" >{!isEmpty(id)?"Update Event":"Create Event"}</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
