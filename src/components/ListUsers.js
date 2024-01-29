// ListUsers.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "./Header";
import checkAuth from "./auth/checkAuth";
import '../css/ListUsers.css';

function ListUsers() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        const authToken = localStorage.getItem('authToken');

        const config = {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        };

        axios.get('http://127.0.0.1:8000/api/users', config)
            .then(response => {
                console.log('API response:', response.data);
                setUsers(response.data.users); // Assuming users is the key in the API response
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFollow = (userId) => {
        const authToken = localStorage.getItem('authToken');

        const config = {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        };

        axios.post(`http://127.0.0.1:8000/api/user/${userId}/follow`, {}, config)
            .then(response => {
                const updatedUsers = users.map(user => {
                    if (user.id === userId) {
                        return {
                            ...user,
                            followers_count: user.followers_count + 1,
                        };
                    }
                    return user;
                });

                setUsers(updatedUsers);
                console.log(`You are now following ${response.data.message}`);
            })
            .catch(error => {
                console.error('Error following user:', error);
            });
    };

    const handleUnfollow = (userId) => {
        const authToken = localStorage.getItem('authToken');

        const config = {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        };

        axios.post(`http://127.0.0.1:8000/api/user/${userId}/unfollow`, {}, config)
            .then(response => {
                const updatedUsers = users.map(user => {
                    if (user.id === userId) {
                        return {
                            ...user,
                            followers_count: Math.max(0, user.followers_count - 1),
                        };
                    }
                    return user;
                });

                setUsers(updatedUsers);
                console.log(`You have unfollowed ${response.data.message}`);
            })
            .catch(error => {
                console.error('Error unfollowing user:', error);
            });
    };

    const filteredUsers = Array.isArray(users) ? users.filter(user =>
        user.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    ) : [];

    return (
        <div>
            <Header />
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <h1 className='text-center my-4'>
                            Users
                        </h1>
                        <div className='row'>
                            <div className='col-8 offset-2'>
                                <div className="mb-2">
                                    <input
                                        type="text"
                                        placeholder="Search by user name..."
                                        className="form-control"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                </div>
                            </div>
                        </div>
                        <ul className="list-group">
                            {filteredUsers.map(user => (
                                <li key={user.id} className="list-group-item custom-list-item">
                                    <div className="user-info">
                                        <h5 className="user-name">{user.name}</h5>
                                        <p>Followers: {user.followers_count}</p>
                                        <p>Following: {user.following_count}</p>
                                    </div>
                                    <div className="follow-buttons">
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleFollow(user.id)}
                                        >
                                            Follow
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleUnfollow(user.id)}
                                        >
                                            Unfollow
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(ListUsers);
