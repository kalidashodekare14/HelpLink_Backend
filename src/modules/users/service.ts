import cloudinary from "../../config/cloudinary";
import { User } from "../../model/user.model";



export const usersService = {
    UserProfile: async (payload: any) => {
        const email = payload;
        const userData = await User.findOne({ email: email });
        return userData;
    },
    userImageUpload: async (data: any) => {
        const { file, email } = data;
        if (!file) throw new Error("No file found");

        const base64 = file.buffer.toString("base64");
        const dataUri = `data:${file.mimetype};base64,${base64}`;
        const upload = await cloudinary.uploader.upload(dataUri, {
            folder: "profiles"
        })

        if (!upload.url) throw new Error("Image not uploaded");

        const updateImage = await User.findOneAndUpdate(
            { email: email },
            {
                $set: {
                    image: upload.url
                }
            },
            {
                new: true
            }
        )
        return updateImage
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