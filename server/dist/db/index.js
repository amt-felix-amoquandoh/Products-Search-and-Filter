"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { Pool } = pg_1.default;
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require"
    // user: "postgres",
    // password: "dallas",
    // host: "localhost",
    // database: "travel_booking",
    // port: 5432,
});
pool.connect((err) => {
    if (err)
        throw err;
    console.log("Database connected");
});
exports.default = {
    query: (text, params) => pool.query(text, params)
};
