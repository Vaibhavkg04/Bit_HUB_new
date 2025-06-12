
import express from 'express';
import { getMessages, addMessage } from '../controllers/chatController.js';

const router = express.Router();

router.get('/', getMessages);
router.post('/', addMessage);

export default router;
