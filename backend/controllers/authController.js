import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// 👉 Send OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Simple 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // ⚠️ In real apps, store & expire OTP
  res.json({ otp });
};

// 👉 Register User (after OTP verified)
export const registerUser = async (req, res) => {
  const {image, name, email, password, branch, batch, hostel } = req.body;

  if (!name || !email || !password || !branch || !batch || !hostel) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      branch,
      batch,
      hostel,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
};

// 👉 Login User with JWT
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request:', email, password);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (!user.password) {
      return res.status(400).json({ message: 'Password not set for this account' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({userId: user._id, email: user.email}, process.env.JWT_SECRET || 'your_jwt_secret', {
      expiresIn: '1d',
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};
