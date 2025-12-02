import sendResponse from "../../utils/sendResponse";
import { usersService } from "./service"
import { Request, Response } from "express";


export const userProfileControl = async (req: Request, res: Response) => {
    const result = await usersService.UserProfile(req.params.email);
    sendResponse(res, {
        success: true,
        message: "User Profile successfully!",
        data: result
    })
}



export const userProfileImageUploadControl = async (req: Request, res: Response) => {
    const uploadData = {
        file: req.file,
        email: req.params.email
    }
    const result = await usersService.userImageUpload(uploadData);
    sendResponse(res, {
        success: true,
        message: "User Profile Update successfully!",
        data: result
    })
}

export const userProfileUpdateControl = async (req: Request, res: Response) => {
    const result = await usersService.UserProfileUpdate({ email: req.params.email, userInfo: req.body });
    sendResponse(res, {
        success: true,
        message: "User Profile Update successfully!",
        data: result
    })
}
