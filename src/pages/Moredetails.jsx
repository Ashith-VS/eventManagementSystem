import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Modal from "react-modal";
import { toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { GetEvents } from '../redux/action/commonAction';


const MoreDetails = () => {
  const { id } = useParams();
  const navigate =useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [Isparticipate, setIsparticipate] = useState(false)
  
  const dispatch=useDispatch()
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
  const handleAttend = () => {
    toast.success('Participate successfully');
    setIsparticipate(true);
    setModalIsOpen(false);
  }

  const handleModal = () => {
    if(Isparticipate){
     navigate('/participatedEvents')
    }else{
    setModalIsOpen(true);
  }
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
                  {event ? (
                    <>
                      <div className="text-center">
                        <h4 className="mt-1 mb-5 pb-1">{event.name}</h4>
                      </div>
                      <p><strong>Event On :</strong> {event.date}</p>
                      <p><strong>Timings : </strong> {event.startTime} - {event.endTime}</p>
                      <p><strong>Venue : </strong>{event.venue}</p>
                      <p><strong>Participant Limit : </strong> {event.participantLimit}</p>
                      <p><strong>Organizer : </strong> {event.description}</p>
                      <p><strong>Description : </strong> {event.details || 'No additional details provided.'}</p>
                      <button className="d-flex justify-content-center btn btn-primary" onClick={handleModal}>{Isparticipate?"View Ticket":"Book Now"}</button>
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
