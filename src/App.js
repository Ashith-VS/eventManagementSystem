import React from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Router from './routes/Router'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const App = () => {
  return (
    <>
   <Router/>
   <ToastContainer 
    position="top-center"
    autoClose={2000}
    hideProgressBar
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    transition={Slide}
/></>
  )
}

export default App