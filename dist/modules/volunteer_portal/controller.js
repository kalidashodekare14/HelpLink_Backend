"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryStatusControll = exports.requestStatusControll = exports.totalCampaignsControll = exports.volOverviewInfoControll = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const service_1 = require("./service");
// Overview Info Controll
const volOverviewInfoControll = async (req, res) => {
    const result = await service_1.volunteerService.volOverviewInfo();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Total Overview Get Successfully",
        data: result
    });
};
exports.volOverviewInfoControll = volOverviewInfoControll;
const totalCampaignsControll = async (req, res) => {
    const result = await service_1.volunteerService.totalCampaigns(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Total Campaign Successfully",
        data: result
    });
};
exports.totalCampaignsControll = totalCampaignsControll;
const requestStatusControll = async (req, res) => {
    const requestData = {
        id: req.params.id,
        status: req.body.request_status
    };
    const result = await service_1.volunteerService.verifyRequest(requestData);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Request Status Successfully",
        data: result
    });
};
exports.requestStatusControll = requestStatusControll;
const deliveryStatusControll = async (req, res) => {
    const requestData = {
        id: req.params.id,
        status: req.body.delivery_status
    };
    const result = await service_1.volunteerService.assignedDelivery(requestData);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Delivary Status Successfully",
        data: result
    });
};
exports.deliveryStatusControll = deliveryStatusControll;
//# sourceMappingURL=controller.js.map