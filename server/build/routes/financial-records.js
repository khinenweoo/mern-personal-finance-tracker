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
const express_1 = __importDefault(require("express"));
const record_controller_1 = require("../controllers/record.controller");
// define all API endpoints/ routes
const router = express_1.default.Router();
router.get("/testing", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, record_controller_1.testRoute)(req, res);
}));
router.get("/getAllByUserID/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, record_controller_1.getRecords)(req, res);
}));
router.post("/", record_controller_1.createRecord);
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, record_controller_1.updateRecord)(req, res);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, record_controller_1.deleteRecord)(req, res);
}));
exports.default = router;
