// EditProfile.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import checkAuth from './auth/checkAuth';

function EditProfile() {
    const { userId } = useParams();
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm_password] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');

        const config = {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        };

        // Ensure userId is defined before making the GET request
        if (userId) {
            axios.get(`http://127.0.0.1:8000/api/user/${userId}`, config)
                .then(response => {
                    const user = response.data;
                    // Check if the user ID from the token matches the fetched user ID
                    if (user.id !== parseInt(userId, 10)) {
                        // Unauthorized access, redirect to profile or home
                        navigate('/profile');
                    } else {
                        setName(user.name);
                        setBio(user.bio);
                        setEmail(user.email);
                        setPassword(user.password);
                        setConfirm_password(user.confirm_password);
                    }
                })
                .catch(error => {
                    console.error('Error fetching user:', error);
                });
        }
    }, [userId, navigate]);

    function updateProfile() {
        const authToken = localStorage.getItem('authToken');

        const config = {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        };

        const data = {
            name,
            bio,
            email,
            password,
            confirm_password,
            // Other fields can be added here if needed
        };

        // Ensure userId is defined before making the PUT request
        if (userId) {
            axios.put(`http://127.0.0.1:8000/api/user/${userId}`, data, config)
                .then(response => {
                    alert(response.data.message);
                    navigate('/profile');
                })
                .catch(error => {
                    console.error('Error updating user:', error);
                });
        }
    }

    return (
        <div>
            <Header />
            <div className='container'>
                <div className='row'>
                    <div className='col-8 offset-2'>
                        <h1 className='text-center'>Edit Profile</h1>
                        <div className='form-group'>
                            <label>Name:</label>
                            <input
                                type='text'
                                className='form-control'
                                value={name}
                                onChange={(event) => { setName(event.target.value) }}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Bio:</label>
                            <input
                                type='text'
                                className='form-control'
                                value={bio}
                                onChange={(event) => { setBio(event.target.value) }}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Email:</label>
                            <input
                                type='text'
                                className='form-control'
                                value={email}
                                onChange={(event) => { setEmail(event.target.value) }}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input
                                type='text'
                                className='form-control'
                                value={password}
                                onChange={(event) => { setPassword(event.target.value) }}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Confirm Password:</label>
                            <input
                                type='text'
                                className='form-control'
                                value={confirm_password}
                                onChange={(event) => { setConfirm_password(event.target.value) }}
                            />
                        </div>
                        
                        <div className='form-group'>
                            <button className='btn btn-primary float-right' onClick={updateProfile}>Update Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(EditProfile);
