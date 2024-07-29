import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { isEmpty } from 'lodash';
import {doc,getDoc,setDoc, updateDoc} from 'firebase/firestore';
import { db, storage } from '../servies/firebase';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {v4 as uuid} from "uuid"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FaTimes } from 'react-icons/fa';


const AdminDashboard = () => {

  const {getUser} =useSelector((state)=>state.Reducers)
  const {id}=useParams()

  const [error ,setError] =useState({})
  const uid=Date.now().toString()
  const [previewImages, setPreviewImages] = useState([]);

  const [events, setEvents] = useState({
    id: "",
    name: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    price: "",
    venue:"",
    participantLimit:0,
    AvailableTickets:0,
    image:[]
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
    participantLimit: filteredEvents.participantLimit,
    AvailableTickets: filteredEvents.AvailableTickets,
    image: filteredEvents.image
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
        let imageUrls = [];
        if (events?.image && events?.image.length > 0) {
       imageUrls= await handleImageUpload(events?.image);
        }
        await setDoc(doc(db, "events",uid), {...events,id:uid,image:imageUrls});
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
          participantLimit:0,
          AvailableTickets:0,
          image:[]
        });
        setPreviewImages([])
        document.getElementById('image').value = ''; // Clear the input value when each successful update
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
      let imageUrls = [];
      if(events.id){
        const eventRef = doc(db, 'events', events.id);
        const eventSnapshot = await getDoc(eventRef);
        const existingImages = eventSnapshot.data()?.image || [];
        // Upload new images and combine with existing images
        if (events?.image && events?.image.length > 0) {
          const newImages = await handleImageUpload(events?.image);
          imageUrls = [...existingImages, ...newImages];
        } else {
          imageUrls = existingImages; // No new images, use existing
        }
        // Update Firestore with combined image URLs
        await updateDoc(eventRef, { ...events, image: imageUrls });
        toast.success('Event updated successfully!');
     }
    }
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
   
    setEvents({...events,image:files})
    setPreviewImages(files.map(file => ({ url: URL.createObjectURL(file), id: uuid() })));
  }

  const handleImageUpload = async (files) => {
    const uploadTasks = Array.from(files).map(async (file) => {
      const imageName = `${file.name}_${uuid()}`;
      const imageRef = ref(storage, `images/${imageName}`);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      return { url, name: imageName };
    });

    try {
      const imageObjects = await Promise.all(uploadTasks); 
    return imageObjects; // Return all image objects
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error; 
    }
  };
  
  const handleRemoveImage = (id) => {
    setPreviewImages(prevImages => prevImages?.filter(img => img.id !== id));
    setEvents(prevEvents => ({...prevEvents,image: prevEvents.image.filter((_, index) => index !== previewImages.findIndex(img => img.id === id))}));
  };

 
  const handleRemoveUpdateImage=async(img)=>{  
    const updatedImages = events.image.filter(image => image.name!== img);
    setEvents({...events, image: updatedImages });
    setPreviewImages(prevImages => prevImages.filter(img => img.name!== img));
  }

  return (
    
    <div className="d-flex">
      <Sidebar />
      <div className='container'>
        <h3 className="mt-5">{!isEmpty(id)?'Update Event':'Create Event'}</h3>
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
            <label htmlFor="image">Event Images</label>
            <input
              type="file"
              className="form-control"
              multiple
              id="image"
              accept="image/*"  // Accept all image formats
              onChange={handleFileChange}
            />
          </div>
          {previewImages?.length > 0 && (
            <div >
               
                {previewImages?.map(({ url, id }) => (
                  <div key={id} style={{ position: 'relative', display: 'inline-block' }} >
                    <img
                      src={url}
                      alt={`Preview ${id}`}
                      style={{ width: '100px', height: '100px', margin: '5px' }}
                    />
                    <FaTimes
                      onClick={() => handleRemoveImage(id)}
                      style={{ position: 'absolute', top: '0', right: '0' ,cursor: 'pointer', color: 'red' }}
                    />
                  </div>
                ))}
              </div>
            )}
            {filteredEvents?.image?.length>0&&(
               <div >
               {filteredEvents?.image?.map(({ url,name, id }) => (
                 <div key={id} style={{ position: 'relative', display: 'inline-block' }} >
                   <img
                     src={url}
                     alt={`Preview ${id}`}
                     style={{ width: '100px', height: '100px', margin: '5px' }}
                   />
                   <FaTimes
                     onClick={() => handleRemoveUpdateImage(name)}
                     style={{ position: 'absolute', top: '0', right: '0' ,cursor: 'pointer', color: 'red' }}
                   />
                 </div>
               ))}
             </div>
            )}
      
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
              onChange={(e) =>{ setEvents({ ...events, participantLimit: e.target.value,AvailableTickets: e.target.value})
             setError({...error, participantLimit: "", AvailableTickets:""})}}
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
