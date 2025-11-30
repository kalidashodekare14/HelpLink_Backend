import { Campaign } from "../../model/campaign.model";
import { User } from "../../model/user.model"




export const adminService = {
    overviewInfo: async () => {
        const totalUser = await User.countDocuments();
        const totalCampaign = await Campaign.countDocuments();
        const donationResult = await Campaign.aggregate([
            { $unwind: "$donors" },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$donors.amount" }
                }
            }
        ])

        const totalAmount = donationResult.length > 0 ? donationResult[0].totalAmount : 0;
        return {
            totalUser,
            totalCampaign,
            totalAmount
        }

    },
    allUsers: async (query: any) => {
        const { search, role, status } = query;

        const filter: any = {}

        if (role) {
            filter.role = { $regex: role, $options: "i" }
        }

        if (status !== undefined) {
            filter.isActive = status
        }

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ]
        }

        const totalUser = await User.find(filter).sort({ createdAt: -1 })
        return totalUser
    },
    userRoleManage: async (payload: any) => {
        const { id, role } = payload;
        const user = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    role: role
                }
            },
            {
                new: true
            }
        )
        return user;
    },
    userActiveManage: async (payload: any) => {
        const { id, status } = payload;
        console.log('checking data for Active', status);
        const user = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    isActive: status
                }
            },
            {
                new: true
            }
        )
        return user;
    },
    // Campaign Manage
    allCampaigns: async (query: any) => {
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

        const totalCampaign = await Campaign.find(filter).sort({ createdAt: -1 });
        return totalCampaign;
    },
    campaignStatusManage: async (payload: any) => {
        const { id, request_status } = payload;
        const campaign = await Campaign.findByIdAndUpdate(
            id,
            {
                $set: {
                    request_status: request_status
                }
            },
            {
                new: true
            }
        )
        return campaign;
    },
    campaignDeliveryStatusManage: async (payload: any) => {
        const { id, delivery_status } = payload;
        const campaign = await Campaign.findByIdAndUpdate(
            id,
            {
                $set: {
                    delivery_status: delivery_status
                }
            },
            {
                new: true
            }
        )
        return campaign;
    }

}