"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socialLoginControll = exports.loginUser = exports.registerUser = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const service_1 = require("./service");
const registerUser = async (req, res) => {
    console.log('checking user data', req.body);
    const result = await service_1.AuthService.registerUser(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User registered successfully!",
        data: result
    });
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const result = await service_1.AuthService.loginUser(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User login successfully!",
        data: result
    });
};
exports.loginUser = loginUser;
const socialLoginControll = async (req, res) => {
    const result = await service_1.AuthService.socialLogin(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Social login successfully!",
        data: result
    });
};
exports.socialLoginControll = socialLoginControll;
//# sourceMappingURL=controller.js.map