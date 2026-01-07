"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donorService = void 0;
const campaign_model_1 = require("../../model/campaign.model");
const env_1 = require("../../config/env");
const axios_1 = __importDefault(require("axios"));
const donation_model_1 = require("../../model/donation.model");
const mongoose_1 = require("mongoose");
exports.donorService = {
    joinCampaign: async (payload) => {
        const { id } = payload;
        const { campaignData } = payload;
        const campaign = await campaign_model_1.Campaign.findByIdAndUpdate(id, {
            $push: {
                donors: {
                    donor_name: campaignData.donor_name,
                    donor_email: campaignData.donor_email,
                    amount: campaignData.amount,
                    message: campaignData.message,
                    payment_status: campaignData.payment_status || "Unpaid",
                    payment_method: campaignData.payment_method,
                    date: new Date()
                }
            }
        }, {
            new: true
        });
        return campaign;
    },
    donateTrack: async (payload) => {
        const email = payload;
        console.log('email check', email);
        const donationData = await donation_model_1.Donation.find({ donor_email: email });
        const campaignIds = [...new Set(donationData.map((donation) => donation.campaign_id.toString()))];
        const campaignData = await campaign_model_1.Campaign.find({ _id: { $in: campaignIds } }).lean();
        const campaignMap = new Map(campaignData.map(c => [c._id.toString(), c]));
        const result = campaignIds.map(campaignId => {
            const campaign = campaignMap.get(campaignId);
            const donationDetails = donationData
                .filter(d => d.campaign_id.toString() === campaignId)
                .map(d => ({
                amount: d.amount,
                payment_status: d.payment_status,
                payment_method: d.payment_method,
                date: d.createdAt
            }));
            return {
                ...campaign,
                donationDetails: donationDetails
            };
        });
        return result;
    },
    bikashPayment: async (paymentInfo) => {
        try {
            // Grand Token Generate
            const grandData = await axios_1.default.post(env_1.config.bkash_grant_token_url, {
                app_key: env_1.config.bkash_api_key,
                app_secret: env_1.config.bkash_secret_key
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    username: env_1.config.bkash_username,
                    password: env_1.config.bkash_password
                }
            });
            // Create Payment 
            const createPayment = await axios_1.default.post(env_1.config.bkash_create_payment_url, {
                mode: "0011",
                payerReference: " ",
                callbackURL: `${env_1.config.backend_url}/api/v1/public/bikash_payment_callback`,
                amount: paymentInfo.amount || 0,
                currency: "BDT",
                intent: "sale",
                merchantInvoiceNumber: Math.random()
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    authorization: grandData.data.id_token,
                    'x-app-key': env_1.config.bkash_api_key,
                }
            });
            await donation_model_1.Donation.create({
                ...paymentInfo,
                paymentID: createPayment.data.paymentID,
                id_token: grandData.data.id_token
            });
            return {
                bkashURL: createPayment.data.bkashURL
            };
        }
        catch (error) {
        }
    },
    sllcommerzPayment: async (paymentInfo) => {
        try {
            const tnxId = new mongoose_1.Types.ObjectId().toString();
            const initateData = {
                store_id: env_1.config.ssl_commerz_store_id,
                store_passwd: env_1.config.ssl_commerz_store_password,
                total_amount: paymentInfo.amount || 0,
                currency: "BDT",
                tran_id: tnxId,
                success_url: `${env_1.config.backend_url}/api/v1/public/sslcommerz_payment_success`,
                fail_url: `${env_1.config.backend_url}/api/v1/public/sslcommerz_payment_fail`,
                cancel_url: `${env_1.config.backend_url}/api/v1/public/sslcommerz_payment_cancel`,
                cus_name: paymentInfo?.donor_name || "None",
                cus_email: paymentInfo?.donor_email || "None",
                cus_add1: "Dhaka",
                cus_add2: "Dhaka",
                cus_city: "None",
                cus_state: "Dhaka",
                cus_postcode: "None",
                cus_country: "Bangladesh",
                cus_phone: "None",
                cus_fax: "01711111111",
                shipping_method: "NO",
                product_name: "None",
                product_category: "None",
                product_profile: "general",
                multi_card_name: "mastercard,visacard,amexcard",
                value_a: "ref001_A&",
                value_b: "ref002_B&",
                value_c: "ref003_C&",
                value_d: "ref004_D",
            };
            const response = await (0, axios_1.default)({
                method: "POST",
                url: "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
                data: initateData,
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
            });
            const saveData = await donation_model_1.Donation.create({
                ...paymentInfo,
                paymentID: tnxId,
            });
            if (saveData) {
                return {
                    GatewayPageURL: response.data.GatewayPageURL
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
};
//# sourceMappingURL=service.js.map