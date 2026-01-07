"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignDevliveryStatusManageControll = exports.campaignStatusManageControll = exports.totalCampaignControll = exports.userActiveManageControll = exports.userRoleManageControll = exports.totalUsersControll = exports.overviewInfoControll = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const service_1 = require("./service");
// Overview Info Controll
const overviewInfoControll = async (req, res) => {
    const result = await service_1.adminService.overviewInfo();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Total User Get Successfully",
        data: result
    });
};
exports.overviewInfoControll = overviewInfoControll;
// Total User Controll
const totalUsersControll = async (req, res) => {
    const result = await service_1.adminService.allUsers(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Total User Get Successfully",
        data: result
    });
};
exports.totalUsersControll = totalUsersControll;
// User Role Manage
const userRoleManageControll = async (req, res) => {
    const roleInfo = {
        id: req.params.id,
        role: req.body.role
    };
    console.log('checking params', req.params);
    console.log('checking body', req.body);
    const result = await service_1.adminService.userRoleManage(roleInfo);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User Role Change Successfully",
        data: result
    });
};
exports.userRoleManageControll = userRoleManageControll;
// User Active Manage
const userActiveManageControll = async (req, res) => {
    const roleInfo = {
        id: req.params.id,
        status: req.body.status
    };
    const result = await service_1.adminService.userActiveManage(roleInfo);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User Active Change Successfully",
        data: result
    });
};
exports.userActiveManageControll = userActiveManageControll;
// Total Campaign 
const totalCampaignControll = async (req, res) => {
    const result = await service_1.adminService.allCampaigns(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Total Campaign Get Successfully",
        data: result
    });
};
exports.totalCampaignControll = totalCampaignControll;
// Campaign Status Change
const campaignStatusManageControll = async (req, res) => {
    const requestInfo = {
        id: req.params.id,
        request_status: req.body.request_status
    };
    console.log('checking request status', req.body.request_status);
    const result = await service_1.adminService.campaignStatusManage(requestInfo);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User Request Status Update Successfully",
        data: result
    });
};
exports.campaignStatusManageControll = campaignStatusManageControll;
// Campaign Delivery Status Change
const campaignDevliveryStatusManageControll = async (req, res) => {
    const deliveryInfo = {
        id: req.params.id,
        delivery_status: req.body.delivery_status
    };
    const result = await service_1.adminService.campaignDeliveryStatusManage(deliveryInfo);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User Delivery Status Update Successfully",
        data: result
    });
};
exports.campaignDevliveryStatusManageControll = campaignDevliveryStatusManageControll;
//# sourceMappingURL=controller.js.map