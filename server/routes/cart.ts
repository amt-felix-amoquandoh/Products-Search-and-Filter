import express from 'express';
import { addToCart, removeFromCart, getCart } from '../controllers/cart';
import { verifyUser } from '../middlewares/verifyToken';


const router = express.Router();

router.post('/', verifyUser, addToCart);

router.delete('/:item_id', verifyUser, removeFromCart);

router.get('/:user_id',verifyUser, getCart);


export default router;