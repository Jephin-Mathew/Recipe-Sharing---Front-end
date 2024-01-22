import React, { useState } from 'react';
import '../css/LoginRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        axios
            .post('http://127.0.0.1:8000/api/register', {
                name: name,
                email: email,
                password: password,
                password_confirmation: confirmPassword,
            })
            .then((response) => {
                setErrorMessage('');
                // Optionally, you can handle successful registration, e.g., show a success message or redirect
                console.log('Registration successful:', response.data);
                navigate('/'); // Redirect to the login page
            })
            .catch((error) => {
                if (error.response.data.errors) {
                    setErrorMessage(Object.values(error.response.data.errors).join(' '));
                } else if (error.response.data.message) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('Failed to register user. Please contact admin');
                }
            });
    };

    return (
        <>
            <div className="wrapper">
                <div className="container main">
                    <div className="row row1">
                        <div className="col-md-6 side-image">
                            <img className="img" src="images/white.png" alt="" />
                        </div>
                        <div className="col-md-6 right">
                            <div className="input-box">
                                <header>Register Now</header>
                                <form onSubmit={handleRegister}>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            className="input"
                                            id="name"
                                            name="name"
                                            required=""
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <label htmlFor="name">Name</label>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            className="input"
                                            id="email"
                                            name="email"
                                            required=""
                                            autoComplete="off"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="password"
                                            className="input"
                                            id="pass"
                                            name="password"
                                            required=""
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <label htmlFor="pass">Password</label>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="password"
                                            className="input"
                                            id="C_pass"
                                            name="confirm_password"
                                            required=""
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <label htmlFor="C_pass">Confirm Password</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="submit" className="submit" value="Register" />
                                    </div>
                                </form>
                                <div className="signin">
                                    <span className="span">
                                        Already have an account? <Link to={'/'}>Login here</Link>
                                    </span>
                                </div>
                                {errorMessage && <div className="error-message">{errorMessage}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
