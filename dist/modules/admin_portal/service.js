"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const campaign_model_1 = require("../../model/campaign.model");
const donation_model_1 = require("../../model/donation.model");
const user_model_1 = require("../../model/user.model");
exports.adminService = {
    overviewInfo: async () => {
        const totalUser = await user_model_1.User.countDocuments();
        const totalCampaign = await campaign_model_1.Campaign.countDocuments();
        const donationResult = await donation_model_1.Donation.aggregate([
            {
                $match: { payment_status: "Paid" }
            },
            {
                $group: {
                    _id: "$campaign_id",
                    totalAmount: { $sum: "$amount" },
                    totalDonor: { $sum: 1 }
                }
            }
        ]);
        const totalAmount = donationResult.length > 0 ? donationResult[0].totalAmount : 0;
        return {
            totalUser,
            totalCampaign,
            totalAmount
        };
    },
    allUsers: async (query) => {
        const { search, role, status } = query;
        const filter = {};
        if (role) {
            filter.role = { $regex: role, $options: "i" };
        }
        if (status !== undefined) {
            filter.isActive = status;
        }
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        }
        const totalUser = await user_model_1.User.find(filter).sort({ createdAt: -1 });
        return totalUser;
    },
    userRoleManage: async (payload) => {
        const { id, role } = payload;
        const user = await user_model_1.User.findByIdAndUpdate(id, {
            $set: {
                role: role
            }
        }, {
            new: true
        });
        return user;
    },
    userActiveManage: async (payload) => {
        const { id, status } = payload;
        console.log('checking data for Active', status);
        const user = await user_model_1.User.findByIdAndUpdate(id, {
            $set: {
                isActive: status
            }
        }, {
            new: true
        });
        return user;
    },
    // Campaign Manage
    allCampaigns: async (query) => {
        const { search, request_status, delivery_status, situation } = query;
        console.log('checking severity', situation);
        const filter = {};
        if (request_status) {
            filter.request_status = { $regex: request_status, $options: "i" };
        }
        if (delivery_status) {
            filter.delivery_status = { $regex: delivery_status, $options: "i" };
        }
        if (situation) {
            filter.$or = [
                { "situation.severity": { $regex: situation, $options: "i" } }
            ];
        }
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
                { "location.division": { $regex: search, $options: "i" } },
                { "location.district": { $regex: search, $options: "i" } },
                { "location.upazila": { $regex: search, $options: "i" } },
                { "location.address": { $regex: search, $options: "i" } },
            ];
        }
        const totalCampaign = await campaign_model_1.Campaign.find(filter).sort({ createdAt: -1 });
        return totalCampaign;
    },
    campaignStatusManage: async (payload) => {
        const { id, request_status } = payload;
        const campaign = await campaign_model_1.Campaign.findByIdAndUpdate(id, {
            $set: {
                request_status: request_status
            }
        }, {
            new: true
        });
        return campaign;
    },
    campaignDeliveryStatusManage: async (payload) => {
        const { id, delivery_status } = payload;
        const campaign = await campaign_model_1.Campaign.findByIdAndUpdate(id, {
            $set: {
                delivery_status: delivery_status
            }
        }, {
            new: true
        });
        return campaign;
    }
};
//# sourceMappingURL=service.js.map