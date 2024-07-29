import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate =useNavigate()
  const { currentUser} = useSelector((state) => state.Reducers);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isEmpty(currentUser)){
     setLoginModalOpen(true)
    }else{
      alert('Form submitted successfully!');
    }
  }
  
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
  return (
    <div className="App">
      <section className="d-flex justify-content-center align-items-center gradient-form" style={{ height: "100vh" }}>
        <div className="container py-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-10">
              <div className="card rounded-3 text-black">
                <div className="card-body p-md-5 mx-md-4">
                  <div className="text-center">
                    <h4 className="mt-1 mb-5 pb-1">Contact Us</h4>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                      <label htmlFor="name">Name</label>
                      <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="email">Email</label>
                      <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="message">Message</label>
                      <textarea className="form-control" id="message" rows="4" placeholder="Enter your message"></textarea>
                    </div>
                    <div className="text-center pt-1 mb-3 pb-1">
                      <button type="submit" className="btn btn-primary mb-3">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal isOpen={loginModalOpen} style={customStyles} onRequestClose={() => setLoginModalOpen(false)}>
        <div className="modal-content align-items-center justify-content-center">
          <div className="modal-body text-center">
            <h5 className="modal-title mb-4">Login Required</h5>
            <p>Please log in to book tickets for this event.</p>
            <div className="modal-footer mt-3">
              <button className="btn btn-secondary mx-2" onClick={() => setLoginModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary mx-2" onClick={() => navigate('/login')}>Login</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Contact;
