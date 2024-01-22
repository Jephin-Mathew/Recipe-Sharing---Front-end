import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { redirect } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const user = useSelector((state) => state.auth.user);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        if (user) {
          // Fetch user data to check if the user is an admin
          const response = await axios.get('/api/user');  // Assuming this endpoint provides the current logged-in user's data

          // Assuming the response includes the complete user data
          const userData = response.data;

          // Check if the user is an admin (you may have a different way to determine this)
          setIsAdmin(userData.role === 'admin');
        }
      } catch (error) {
        // Handle error, e.g., redirect to login page
        console.error('Error checking admin status:', error);
      }
    };

    checkAdminStatus();
  }, [user]);

  // If user is not logged in or not an admin, redirect to login page
  if (!user || !isAdmin) {
    return <redirect to="/" />;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {/* Add admin-specific content and functionality here */}
      {/* For example, you can include links to manage users and reported content */}
      <p>Manage Users: <a href="/admin/users">View Users</a></p>
      <p>Content Moderation: <a href="/admin/content">View Reported Content</a></p>
      {/* Add more admin features as needed */}
    </div>
  );
}

export default AdminDashboard;
