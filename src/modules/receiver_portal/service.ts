import { Campaign } from "../../model/campaign.model";
import { User } from "../../model/user.model";


export const receiverService = {
    receiverProfile: async (payload: any) => {
        const email = payload;
        const receiverData = await User.findOne({ email: email });
        return receiverData;
    },
    receiverProfileUpdate: async (payload: any) => {
        const { email, receiverData } = payload;
        const receiverProfile = await User.findOneAndUpdate(
            { email: email },
            { $set: { ...receiverData } },
            { new: true }
        )
        return receiverProfile
    },
    helpRequestPost: async (payload: any) => {
        const receiverRequestData = payload;
        const requestData = await Campaign.create(receiverRequestData);
        return requestData;
    },
    trackRequest: async (payload: any) => {
        const email = payload;
        console.log('received email', email);
        const trackData = await Campaign.find({ receiver_email: email });
        return trackData;
    }
}