"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const validation_1 = require("./validation");
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.default)(validation_1.registerValidation), controller_1.registerUser);
router.post("/login", (0, validateRequest_1.default)(validation_1.loginValidation), controller_1.loginUser);
router.post('/social_login', controller_1.socialLoginControll);
exports.AuthRoutes = router;
//# sourceMappingURL=routes.js.map