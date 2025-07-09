import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import chatRoutes from './routes/chatRoutes.js'; // REST API routes
import AlumniRoutes from './routes/AlumnichatRoutes.js';
import setupSocket from './socket.js'; // Socket.IO setup
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';



dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/messages', chatRoutes);
app.use('/api/messages/Alumni', AlumniRoutes); // REST API route for messages
app.use('/api/auth', authRoutes);
// Socket.IO setup
setupSocket(io);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/socketchat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  const PORT = process.env.PORT || 5001;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));
