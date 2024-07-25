import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../servies/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetEvents } from '../redux/action/commonAction'

const AdminAllEvents = () => {
    const dispatch=useDispatch()
    const {getUser} =useSelector((state)=>state.Reducers)
 const navigate =useNavigate()

   
useEffect(() => {
    dispatch(GetEvents())
}, [])

const handleEdit = (id) =>{
    navigate(`/admin/edit-event/${id}`)
}


  return (
    <div className="d-flex">
         <Sidebar />
         <div className='container'>
        <h3 className="mt-5">All Tickets</h3>
         <div className="col-md-8 p-3">
        <table className="table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Date</th>
              <th>Time</th>
              <th>Venue</th>
              <th>Participant Limit</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {getUser?.map((event, index) =>{ 
                return(
                <tr key={index}>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>{event.startTime}-{event.endTime}</td>
                <td>{event.venue}</td>
                <td>{event.participantLimit}</td>
                <td>{event.price === "0" ? "Free" : `$${event.price}`}</td>
                <td><button className="btn btn-primary"onClick={() => handleEdit(event.id)}>Edit</button></td>
              </tr>
            )})}
          </tbody>
        </table>
        </div>
        </div>
        </div>
  )
}

export default AdminAllEvents