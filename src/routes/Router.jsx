import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Main from "../pages/Main";
import About from "../components/About";
import Contact from "../components/Contact";
import MoreDetails from "../pages/Moredetails";
import AdminDashboard from "../pages/AdminDashboard";
import CreateEvent from "../pages/CreateEvent";
import ManageSlots from "../pages/ManageSlots";
import ManagePayments from "../pages/ManagePayments";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/event/:id" element={<MoreDetails/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/admin/create-event" element={<CreateEvent/>}/>
        <Route path="/admin/manage-slots" element={<ManageSlots/>}/>
        <Route path="/admin/manage-payments" element={<ManagePayments/>}/>

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
