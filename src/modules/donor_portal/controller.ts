import sendResponse from "../../utils/sendResponse";
import { donorService } from "./service"
import { Request, Response } from "express"


export const donorJoinCampaignControl = async (req: Request, res: Response) => {
    const { campaignId } = req.params
    const result = await donorService.joinCampaign({ id: campaignId, campaignData: req.body });
    sendResponse(res, {
        success: true,
        message: "Campaign Join Successfully",
        data: result
    })
}