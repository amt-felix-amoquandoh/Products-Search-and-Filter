"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const businessAuth_1 = require("../controllers/businessAuth");
const router = express_1.default.Router();
router.post('/signup', businessAuth_1.register);
router.get('/:id/verify/:token', businessAuth_1.verifyEmail);
exports.default = router;
