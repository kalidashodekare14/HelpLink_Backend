import sendResponse from "../../utils/sendResponse";
import { receiverService } from "./service"
import { Request, Response } from "express";


export const receiverRequestControl = async (req: Request, res: Response) => {
    const result = await receiverService.helpRequestPost(req.body);
    sendResponse(res, {
        success: true,
        message: "Receiver Request successfully!",
        data: result
    })
}

export const campaignImageUploadControl = async (req: Request, res: Response) => {

    const result = await receiverService.campaignImageUpload(req.files);
    sendResponse(res, {
        success: true,
        message: "Campaign Image Upload successfully!",
        data: result
    })
}

export const trackRequestControl = async (req: Request, res: Response) => {
    console.log('checking request email', req.params.email);
    const result = await receiverService.trackRequest(req.params.email);
    sendResponse(res, {
        success: true,
        message: "Receiver Track successfully!",
        data: result
    })
}


export const campaignRequestInfoControl = async (req: Request, res: Response) => {
    const result = await receiverService.campaignRequestInfo(req.params.id);
    sendResponse(res, {
        success: true,
        message: "Campaign Request Info successfully!",
        data: result
    })
}

export const campaignRequestUpdateControl = async (req: Request, res: Response) => {
    const campaignInfo = {
        campaignId: req.params.id,
        updateData: req.body
    }
    const result = await receiverService.campaignRequestUpdate(campaignInfo);
    sendResponse(res, {
        success: true,
        message: "Campaign Request Update successfully!",
        data: result
    })
}

export const campaignRequestDeleteControll = async (req: Request, res: Response) => {
    const result = await receiverService.campaignRequestDelete(req.params.id);
    sendResponse(res, {
        success: true,
        message: "Campaign Request Delete successfully!",
        data: result
    })
}
