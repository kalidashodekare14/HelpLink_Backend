"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = void 0;
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const user_model_1 = require("../../model/user.model");
exports.usersService = {
    UserProfile: async (payload) => {
        const email = payload;
        const userData = await user_model_1.User.findOne({ email: email });
        return userData;
    },
    userImageUpload: async (data) => {
        const { file, email } = data;
        if (!file)
            throw new Error("No file found");
        const base64 = file.buffer.toString("base64");
        const dataUri = `data:${file.mimetype};base64,${base64}`;
        const upload = await cloudinary_1.default.uploader.upload(dataUri, {
            folder: "profiles"
        });
        if (!upload.url)
            throw new Error("Image not uploaded");
        const updateImage = await user_model_1.User.findOneAndUpdate({ email: email }, {
            $set: {
                image: upload.url
            }
        }, {
            new: true
        });
        return updateImage;
    },
    UserProfileUpdate: async (payload) => {
        const { email, userInfo } = payload;
        const receiverProfile = await user_model_1.User.findOneAndUpdate({ email: email }, { $set: { ...userInfo } }, { new: true });
        return receiverProfile;
    },
};
//# sourceMappingURL=service.js.map