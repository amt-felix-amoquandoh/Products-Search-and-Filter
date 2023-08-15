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
exports.getCart = exports.removeFromCart = exports.addToCart = void 0;
const db_1 = __importDefault(require("../db"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, product_type, user_id } = req.body;
    try {
        const validProductTypes = ['hotel', 'accommodations', 'flight'];
        if (!validProductTypes.includes(product_type)) {
            return res.status(400).json({ error: 'Invalid product_type' });
        }
        // Check if the product_id exists in the specified product_type table before adding it to the cart
        const productQuery = `SELECT * FROM ${product_type} WHERE id = $1`;
        const productResult = yield db_1.default.query(productQuery, [product_id]);
        if (productResult.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const query = `
      INSERT INTO cart (product_id, product_type, user_id)
      VALUES ($1, $2, $3)
    `;
        yield db_1.default.query(query, [product_id, product_type, user_id]);
        res.status(201).json({ success: true, message: 'Item added to cart successfully' });
    }
    catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ success: false, error: 'An error occurred while adding the item to cart' });
    }
});
exports.addToCart = addToCart;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { item_id } = req.params;
    try {
        yield db_1.default.query('delete from cart where id=$1', [item_id]);
        res.status(200).json({ success: true, message: 'Item removed from cart successfully' });
    }
    catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ success: false, error: 'An error occurred while removing the item from cart' });
    }
});
exports.removeFromCart = removeFromCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    try {
        const query = `
      SELECT c.id AS cart_item_id,
            p.*
      FROM cart AS c
      JOIN ${sanitizeTableName(req.body.product_type)} AS p
      ON c.product_id = p.id
      WHERE c.user_id = $1
    `;
        const { rows } = yield db_1.default.query(query, [user_id]);
        res.status(200).json({ data: rows });
    }
    catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'An error occurred while fetching cart items' });
    }
});
exports.getCart = getCart;
function sanitizeTableName(tableName) {
    // Add any validation or sanitization logic you may need
    // For example, you can ensure that the tableName only contains allowed characters
    // and doesn't contain any potential SQL injection vulnerabilities.
    // For simplicity, this example just returns the tableName as is.
    return tableName;
}
