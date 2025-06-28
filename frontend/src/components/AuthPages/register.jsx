import React, { useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';
import './register.css';

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    branch: '',
    batch: '',
    hostel: '',
  });

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5001/api/auth/send-otp', { email: form.email });
      const serverOtp = res.data.otp;

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          email: form.email,
          passcode: serverOtp,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      localStorage.setItem('serverOtp', serverOtp);
      setOtpSent(true);
      alert('OTP sent to email');
    } catch (err) {
      console.error(err);
      alert('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyAndRegister = async () => {
    setLoading(true);
    if (otp === localStorage.getItem('serverOtp')) {
      try {
        await axios.post('http://localhost:5001/api/auth/register', form);
        setVerified(true);
        alert('Registration successful!');
      } catch (err) {
        alert('Error saving user');
      }
    } else {
      alert('Invalid OTP');
    }
    setLoading(false);
  };

  const isFormValid = form.name && form.email && form.password && form.branch && form.batch && form.hostel;

  if (verified) {
    return (
      <div className="container">
        <div className="form-card">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Registration Complete!</h2>
            <p>Welcome to our community</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-card">
        <div className="form-header">
          <h2>User Registration</h2>
          <p>Join our academic community</p>
        </div>

        {!otpSent ? (
          <form className="form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your full name"
                onChange={handleChange}
                value={form.name}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleChange}
                value={form.email}
                required
              />
            </div>
            <div className="form-group">
              <label>Create Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your New Password"
                onChange={handleChange}
                 value={form.password}
                
                required
              />
            </div>

            <div className="form-group">
              <label>Branch</label>
              <select name="branch" onChange={handleChange} value={form.branch} required>
                <option value="">Select Branch</option>
                <option value="CS">Computer Science</option>
                <option value="ECE">Electronics & Communication</option>
              </select>
            </div>

            <div className="form-group">
              <label>Batch Year</label>
              <select name="batch" onChange={handleChange} value={form.batch} required>
                <option value="">Select Batch</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>

            <div className="form-group">
              <label>Hostel</label>
              <select name="hostel" onChange={handleChange} value={form.hostel} required>
                <option value="">Select Hostel</option>
                <option value="Hostel 1">Hostel 1</option>
              </select>
            </div>

            <button
              type="button"
              onClick={sendOtp}
              disabled={!isFormValid || loading}
              className="btn btn-primary"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <div className="otp-section">
            <div className="otp-header">
              <h3>Verify Your Email</h3>
              <p>We've sent a code to <strong>{form.email}</strong></p>
            </div>

            <div className="form-group">
              <label>Verification Code</label>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                maxLength={6}
                className="otp-input"
              />
            </div>

            <button
              onClick={verifyAndRegister}
              disabled={!otp || loading}
              className="btn btn-success"
            >
              {loading ? 'Verifying...' : 'Verify & Register'}
            </button>

            <button
              onClick={() => setOtpSent(false)}
              className="btn btn-link"
            >
              ← Back to edit details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;