"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const customerRoutes_1 = __importDefault(require("./routes/customerRoutes"));
const businessRoutes_1 = __importDefault(require("./routes/businessRoutes"));
const passwordResetRoutes_1 = __importDefault(require("./routes/passwordResetRoutes"));
const accomodation_1 = __importDefault(require("./routes/accomodation"));
const cart_1 = __importDefault(require("./routes/cart"));
const purchase_1 = __importDefault(require("./routes/purchase"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: true,
    credential: true
};
//middleware
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.send("<h1>TRAVEL BOOKING SERVER</h1>");
});
//routes
app.use("/customer-auth", customerRoutes_1.default);
app.use("/business-auth", businessRoutes_1.default);
app.use("/", passwordResetRoutes_1.default);
app.use("/api/accomodations", accomodation_1.default);
app.use('/cart', cart_1.default);
app.use('/purchase', purchase_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
