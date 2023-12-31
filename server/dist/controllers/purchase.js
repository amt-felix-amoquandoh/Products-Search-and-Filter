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
exports.purchase = void 0;
const stripe_1 = require("stripe");
const dotenv_1 = require("dotenv");
const config_1 = require("../config");
const db_1 = __importDefault(require("../db"));
(0, dotenv_1.config)();
const stripe = new stripe_1.Stripe(config_1.STRIPE_KEY, {
    apiVersion: '2022-11-15',
});
const purchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stripeTokenId, products } = req.body;
    let total = 0;
    try {
        products.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            const { rows: product } = yield db_1.default.query('select * from $1 where id=$2', [item.product_type, item.id]);
            total += product[0].price;
        }));
        const charge = yield stripe.charges.create({
            amount: total,
            source: stripeTokenId,
            currency: "usd"
        });
        res.status(200).json({
            success: true,
            message: "Transaction successful",
            charge
        });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.purchase = purchase;
