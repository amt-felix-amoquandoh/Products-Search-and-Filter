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
exports.verifyEmail = exports.register = void 0;
const index_js_1 = __importDefault(require("../db/index.js"));
const bcrypt_1 = require("bcrypt");
const email_1 = require("../utils/email");
const crypto_1 = __importDefault(require("crypto"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, address, phone, category, website, description, password } = req.body;
    try {
        const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
        const token = crypto_1.default.randomBytes(32).toString('hex');
        const { rows } = yield index_js_1.default.query("insert into businesses (name, email, address, phone, category, website, description, password) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *", [name, email, address, phone, category, website, description, hashedPassword]);
        yield index_js_1.default.query("insert into verification_tokens_business (businessId, token) values ($1, $2)", [rows[0].id, token]);
        const url = `https://travel-booking-tau.vercel.app/business-auth/${rows[0].id}/verify/${token}`;
        yield (0, email_1.sendEmail)(rows[0].email, "Verify Email", url);
        res.status(200).json({
            success: true,
            message: 'email sent to your account, please verify'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "signup failed. Try again"
        });
    }
});
exports.register = register;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.params;
    try {
        const { rows } = yield index_js_1.default.query('select * from businesses where id=$1', [id]);
        if (!rows[0])
            return res.status(400).send({ message: "Invalid link" });
        const results = yield index_js_1.default.query('select * from verification_tokens_business where businessId=$1', [rows[0].id]);
        if (!results.rows[0])
            return res.status(400).send({ message: "Invalid link" });
        yield index_js_1.default.query("UPDATE businesses SET verified = true WHERE id = $1", [rows[0].id]);
        yield index_js_1.default.query("DELETE FROM verification_tokens_business WHERE businessId=$1", [rows[0].id]);
        res.redirect('http://localhost:8000/login');
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Email not verified' });
    }
});
exports.verifyEmail = verifyEmail;
