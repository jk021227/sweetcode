import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const isAuthenticated = !!token; // Check if token exists
  
    return isAuthenticated ? children : <Navigate to="/landing" />;
  };
export default ProtectedRoute;
