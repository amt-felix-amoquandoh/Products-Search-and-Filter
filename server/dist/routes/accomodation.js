"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accomodation_1 = require("../controllers/accomodation");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = express_1.default.Router();
//CREATE
router.post('/', verifyToken_1.verifyAdmin, accomodation_1.createAccomodation);
//GET ALL
router.get('/', accomodation_1.getAllAccomodation);
// GET MY ACCOMMODATIONS I ADDED
router.get('/:user_id/mine', verifyToken_1.verifyUser, accomodation_1.getUserAccomodations);
//GET
router.get('/:id', accomodation_1.getAccomodation);
//PATCH
router.patch('/:id', verifyToken_1.verifyAdmin, accomodation_1.updateAccomodation);
//DELETE
router.delete('/:id', verifyToken_1.verifyAdmin, accomodation_1.deleteAccomodation);
exports.default = router;
