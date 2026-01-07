"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileUpdateControl = exports.userProfileImageUploadControl = exports.userProfileControl = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const service_1 = require("./service");
const userProfileControl = async (req, res) => {
    const result = await service_1.usersService.UserProfile(req.params.email);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User Profile successfully!",
        data: result
    });
};
exports.userProfileControl = userProfileControl;
const userProfileImageUploadControl = async (req, res) => {
    const uploadData = {
        file: req.file,
        email: req.params.email
    };
    const result = await service_1.usersService.userImageUpload(uploadData);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User Profile Update successfully!",
        data: result
    });
};
exports.userProfileImageUploadControl = userProfileImageUploadControl;
const userProfileUpdateControl = async (req, res) => {
    const result = await service_1.usersService.UserProfileUpdate({ email: req.params.email, userInfo: req.body });
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User Profile Update successfully!",
        data: result
    });
};
exports.userProfileUpdateControl = userProfileUpdateControl;
//# sourceMappingURL=controller.js.map