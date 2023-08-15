import express from 'express';
import { changePassword, resetVerifyEmail } from '../controllers/passwordReset';

const router = express.Router();

router.post("/check-email", resetVerifyEmail);
router.post("/reset-password/:id/:token", changePassword)

export default router;