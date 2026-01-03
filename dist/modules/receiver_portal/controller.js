"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignRequestDeleteControll = exports.campaignRequestUpdateControl = exports.campaignRequestInfoControl = exports.trackRequestControl = exports.campaignImageUploadControl = exports.receiverRequestControl = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const service_1 = require("./service");
const receiverRequestControl = async (req, res) => {
    const result = await service_1.receiverService.helpRequestPost(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Receiver Request successfully!",
        data: result
    });
};
exports.receiverRequestControl = receiverRequestControl;
const campaignImageUploadControl = async (req, res) => {
    const result = await service_1.receiverService.campaignImageUpload(req.files);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Campaign Image Upload successfully!",
        data: result
    });
};
exports.campaignImageUploadControl = campaignImageUploadControl;
const trackRequestControl = async (req, res) => {
    console.log('checking request email', req.params.email);
    const result = await service_1.receiverService.trackRequest(req.params.email);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Receiver Track successfully!",
        data: result
    });
};
exports.trackRequestControl = trackRequestControl;
const campaignRequestInfoControl = async (req, res) => {
    const result = await service_1.receiverService.campaignRequestInfo(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Campaign Request Info successfully!",
        data: result
    });
};
exports.campaignRequestInfoControl = campaignRequestInfoControl;
const campaignRequestUpdateControl = async (req, res) => {
    const campaignInfo = {
        campaignId: req.params.id,
        updateData: req.body
    };
    const result = await service_1.receiverService.campaignRequestUpdate(campaignInfo);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Campaign Request Update successfully!",
        data: result
    });
};
exports.campaignRequestUpdateControl = campaignRequestUpdateControl;
const campaignRequestDeleteControll = async (req, res) => {
    const result = await service_1.receiverService.campaignRequestDelete(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Campaign Request Delete successfully!",
        data: result
    });
};
exports.campaignRequestDeleteControll = campaignRequestDeleteControll;
//# sourceMappingURL=controller.js.map