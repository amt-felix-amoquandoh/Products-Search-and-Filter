import express from 'express'
import { login, logout, register, verifyEmail } from '../controllers/customersAuth';

import { refreshAccessToken } from '../utils/auth'; 
import { verifyToken } from '../middlewares/verifyToken';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/logout',verifyToken, logout)
router.get('/:id/verify/:token', verifyEmail)

router.post('/refresh-token', refreshAccessToken);


export default router