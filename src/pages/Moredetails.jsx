import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Modal from "react-modal";
import { toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { GetEvents } from '../redux/action/commonAction';
import { isEmpty } from 'lodash';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../servies/firebase';

const MoreDetails = () => {
  const [ticket,setTicket]=useState(0)
  const {currentUser}=useSelector((state)=>state.Reducers)
  const { id } = useParams();
  const navigate =useNavigate();
  const dispatch=useDispatch()
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const {getUser} =useSelector((state)=>state.Reducers)

  useEffect(() => {
    dispatch(GetEvents())
    }, [])
  
  const event = getUser.find(event => event.id === id);
 
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
  const handleAttend = async() => {
    if(!isEmpty(currentUser)){
      setModalIsOpen(false)
      setModalOpen(true);
    }else{
      toast.error('Please login to attend event');
    }
  }

  const handleModal = () => {
    if(event?.AvailableTickets<=0){
      toast.error('Tickets sold out');
    }else{
    setModalIsOpen(true);
  }
};

  const handleBookTicket=async()=>{
    if(ticket>0&&ticket<8){
      if (ticket <= event.AvailableTickets) {
        try {
          await updateDoc(doc(db,"events",event.id),{...event,AvailableTickets:event.AvailableTickets-ticket})
          await dispatch(GetEvents())
          await updateDoc(doc(db,"users",currentUser?.id),{ticketsBooked:arrayUnion({...event,ticketBooked:ticket})})
          toast.success('Tickets booked successfully');
          setModalOpen(false)
          navigate('/')
          setTicket(0)
        } catch (error) {
          console.error(error)
        }
      } else {
        toast.error('Tickets are not available');
    }
  }else{
    toast.error('Please select a ticket between 1 and 8');
  }
}

const handleTickets = (e) => {
  const { name, value,} = e.target;
  const numericValue = parseInt(value.replace(/\D/g, ""), 10);
  setTicket(numericValue > 0 ? numericValue : 0);
}


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
                      <p><strong>Event On :</strong> {event.date}</p>
                      <p><strong>Timings : </strong> {event.startTime} - {event.endTime}</p>
                      <p><strong>Venue : </strong>{event.venue}</p>
                      <p><strong>Participant Limit : </strong> {event.participantLimit}</p>
                      <p><strong>Available tickets : </strong>{event?.AvailableTickets}</p>
                      <p><strong>Organizer : </strong> {event.description}</p>
                      <p><strong>Description : </strong> {event.details || 'No additional details provided.'}</p>
                      <button className="d-flex justify-content-center btn btn-primary" onClick={handleModal} disabled={event?.AvailableTickets<=0}>Book Now</button>
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
      <Modal isOpen={modalOpen} style={customStyles} onRequestClose={()=>{setModalOpen(false)
         setTicket(0)}
      }>
                      <div className="modal-content align-items-center justify-content-center">
                        <div className="modal-body text-center">
                          <h5 className="modal-title mb-4 ">Tickets</h5>
                          <p>Choose the number of tickets you want to book</p>
                          <input type="text" className='form-control' onChange={handleTickets} value={ticket} name='ticket'/>
                          <div className="modal-footer mt-3">
                            <button className="btn btn-secondary mx-2" onClick={()=>{setModalOpen(false)
                              setTicket(0)
                            }}>cancel</button>
                            <button className="btn btn-primary mx-2"onClick={handleBookTicket}>Book ticket</button>
                          </div>
                        </div>
                      </div>
      </Modal>
                 <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={()=>setModalIsOpen(false)}>
                      <div className="modal-content align-items-center justify-content-center">
                        <div className="modal-body text-center">
                          <h5 className="modal-title mb-4 ">Conformation</h5>
                          <p>Are you sure you want to attend this event?</p>
                          <div className="modal-footer mt-3">
                            <button className="btn btn-secondary mx-2" onClick={()=>setModalIsOpen(false)}>cancel</button>
                            <button className="btn btn-primary mx-2"onClick={handleAttend}>Attend</button>
                          </div>
                        </div>
                      </div>
      </Modal>
                
    </div>
  );
};

export default MoreDetails;
