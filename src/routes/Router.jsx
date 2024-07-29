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
import Navbar from "../components/Navbar";

const Router = () => {
  
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/event/:id" element={<MoreDetails/>}/>
               {/* User Routes */}
        <Route element={<PrivateRoute  role="user"/>}>
        <Route path="/bookedEvents" element={<ParticipatedEvents/>}/>
      </Route>
               {/* Admin Routes */}
       <Route element={<PrivateRoute  role="admin"/>}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/dashboard/all-event" element={<AdminAllEvents />} />
          <Route path="/dashboard/edit-event/:id" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
