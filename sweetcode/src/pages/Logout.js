import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear token from localStorage or cookies
    localStorage.removeItem('token'); // If using localStorage
    // If using cookies, you can clear the cookie here

    // Redirect to login page
    navigate('/login');
  }, [navigate]);

  return null; // No UI needed for logout
};

export default Logout;
