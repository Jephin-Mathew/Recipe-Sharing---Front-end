import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from './store/authSlice';
import '../css/LoginRegister.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: email,
        password: password,
      });

      // Store the token in local storage
      const authToken = response.data.data.access_token;

      localStorage.setItem('authToken', authToken);

      console.log('Token stored:', authToken);

      setErrorMessage('');

      var user = {
        id: response.data.data.user.id,
        email: email,
        token: authToken,
      };

      // Dispatch user information to the Redux store
      dispatch(setUser(user));

      // Perform the navigation to the desired component (e.g., '/feed')
      navigate('/feed');
    } catch (error) {
      // Handle login errors
      if (error.response.data.errors) {
        setErrorMessage('Login failed: ' + Object.values(error.response.data.errors).join(' '));
      } else if (error.response.data.message) {
        setErrorMessage('Login failed: ' + error.response.data.message);
      } else {
        setErrorMessage('Failed to login user. Please contact admin');
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="container main">
        <div className="row row1">
          <div className="col-6 side-image">
            <img className="img" src="images/white.png" alt="" />
          </div>
          <div className="col-6 right">
            <div className="input-box">
              <header>Login Here</header>
              <form onSubmit={handleLogin}>
                <div className="input-field">
                  <input
                    type="text"
                    className="input"
                    id="email"
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
                    required=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="pass">Password</label>
                </div>
                <div className="input-field">
                  <input type="submit" className="submit" value="Login" />
                </div>
              </form>
              <div className="signin">
                <span className="span">
                  Don't have an account?{' '}
                  <Link to={'/register'}>Register here</Link>
                </span>
              </div>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;