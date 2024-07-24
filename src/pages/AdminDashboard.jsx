import React from 'react'
import Sidebar from '../components/Sidebar'
import CreateEvent from './CreateEvent'

const AdminDashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-3">
        <CreateEvent/>
      </div>
    </div>
  )
}

export default AdminDashboard