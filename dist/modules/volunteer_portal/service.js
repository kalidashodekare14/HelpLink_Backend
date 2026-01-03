"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.volunteerService = void 0;
const campaign_model_1 = require("../../model/campaign.model");
exports.volunteerService = {
    volOverviewInfo: async () => {
        const totalCampaign = await campaign_model_1.Campaign.countDocuments();
        const donationResult = await campaign_model_1.Campaign.aggregate([
            { $unwind: "$donors" },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$donors.amount" }
                }
            }
        ]);
        const totalAmount = donationResult.length > 0 ? donationResult[0].totalAmount : 0;
        return {
            totalCampaign,
            totalAmount
        };
    },
    totalCampaigns: async (query) => {
        const { search, request_status, delivery_status } = query;
        const filter = {};
        if (request_status) {
            filter.request_status = { $regex: request_status, $options: "i" };
        }
        if (delivery_status) {
            filter.delivery_status = { $regex: delivery_status, $options: "i" };
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
        const allCampaign = await campaign_model_1.Campaign.find(filter).sort({ createdAt: -1 });
        return allCampaign;
    },
    verifyRequest: async (payload) => {
        const { id, status } = payload;
        const updateStatus = await campaign_model_1.Campaign.findByIdAndUpdate(id, {
            $set: {
                request_status: status
            }
        });
        return updateStatus;
    },
    assignedDelivery: async (payload) => {
        const { id, status } = payload;
        const updateStatus = await campaign_model_1.Campaign.findByIdAndUpdate(id, {
            $set: {
                delivery_status: status
            }
        });
        return updateStatus;
    }
};
//# sourceMappingURL=service.js.map