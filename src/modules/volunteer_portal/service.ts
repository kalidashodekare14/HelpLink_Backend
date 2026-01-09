import { Campaign } from "../../model/campaign.model"
import { Donation } from "../../model/donation.model";


export const volunteerService = {
    volOverviewInfo: async () => {
        const totalCampaign = await Campaign.countDocuments();
        const donationResult = await Donation.aggregate([
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
        ])
        const totalAmount = donationResult[0].totalAmount || 0;

        return {
            totalCampaign,
            totalAmount
        }

    },
    totalCampaigns: async (query: any) => {

        const { search, request_status, delivery_status } = query;

        const filter: any = {}

        if (request_status) {
            filter.request_status = { $regex: request_status, $options: "i" }
        }

        if (delivery_status) {
            filter.delivery_status = { $regex: delivery_status, $options: "i" }
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
                { "location.division": { $regex: search, $options: "i" } },
                { "location.district": { $regex: search, $options: "i" } },
                { "location.upazila": { $regex: search, $options: "i" } },
                { "location.address": { $regex: search, $options: "i" } },
            ]
        }

        const allCampaign = await Campaign.find(filter).sort({ createdAt: -1 });
        return allCampaign;
    },
    verifyRequest: async (payload: any) => {
        const { id, status } = payload;
        const updateStatus = await Campaign.findByIdAndUpdate(
            id,
            {
                $set: {
                    request_status: status
                }
            }
        )
        return updateStatus
    },
    assignedDelivery: async (payload: any) => {
        const { id, status } = payload;
        const updateStatus = await Campaign.findByIdAndUpdate(
            id,
            {
                $set: {
                    delivery_status: status
                }
            }
        )
        return updateStatus;
    }

}