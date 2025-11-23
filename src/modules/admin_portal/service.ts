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
    allUsers: async () => {
        const totalUser = await User.find();
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
        const { id, isActive } = payload;
        console.log('checking data for Active', isActive);
        const user = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    isActive: isActive
                }
            },
            {
                new: true
            }
        )
        return user;
    },
    // Campaign Manage
    allCampaigns: async () => {
        const totalCampaign = await Campaign.find();
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
    }

}