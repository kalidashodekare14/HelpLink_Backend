import sendResponse from "../../utils/sendResponse";
import { publicService } from "./service"
import { Request, Response } from "express";


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