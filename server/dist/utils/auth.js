"use strict";
// utils/auth.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.createRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const createRefreshToken = (userId, isAdmin) => {
    // Create a refresh token with an expiration time (e.g., 30 days)
    const refreshExpiresIn = 30 * 24 * 60 * 60; // 30 days in seconds
    const refreshToken = jsonwebtoken_1.default.sign({ userId, isAdmin }, config_1.SECRET, { expiresIn: refreshExpiresIn });
    return refreshToken;
};
exports.createRefreshToken = createRefreshToken;
const refreshAccessToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ success: false, message: 'No refresh token provided' });
    }
    try {
        // Verify the refresh token
        const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.SECRET);
        const { userId, isAdmin } = decoded;
        // If the refresh token is valid, issue a new access token
        const accessExpiresIn = 5; // 12 hours in seconds
        const accessToken = jsonwebtoken_1.default.sign({ id: userId, isAdmin: isAdmin }, config_1.SECRET, { expiresIn: accessExpiresIn });
        // Set and send the new access token in the response
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + accessExpiresIn * 1000),
        });
        res.status(200).json({ success: true, accessToken });
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
    }
};
exports.refreshAccessToken = refreshAccessToken;
