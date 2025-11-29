import { Campaign } from "../../model/campaign.model";



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
        const donateData = await Campaign.find(
            {
                "donors.donor_email": email
            }
        )
        if (!donateData) throw Error("Donate data not found");
        return donateData
    }
}
