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
exports.logout = exports.login = exports.verifyEmail = exports.register = void 0;
const index_js_1 = __importDefault(require("../db/index.js"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_1 = require("../utils/email");
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../config");
const auth_1 = require("../utils/auth");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, email, password } = req.body;
    try {
        const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
        const token = crypto_1.default.randomBytes(32).toString('hex');
        const { rows } = yield index_js_1.default.query("insert into customers (fullname, email, password) values ($1, $2, $3) returning *", [fullname, email, hashedPassword]);
        yield index_js_1.default.query("insert into verification_tokens (customerId, token) values ($1, $2)", [rows[0].id, token]);
        const url = `https://travel-booking-tau.vercel.app/customer-auth/${rows[0].id}/verify/${token}`;
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
        const { rows } = yield index_js_1.default.query('select * from customers where id=$1', [id]);
        if (!rows[0])
            return res.status(400).send({ message: "Invalid link" });
        const results = yield index_js_1.default.query('select * from verification_tokens where customerId=$1', [rows[0].id]);
        if (!results.rows[0])
            return res.status(400).send({ message: "Invalid link" });
        yield index_js_1.default.query("UPDATE customers SET verified = true WHERE id = $1", [rows[0].id]);
        yield index_js_1.default.query("DELETE FROM verification_tokens WHERE customerId=$1", [rows[0].id]);
        res.redirect('http://localhost:8000/login');
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Email not verified' });
    }
});
exports.verifyEmail = verifyEmail;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Check in customers table
        const { rows: customerRows } = yield index_js_1.default.query('SELECT * FROM customers WHERE email = $1', [email]);
        if (customerRows[0]) {
            // User found in customers table
            if (!customerRows[0].verified)
                return res.status(401).json({ success: false, message: 'check your email for verification email' });
            // Check if password is correct for the customer
            const isCorrectPassword = yield (0, bcrypt_1.compare)(password, customerRows[0].password);
            if (!isCorrectPassword) {
                return res.status(401).json({ success: false, message: "Wrong password" });
            }
            const { id, isAdmin, fullname, phonenumber, address } = customerRows[0];
            // Create access token
            const accessExpiresIn = 12 * 60 * 60; // 12 hours in seconds
            const accessToken = jsonwebtoken_1.default.sign({ id: id, isAdmin: isAdmin }, config_1.SECRET, { expiresIn: accessExpiresIn });
            // Create refresh token
            const refreshToken = (0, auth_1.createRefreshToken)(id, isAdmin); // Implement this function to create a refresh token
            // Set and send cookies to browser and client
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                expires: new Date(Date.now() + accessExpiresIn * 1000),
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Refresh token expires in 30 days
            });
            return res.status(200).json({
                success: true,
                accessToken,
                refreshToken,
                data: { id, fullname, email, phonenumber, address },
            });
        }
        else {
            // If user not found in customers table, check in businesses table
            const { rows: businessRows } = yield index_js_1.default.query('SELECT * FROM businesses WHERE email = $1', [email]);
            if (!businessRows[0]) {
                return res.status(404).json({
                    success: false,
                    message: "User doesn't exist",
                });
            }
            if (!businessRows[0].verified)
                return res.status(401).json({ success: false, message: "check your mail for verificaion link" });
            // Check if password is correct for the business
            const isCorrectPassword = yield (0, bcrypt_1.compare)(password, businessRows[0].password);
            if (!isCorrectPassword) {
                return res.status(401).json({ success: false, message: "Wrong password" });
            }
            const { id, name, isAdmin, category, phone, address, website, description } = businessRows[0];
            // Create access token
            const expiresIn = 12 * 24 * 60 * 60 * 1000; // 12 days in milliseconds
            const accessToken = jsonwebtoken_1.default.sign({ id: id, isAdmin: isAdmin }, config_1.SECRET, { expiresIn: "12d" });
            // Create refresh token
            const refreshToken = (0, auth_1.createRefreshToken)(id, isAdmin); // Implement this function to create a refresh token
            // Set and send cookies to browser and client
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                expires: new Date(Date.now() + expiresIn),
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Refresh token expires in 30 days
            });
            return res.status(200).json({
                success: true,
                accessToken,
                refreshToken,
                data: { id, name, category, email, phone, address, website, description },
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Login failed' });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Clear the access token cookie
    res.clearCookie('accessToken', { httpOnly: true });
    // Respond with a success message
    res.status(200).json({ success: true, message: 'Logged out successfully' });
});
exports.logout = logout;
