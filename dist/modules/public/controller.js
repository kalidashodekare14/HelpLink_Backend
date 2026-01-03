"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherRiskTrackControll = exports.userRolecontroll = exports.campaignDetailsControll = exports.totalCampaignsControll = void 0;
const env_1 = require("../../config/env");
const user_model_1 = require("../../model/user.model");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const service_1 = require("./service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const totalCampaignsControll = async (req, res) => {
    const result = await service_1.publicService.totalCampaigns(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Total campaign get successfully",
        data: result
    });
};
exports.totalCampaignsControll = totalCampaignsControll;
const campaignDetailsControll = async (req, res) => {
    const result = await service_1.publicService.campaignDetails(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Campaign Details Get Successfully",
        data: result
    });
};
exports.campaignDetailsControll = campaignDetailsControll;
const userRolecontroll = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    const decoded = jsonwebtoken_1.default.verify(token, env_1.config.jwt_secret);
    const userInfo = await user_model_1.User.findById(decoded.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User Role Successfully",
        data: {
            role: userInfo?.role,
            image: userInfo?.image,
            name: userInfo?.name
        }
    });
};
exports.userRolecontroll = userRolecontroll;
const weatherRiskTrackControll = async (req, res) => {
    const result = await service_1.publicService.weatherRiskTrack();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Weather Data Get Successfully",
        data: result
    });
};
exports.weatherRiskTrackControll = weatherRiskTrackControll;
//# sourceMappingURL=controller.js.map