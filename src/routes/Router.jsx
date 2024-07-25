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

const Router = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/event/:id" element={<MoreDetails/>}/>
        <Route path="/participatedEvents" element={<ParticipatedEvents/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/admin/all-event" element={<AdminAllEvents/>}/>
        <Route path="/admin/edit-event/:id" element={<AdminDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
