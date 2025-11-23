import { User } from "../../model/user.model";



export const usersService = {
    UserProfile: async (payload: any) => {
        const email = payload;
        const userData = await User.findOne({ email: email });
        return userData;
    },
    UserProfileUpdate: async (payload: any) => {
        const { email, userInfo } = payload;
        const receiverProfile = await User.findOneAndUpdate(
            { email: email },
            { $set: { ...userInfo } },
            { new: true }
        )
        return receiverProfile
    },
}