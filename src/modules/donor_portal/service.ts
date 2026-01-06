import { Campaign } from "../../model/campaign.model";
import { config } from '../../config/env'
import axios from "axios";
import { Donation } from "../../model/donation.model";
import { Types } from "mongoose";
import { id, sl } from "zod/v4/locales";

interface Idonation {
    campaign_id: string,
    donor_name: string,
    donor_email: string,
    message: string,
    amount: string,
    paymentID: string,
    payment_status: "pending" | "unpaid" | "paid",
    payment_method: "bKash" | "nagad" | "sslcommerz"
}

export const donorService = {
    joinCampaign: async (payload: any) => {
        const { id } = payload;
        const { campaignData } = payload;
        const campaign = await Campaign.findByIdAndUpdate(
            id,
            {
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
            },
            {
                new: true
            }
        )
        return campaign
    },
    donateTrack: async (payload: any) => {
        const email = payload;
        console.log('email check', email);
        const donationData = await Donation.find({ donor_email: email });

        const campaignIds = [...new Set(donationData.map((donation) => donation.campaign_id.toString()))];

        const campaignData = await Campaign.find({ _id: { $in: campaignIds } }).lean();
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
                }))
            return {
                ...campaign,
                donationDetails: donationDetails
            }
        });

        return result;
    },
    bikashPayment: async (paymentInfo: Idonation) => {
        try {
            // Grand Token Generate
            const grandData = await axios.post(config.bkash_grant_token_url, {
                app_key: config.bkash_api_key,
                app_secret: config.bkash_secret_key
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    username: config.bkash_username,
                    password: config.bkash_password
                }
            })
            // Create Payment 
            const createPayment = await axios.post(config.bkash_create_payment_url, {
                mode: "0011",
                payerReference: " ",
                callbackURL: `${config.backend_url}/api/v1/public/bikash_payment_callback`,
                amount: paymentInfo.amount || 0,
                currency: "BDT",
                intent: "sale",
                merchantInvoiceNumber: Math.random()
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    authorization: grandData.data.id_token,
                    'x-app-key': config.bkash_api_key,
                }
            })

            await Donation.create({
                ...paymentInfo,
                paymentID: createPayment.data.paymentID,
                id_token: grandData.data.id_token
            });

            return {
                bkashURL: createPayment.data.bkashURL
            }

        } catch (error) {

        }
    },
    sllcommerzPayment: async (paymentInfo: Idonation) => {
        try {
            const tnxId = new Types.ObjectId().toString();

            const initateData = {
                store_id: config.ssl_commerz_store_id,
                store_passwd: config.ssl_commerz_store_password,
                total_amount: paymentInfo.amount || 0,
                currency: "BDT",
                tran_id: tnxId,
                success_url: `${config.backend_url}/api/v1/public/sslcommerz_payment_success`,
                fail_url: `${config.backend_url}/api/v1/public/sslcommerz_payment_fail`,
                cancel_url: `${config.backend_url}/api/v1/public/sslcommerz_payment_cancel`,
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
            const response = await axios({
                method: "POST",
                url: "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
                data: initateData,
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
            });
            const saveData = await Donation.create({
                ...paymentInfo,
                paymentID: tnxId,
            });
            if (saveData) {
                return {
                    GatewayPageURL: response.data.GatewayPageURL
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

