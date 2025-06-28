import express from 'express';
import { sendOtp, registerUser,loginUser ,getUserProfile} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticate, getUserProfile);
export default router;
