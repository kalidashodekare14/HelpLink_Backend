import { config } from "../../config/env";
import { User } from "../../model/user.model";
import sendResponse from "../../utils/sendResponse";
import { publicService } from "./service"
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";



export const totalCampaignsControll = async (req: Request, res: Response) => {
    const result = await publicService.totalCampaigns(req.query);
    sendResponse(res, {
        success: true,
        message: "Total campaign get successfully",
        data: result
    })
}

export const campaignDetailsControll = async (req: Request, res: Response) => {
    const result = await publicService.campaignDetails(req.params.id);
    sendResponse(res, {
        success: true,
        message: "Campaign Details Get Successfully",
        data: result
    })
}

export const userRolecontroll = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." })
    }

    const decoded = jwt.verify(token, config.jwt_secret) as JwtPayload;

    const userInfo = await User.findById(decoded.id);

    sendResponse(res, {
        success: true,
        message: "User Role Successfully",
        data: {
            role: userInfo?.role,
            image: userInfo?.image,
            name: userInfo?.name
        }
    })
}


export const weatherRiskTrackControll = async (req: Request, res: Response) => {
    const result = await publicService.weatherRiskTrack();
    sendResponse(res, {
        success: true,
        message: "Weather Data Get Successfully",
        data: result
    })
}