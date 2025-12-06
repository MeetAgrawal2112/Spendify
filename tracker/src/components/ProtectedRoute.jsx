import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // Check if user has a token
    const token = localStorage.getItem('token');

    // If no token, redirect to login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If token exists, render the protected child routes
    return <Outlet />;
};

export default ProtectedRoute;
