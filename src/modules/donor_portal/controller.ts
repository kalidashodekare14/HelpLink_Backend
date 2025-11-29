import sendResponse from "../../utils/sendResponse";
import { donorService } from "./service"
import { Request, Response } from "express"


export const donorJoinCampaignControl = async (req: Request, res: Response) => {
    const { id } = req.params
    console.log('checking campaign', id);
    const result = await donorService.joinCampaign({ id: id, campaignData: req.body });
    sendResponse(res, {
        success: true,
        message: "Campaign Join Successfully",
        data: result
    })
}

export const donateTrackControl = async (req: Request, res: Response) => {
    const result = await donorService.donateTrack(req.params.email);
    sendResponse(res, {
        success: true,
        message: "Campaign Join Successfully",
        data: result
    })
}