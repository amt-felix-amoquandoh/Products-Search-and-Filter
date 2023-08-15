"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passwordReset_1 = require("../controllers/passwordReset");
const router = express_1.default.Router();
router.post("/check-email", passwordReset_1.resetVerifyEmail);
router.post("/reset-password/:id/:token", passwordReset_1.changePassword);
exports.default = router;
