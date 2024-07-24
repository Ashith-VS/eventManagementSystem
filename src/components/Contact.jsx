import React from 'react';
import Navbar from '../components/Navbar';

const Contact = () => {
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
                    <h4 className="mt-1 mb-5 pb-1">Contact Us</h4>
                  </div>
                  <form>
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
    </div>
  );
};

export default Contact;
