import { Campaign } from "../../model/campaign.model"



export const publicService = {
    totalCampaigns: async (query: any) => {
        const { search, category, division, district, upazila, page, limit } = query;
        console.log('checking frontend data', division, district, upazila);
        console.log('checking search', search);
        const filter: any = {}
        if (category) filter.category = { $regex: category, $options: "i" };
        if (division) filter["location.division"] = { $regex: division, $options: "i" };
        if (district) filter["location.district"] = { $regex: district, $options: "i" };
        if (upazila) filter["location.upazila"] = { $regex: upazila, $options: "i" };
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } }
            ]
        }

        let pageData = Number(page) || 1;
        let limitData = Number(limit) || 10;
        const skip = (pageData - 1) * limitData;

        const totalCampaign = await Campaign.find(filter)
            .skip(skip)
            .limit(Number(limitData))
            .sort({ created: -1 });

        const totalCount = await Campaign.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / limitData || 1)
        return {
            totalPages,
            page: Number(pageData),
            limit: Number(limitData),
            data: totalCampaign
        };
    },
    campaignDetails: async (payload: any) => {
        const id = payload;
        const campaign = await Campaign.findById(id);
        return campaign;
    }
}