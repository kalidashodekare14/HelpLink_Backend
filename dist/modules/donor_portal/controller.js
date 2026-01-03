"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sslcommerzPaymentCancelControll = exports.sslcommerzPaymentFailControll = exports.sslcommerzPaymentSuccessControll = exports.sslcommerzPaymentControll = exports.bikashPaymentCallbackControll = exports.bikashPaymentControl = exports.donateTrackControl = exports.donorJoinCampaignControl = void 0;
const axios_1 = __importDefault(require("axios"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const service_1 = require("./service");
const env_1 = require("../../config/env");
const donation_model_1 = require("../../model/donation.model");
const donorJoinCampaignControl = async (req, res) => {
    const { id } = req.params;
    console.log('checking campaign', id);
    const result = await service_1.donorService.joinCampaign({ id: id, campaignData: req.body });
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Campaign Join Successfully",
        data: result
    });
};
exports.donorJoinCampaignControl = donorJoinCampaignControl;
const donateTrackControl = async (req, res) => {
    const result = await service_1.donorService.donateTrack(req.params.email);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Campaign Join Successfully",
        data: result
    });
};
exports.donateTrackControl = donateTrackControl;
const bikashPaymentControl = async (req, res) => {
    const result = await service_1.donorService.bikashPayment(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Bikash Payment Successfully",
        data: result
    });
};
exports.bikashPaymentControl = bikashPaymentControl;
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
                    'x-app-key': env_1.config.bkash_api_key,
                }
            });
            if (data && data.statusCode === "0000") {
                const statusUpdate = await donation_model_1.Donation.findOneAndUpdate({ paymentID: paymentID }, {
                    $set: {
                        payment_status: "Paid"
                    }
                }, {
                    new: true
                });
                if (statusUpdate) {
                    await donation_model_1.Donation.findOneAndUpdate({ paymentID: paymentID }, {
                        $set: {
                            id_token: ""
                        }
                    }, {
                        new: true
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
const sslcommerzPaymentControll = async (req, res) => {
    const result = await service_1.donorService.sllcommerzPayment(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "SSLCommerz Payment Successfully",
        data: result
    });
};
exports.sslcommerzPaymentControll = sslcommerzPaymentControll;
const sslcommerzPaymentSuccessControll = async (req, res) => {
    // Handle SSLCommerz payment success callback here
    const { status, tran_id } = req.body;
    console.log('SSLCommerz Callback Data', req.body);
    if (status === "VALID") {
        await donation_model_1.Donation.findOneAndUpdate({ paymentID: tran_id }, {
            $set: {
                payment_status: "Paid"
            }
        }, {
            new: true
        });
        return res.redirect(`${env_1.config.frontend_url}/payment_success`);
    }
    else {
        return res.redirect(`${env_1.config.frontend_url}/payment_fail`);
    }
};
exports.sslcommerzPaymentSuccessControll = sslcommerzPaymentSuccessControll;
const sslcommerzPaymentFailControll = async (req, res) => {
    // Handle SSLCommerz payment fail callback here
    return res.redirect(`${env_1.config.frontend_url}/payment_fail`);
};
exports.sslcommerzPaymentFailControll = sslcommerzPaymentFailControll;
const sslcommerzPaymentCancelControll = async (req, res) => {
    // Handle SSLCommerz payment cancel callback here
    return res.redirect(`${env_1.config.frontend_url}/payment_cancel`);
};
exports.sslcommerzPaymentCancelControll = sslcommerzPaymentCancelControll;
//# sourceMappingURL=controller.js.map