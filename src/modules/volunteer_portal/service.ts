import { Campaign } from "../../model/campaign.model"




export const volunteerService = {
    totalCampaigns: async () => {
        const allCampaign = await Campaign.find();
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