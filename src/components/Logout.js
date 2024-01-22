import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeUser } from './store/authSlice';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('authToken');

      // Make sure the token is present before making the request
      if (!token) {
        console.error('Authentication token not found');
        // Redirect to the login page
        navigate('/login');
        return;
      }

      // Include the token in the request headers
      const headers = { Authorization: `Bearer ${token}` };

      // Make a request to your logout API
      await axios.post('http://127.0.0.1:8000/api/logout', {}, { headers });

      // Dispatch an action to remove user information from the Redux store
      dispatch(removeUser());

      // Clear local storage where you store the token
      localStorage.removeItem('authToken');

      // Redirect to the login page
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      // Check for 401 status specifically and handle accordingly
      if (error.response && error.response.status === 401) {
        setError('You are not authenticated. Please log in.');
        // Redirect to the login page
        navigate('/');
      } else {
        setError('An error occurred while logging out. Please try again later.');
      }
    }
  };

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <button className="nav-link" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
