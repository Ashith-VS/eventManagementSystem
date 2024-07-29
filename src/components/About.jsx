import React from 'react';

const About = () => {
  return (
    <div className="App">
      <section className="d-flex justify-content-center align-items-center gradient-form" style={{ height: "100vh" }}>
        <div className="container py-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-10">
              <div className="card rounded-3 text-black">
                <div className="card-body p-md-5 mx-md-4">
                  <div className="text-center">
                    <h4 className="mt-1 mb-5 pb-1">About Us</h4>
                  </div>
                  <div>
                    <p>Welcome to our Event Management System. Our mission is to provide the best service for managing your events, whether they are small gatherings or large conferences. We offer a variety of tools and features to help you plan, organize, and execute your events smoothly and efficiently.</p>
                    <p>Our team is composed of experienced professionals in event management, and we are dedicated to making your event a success. From venue selection to guest management, we have you covered.</p>
                    <p>If you have any questions or need assistance, feel free to contact us. We are here to help you create memorable events that your attendees will love.</p>
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

export default About;
