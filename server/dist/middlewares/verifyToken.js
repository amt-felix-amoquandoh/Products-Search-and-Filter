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
exports.verifyAdmin = exports.verifyUser = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken } = req.cookies;
    const { refreshToken } = req.cookies;
    if (!accessToken && !refreshToken) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
    }
    // Function to issue a new access token using the refresh token
    const issueNewAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.SECRET);
            const { userId, isAdmin } = decoded;
            // Here, you should implement a function to validate the refresh token and ensure it is still valid.
            // For example, check if it exists in a database and hasn't expired.
            // Create a new access token
            const accessExpiresIn = 12 * 60 * 60; // 12 hours in seconds
            const newAccessToken = jsonwebtoken_1.default.sign({ id: userId, isAdmin: isAdmin }, process.env.SECRET, { expiresIn: accessExpiresIn });
            // Set and send the new access token in the response
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                expires: new Date(Date.now() + accessExpiresIn * 1000),
            });
            // Assign the user to the request object for other middlewares/routes to use
            req.user = { id: userId, isAdmin: isAdmin };
            return true;
        }
        catch (error) {
            // The refresh token is either invalid or expired
            return false;
        }
    });
    if (accessToken) {
        // Verify the access token
        jsonwebtoken_1.default.verify(accessToken, process.env.SECRET, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                // If the access token is invalid or expired, try using the refresh token to get a new access token
                const refreshed = yield issueNewAccessToken();
                if (!refreshed) {
                    res.status(401).json({ success: false, message: 'Unauthorized' });
                    return;
                }
                next();
            }
            else {
                // Access token is valid, assign the user to the request object and proceed
                req.user = user;
                next();
            }
        }));
    }
    else if (refreshToken) {
        // Use the refresh token to issue a new access token
        const refreshed = yield issueNewAccessToken();
        if (!refreshed) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        next();
    }
});
exports.verifyToken = verifyToken;
const verifyUser = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        var _a, _b;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.isAdmin)) {
            next();
        }
        else {
            res.status(401).json({ success: false, message: 'Not authorized' });
        }
    });
};
exports.verifyUser = verifyUser;
const verifyAdmin = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        var _a;
        if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin) {
            next();
        }
        else {
            res.status(401).json({ success: false, message: 'Not Admin' });
        }
    });
};
exports.verifyAdmin = verifyAdmin;
