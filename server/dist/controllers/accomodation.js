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
exports.deleteAccomodation = exports.updateAccomodation = exports.getUserAccomodations = exports.getAccomodation = exports.getAllAccomodation = exports.createAccomodation = void 0;
const db_1 = __importDefault(require("../db"));
const createAccomodation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const columns = Object.keys(req.body).join(', ');
        const placeholders = Object.keys(req.body).map((_, index) => `$${index + 1}`).join(', ');
        const insertQuery = `INSERT INTO accommodations (${columns}) VALUES (${placeholders}) RETURNING *`;
        const values = Object.values(req.body);
        const { rows } = yield db_1.default.query(insertQuery, values);
        res.json({ success: true, message: 'Accommodation added successfully.', data: rows[0] });
    }
    catch (err) {
        console.error('Error adding accommodation:', err);
        res.status(500).json({ error: 'An error occurred while adding accommodation.' });
    }
});
exports.createAccomodation = createAccomodation;
const getAllAccomodation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows: accommodations } = yield db_1.default.query('select * from accommodations');
        res.status(200).json({ success: true, data: accommodations });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
exports.getAllAccomodation = getAllAccomodation;
const getAccomodation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { rows: accommodation } = yield db_1.default.query('select * from accommodations where id=$1', [id]);
        res.status(200).json({ success: true, data: accommodation[0] });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});
exports.getAccomodation = getAccomodation;
const getUserAccomodations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    try {
        const { rows: accommodation } = yield db_1.default.query('select * from accommodations where business_id=$1', [user_id]);
        res.status(200).json({ success: true, data: accommodation });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});
exports.getUserAccomodations = getUserAccomodations;
const updateAccomodation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updateColumns = Object.keys(updates).map((key, index) => {
            return `${key} = $${index + 1}`;
        }).join(', ');
        const updateValues = Object.values(updates);
        const updateQuery = `UPDATE accommodations SET ${updateColumns} WHERE id = $${updateValues.length + 1} RETURNING *`;
        const values = [...updateValues, id];
        const { rows: updatedAccomodation } = yield db_1.default.query(updateQuery, values);
        res.status(200).json({ success: true, message: 'Accommodation updated successfully.', data: updatedAccomodation[0] });
    }
    catch (err) {
        console.error('Error updating accommodation:', err);
        res.status(500).json({ success: false, message: 'An error occurred while updating accommodation.' });
    }
});
exports.updateAccomodation = updateAccomodation;
const deleteAccomodation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.default.query('delete from accommodations where id=$1', [id]);
        res.status(200).json({ success: true, message: 'item deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
exports.deleteAccomodation = deleteAccomodation;
