import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [token, setToken] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
  console.log('Sending:', form); // ✅ Add this
  try {
    const res = await axios.post('http://localhost:5001/api/auth/login', form);
    setToken(res.data.token);
    alert('Login successful!');
    localStorage.setItem('token', res.data.token);
  } catch (err) {
    alert('Login failed');
    console.error(err);
  }
};

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
      <h2>Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <button onClick={login}>Login</button>
      {token && <p style={{ color: 'green' }}>Token: {token}</p>}
    </div>
  );
};

export default LoginForm;
