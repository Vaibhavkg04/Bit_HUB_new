
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import chatRoutes from './routes/chatRoutes.js';
import setupSocket from './socket.js';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());
app.use('/api/messages', chatRoutes);

setupSocket(io);

mongoose.connect('mongodb://127.0.0.1:27017/socketchat')
  .then(() => {
    server.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error(err));
