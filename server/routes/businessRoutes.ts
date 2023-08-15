import express from "express";
import { register, verifyEmail } from "../controllers/businessAuth";

const router = express.Router();

router.post('/signup', register)
router.get('/:id/verify/:token', verifyEmail)

export default router