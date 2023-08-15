"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_1 = require("../controllers/cart");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = express_1.default.Router();
router.post('/', verifyToken_1.verifyUser, cart_1.addToCart);
router.delete('/:item_id', verifyToken_1.verifyUser, cart_1.removeFromCart);
router.get('/:user_id', verifyToken_1.verifyUser, cart_1.getCart);
exports.default = router;
