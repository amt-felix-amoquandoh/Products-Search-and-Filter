import express from 'express';
import { purchase } from '../controllers/purchase';
import { verifyUser } from '../middlewares/verifyToken';

const router = express.Router();

router.post('/',verifyUser, purchase)

export default router