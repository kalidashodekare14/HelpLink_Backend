"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sslcommerzPaymentCancelControll = exports.sslcommerzPaymentFailControll = exports.sslcommerzPaymentSuccessControll = exports.bikashPaymentCallbackControll = exports.aiChatbotControll = exports.userRolecontroll = exports.campaignDetailsControll = exports.totalCampaignsControll = void 0;
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const donation_model_1 = require("../../model/donation.model");
const user_model_1 = require("../../model/user.model");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const service_1 = require("./service");
// Total Campaign Controller
const totalCampaignsControll = async (req, res) => {
    const result = await service_1.publicService.totalCampaigns(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Total campaign get successfully",
        data: result,
    });
};
exports.totalCampaignsControll = totalCampaignsControll;
// Campaign Details Controller
const campaignDetailsControll = async (req, res) => {
    const result = await service_1.publicService.campaignDetails(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Campaign Details Get Successfully",
        data: result,
    });
};
exports.campaignDetailsControll = campaignDetailsControll;
// User roll controller
const userRolecontroll = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    }
    const decoded = jsonwebtoken_1.default.verify(token, env_1.config.jwt_secret);
    const userInfo = await user_model_1.User.findById(decoded.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User Role Successfully",
        data: {
            role: userInfo?.role,
            image: userInfo?.image,
            name: userInfo?.name,
        },
    });
};
exports.userRolecontroll = userRolecontroll;
// AI-Chatbot Controller
const aiChatbotControll = async (req, res) => {
    const result = await service_1.publicService.chatbotAI(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "AI response successfully",
        data: result,
    });
};
exports.aiChatbotControll = aiChatbotControll;
// Bikash Callback Controller
const bikashPaymentCallbackControll = async (req, res) => {
    const { status } = req.query;
    const paymentID = req.query.paymentID;
    if (status === "cancel") {
        return res.redirect(`${env_1.config.frontend_url}/payment_cancel`);
    }
    if (status === "fail") {
        return res.redirect(`${env_1.config.frontend_url}/payment_fail`);
    }
    if (status === "success") {
        try {
            const paymentInfo = await donation_model_1.Donation.findOne({ paymentID });
            const { data } = await axios_1.default.post(env_1.config.bkash_execute_payment_url, { paymentID }, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    authorization: paymentInfo?.id_token,
                    "x-app-key": env_1.config.bkash_api_key,
                },
            });
            if (data && data.statusCode === "0000") {
                const statusUpdate = await donation_model_1.Donation.findOneAndUpdate({ paymentID: paymentID }, {
                    $set: {
                        payment_status: "Paid",
                    },
                }, {
                    new: true,
                });
                if (statusUpdate) {
                    await donation_model_1.Donation.findOneAndUpdate({ paymentID: paymentID }, {
                        $set: {
                            id_token: "",
                        },
                    }, {
                        new: true,
                    });
                }
                return res.redirect(`${env_1.config.frontend_url}/payment_success`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.bikashPaymentCallbackControll = bikashPaymentCallbackControll;
// SSLCommerz Success Controller
const sslcommerzPaymentSuccessControll = async (req, res) => {
    // Handle SSLCommerz payment success callback here
    const { status, tran_id } = req.body;
    if (status === "VALID") {
        await donation_model_1.Donation.findOneAndUpdate({ paymentID: tran_id }, {
            $set: {
                payment_status: "Paid",
            },
        }, {
            new: true,
        });
        return res.redirect(303, `${env_1.config.frontend_url}/payment_success`);
    }
    else {
        return res.redirect(303, `${env_1.config.frontend_url}/payment_fail`);
    }
};
exports.sslcommerzPaymentSuccessControll = sslcommerzPaymentSuccessControll;
// SSLCommerz Fail Controller
const sslcommerzPaymentFailControll = async (req, res) => {
    // Handle SSLCommerz payment fail callback here
    return res.redirect(303, `${env_1.config.frontend_url}/payment_fail`);
};
exports.sslcommerzPaymentFailControll = sslcommerzPaymentFailControll;
// SSLCommerz Cancel Controller
const sslcommerzPaymentCancelControll = async (req, res) => {
    // Handle SSLCommerz payment cancel callback here
    return res.redirect(303, `${env_1.config.frontend_url}/payment_cancel`);
};
exports.sslcommerzPaymentCancelControll = sslcommerzPaymentCancelControll;
//# sourceMappingURL=controller.js.map