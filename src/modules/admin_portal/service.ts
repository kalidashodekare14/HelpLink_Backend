import { Campaign } from "../../model/campaign.model";
import { Donation } from "../../model/donation.model";
import { User } from "../../model/user.model"




export const adminService = {
    overviewInfo: async () => {
        const totalUser = await User.countDocuments();
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


        // Total Users, Campaigns, Donate Data 
        const monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const yearStart = new Date(new Date().getFullYear(), 0, 1);
        const yearEnd = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);


        const userData = await User.aggregate([
            { $match: { createdAt: { $gte: yearStart, $lte: yearEnd } } },
            { $group: { _id: { month: { $month: "$createdAt" } }, count: { $sum: 1 } } },
            { $sort: { "_id.month": 1 } }
        ]);

        const campaignData = await Campaign.aggregate([
            { $match: { createdAt: { $gte: yearStart, $lte: yearEnd } } },
            { $group: { _id: { month: { $month: "$createdAt" } }, count: { $sum: 1 } } },
            { $sort: { "_id.month": 1 } }
        ]);

        const donationData = await Donation.aggregate([
            {
                $match: {
                    payment_status: "Paid",
                    createdAt: {
                        $gte: yearStart,
                        $lte: yearEnd
                    }
                }
            },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    totalAmount: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.month": 1 } }
        ]);


        const chartData = Array.from({ length: 12 }, (_, i) => {
            const monthIndex = i + 1;

            const users = userData.find(d => d._id.month === monthIndex)?.count || 0;
            const campaigns = campaignData.find(d => d._id.month === monthIndex)?.count || 0;
            const donations = donationData.find(d => d._id.month === monthIndex)?.totalAmount || 0;

            return {
                name: monthMap[i],
                users,
                campaigns,
                donations
            }
        })



        return {
            totalUser,
            totalCampaign,
            totalAmount,
            chartData
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
        const { search, request_status, delivery_status, situation } = query;
        console.log('checking severity', situation)

        const filter: any = {}

        if (request_status) {
            filter.request_status = { $regex: request_status, $options: "i" }
        }

        if (delivery_status) {
            filter.delivery_status = { $regex: delivery_status, $options: "i" }
        }

        if (situation) {
            filter.$or = [
                { "situation.severity": { $regex: situation, $options: "i" } }
            ]
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
    },
    // Donation Manage
    allDonations: async (payload: any) => {
        const { search, payment_status, payment_method } = payload;

        const filter: any = {}

        if (payment_status) {
            filter.payment_status = { $regex: payment_status, $options: "i" }
        }
        if (payment_method) {
            filter.payment_method = { $regex: payment_method, $options: "i" }
        }

        if (search) {
            filter.$or = [
                { donor_name: { $regex: search, $options: "i" } },
                { donor_email: { $regex: search, $options: "i" } },
                { paymentID: { $regex: search, $options: "i" } },
                { phone_number: { $regex: search, $options: "i" } },
            ]
        }

        const donations = await Donation.find(filter).sort({ createdAt: -1 });
        return donations;
    }

}