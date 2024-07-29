import { isEmpty } from 'lodash';
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ role }) => {
    // console.log('role: ', role);
    const { currentUser, AuthSuccess } = useSelector((state) => state.Reducers);
    // console.log('currentUser: ', currentUser, "AuthSuccess", AuthSuccess);

    if (isEmpty(currentUser)) {
        return <Navigate to={'/'} />;
    }

    if (role && currentUser.role !== role) {
        return <Navigate to={'/'} />;
    }

    return <Outlet />;
}

export default PrivateRoute