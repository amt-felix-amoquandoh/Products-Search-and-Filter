"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.resetVerifyEmail = void 0;
const db_1 = __importDefault(require("../db"));
const crypto_1 = __importDefault(require("crypto"));
const email_1 = require("../utils/email");
const bcrypt_1 = require("bcrypt");
const resetVerifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const { rows: customer } = yield db_1.default.query('select id from customers where email=$1', [email]);
        if (customer[0]) {
            const token = crypto_1.default.randomBytes(32).toString('hex');
            const url = `http://localhost:8000/reset-password/${customer[0].id}/${token}`;
            yield (0, email_1.sendEmail)(email, "Password reset link", url);
            res.status(200).json({
                success: true,
                message: 'password-reset link sent to your mail'
            });
        }
        else {
            const { rows: business } = yield db_1.default.query('select id from businesses where email=$1', [email]);
            if (!business[0]) {
                return res.status(404).json({
                    success: false,
                    message: "User doesn't exist",
                });
            }
            const token = crypto_1.default.randomBytes(32).toString('hex');
            const url = `http://localhost:8000/reset-password/${business[0].id}/${token}`;
            yield (0, email_1.sendEmail)(email, "Password Reset", url);
            res.status(200).json({
                success: true,
                message: 'password-reset link sent to your mail'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.resetVerifyEmail = resetVerifyEmail;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.params;
    const { newPassword } = req.body;
    try {
        const { rows: customer } = yield db_1.default.query('select * from customers where id=$1', [id]);
        if (customer[0]) {
            const samePassword = yield (0, bcrypt_1.compare)(newPassword, customer[0].password);
            if (samePassword)
                return res.status(500).json({ success: false, message: "you can't use this password, change another" });
            const hashedPassword = yield (0, bcrypt_1.hash)(newPassword, 10);
            yield db_1.default.query('UPDATE customers SET password = $1 WHERE id = $2', [hashedPassword, id]);
            res.status(200).json({
                success: true,
                message: 'Password reset successful'
            });
        }
        else {
            const { rows: business } = yield db_1.default.query('select * from businesses where id=$1', [id]);
            if (!business[0]) {
                return res.status(404).json({
                    success: false,
                    message: "User doesn't exist",
                });
            }
            const samePassword = yield (0, bcrypt_1.compare)(newPassword, business[0].password);
            if (samePassword)
                return res.status(500).json({ success: false, message: "you can't use this password, change another" });
            const hashedPassword = yield (0, bcrypt_1.hash)(newPassword, 10);
            yield db_1.default.query('UPDATE businesses SET password = $1 WHERE id = $2', [hashedPassword, id]);
            res.status(200).json({
                success: true,
                message: 'Password reset successful'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.changePassword = changePassword;
