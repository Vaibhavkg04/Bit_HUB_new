import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; // Link to the CSS file

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [token, setToken] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
  console.log('Sending:', form);
  try {
    const res = await axios.post('http://localhost:5001/api/auth/login', form);
    setToken(res.data.token);
    localStorage.setItem('token', res.data.token);
    alert('Login successful!');
    navigate('/dashboard'); 
  } catch (err) {
    alert('Login failed');
    console.error(err);
  }
};


  const goToRegister = () => {
    navigate('/Register');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="login-input"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          className="login-input"
        />
        <button onClick={login} className="login-button">Login</button>

        {token && <p className="login-token">Token: {token}</p>}

        <div className="login-footer">
          <button onClick={goToRegister} className="register-link">
            Not registered? Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
