import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Main from "../pages/Main";
import About from "../components/About";
import Contact from "../components/Contact";
import MoreDetails from "../pages/Moredetails";
import AdminDashboard from "../pages/AdminDashboard";
import ParticipatedEvents from "../pages/ParticipatedEvents";
import AdminAllEvents from "../pages/AdminAllEvents";
import PrivateRoute from "../utils/PrivateRoute";

const Router = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main/>}/>
        <Route path="/register" element={<Register />} />
      
        <Route element={<PrivateRoute  role="user"/>}>
        <Route path="/event/:id" element={<MoreDetails/>}/>
        <Route path="/bookedEvents" element={<ParticipatedEvents/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Route>

       <Route element={<PrivateRoute  role="admin"/>}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/all-event" element={<AdminAllEvents />} />
          <Route path="/admin/edit-event/:id" element={<AdminDashboard />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
