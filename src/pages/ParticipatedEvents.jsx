import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Modal from 'react-modal'

const ParticipatedEvents = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      };
    const handleViewClick = (ticket) => {
        // setSelectedTicket(ticket);
        setModalIsOpen(true);
      };

  return (
    <div className="App">
    <Navbar />
    <section className="d-flex justify-content-center align-items-center gradient-form" style={{ height: "100vh" }}>
      <div className="container py-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-10">
            <div className="card rounded-3 text-black">
              <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                        <span>Events you've</span>
                      <h4 className="mt-1 mb-5 pb-1">Participated</h4>
                    </div>
                    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Booked On</th>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Tickets</th>
          </tr>
        </thead>
        <tbody>
            <tr key={"payment.id"}>
              <td>{"payment.id"}</td>
              <td>{"payment.event"}</td>
              <td>${"payment.amount"}</td>
              <td><button  className="btn btn-primary" onClick={() => handleViewClick("event")}>view</button></td>
            </tr>
        </tbody>
      </table>
    </div> 
    {/* <div className="text-center">
                      <h4 className="mt-1 mb-5 pb-1">No Events have been Participated</h4>
                    </div> */}
                   
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={()=>setModalIsOpen(false)}>
                      <div className="modal-content align-items-center justify-content-center">
                        <div className="modal-body text-center m-5 ">
                       
      <h3 className='mb-4'>Ticket Details</h3>
      <p><strong>Booked On:</strong> {"ticket.bookedOn"}</p>
      <p><strong>Event Name:</strong> {"ticket.eventName"}</p>
      <p><strong>Event Date:</strong> {"ticket.eventDate"}</p>
      <p><strong>Tickets:</strong> 4</p>
                          <div className="modal-footer ">
                            <button className="btn btn-secondary mx-2" onClick={()=>setModalIsOpen(false)}>close</button>
                           
                          </div>
                        </div>
                      </div>
                 </Modal>
  </div>
  )
}

export default ParticipatedEvents