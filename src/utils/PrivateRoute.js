import { isEmpty } from 'lodash';
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ role }) => {
    const { currentUser } = useSelector((state) => state.Reducers);

    if(isEmpty(currentUser)){
        return <Navigate to={'/login'} />;
    }

    if (role && currentUser.role !== role) {
        return <Navigate to={'/'} />;
    }

    return !isEmpty(currentUser) ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute