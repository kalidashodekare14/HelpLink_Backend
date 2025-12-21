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

export const bikashPaymentControl = async (req: Request, res: Response) => {
    const result = await donorService.bikashPayment(req.body);
    sendResponse(res, {
        success: true,
        message: "Bikash Payment Successfully",
        data: result
    })
}

export const bikashPaymentCallbackControll = async (req: Request, res: Response) => {
    const { paymentID, status } = req.query;
    if (status === "cancel") {
        return res.redirect(`http://localhost:3000/payment_cancel`);
    }
    if (status === "fail") {
        return res.redirect(`http://localhost:3000/payment_fail`);
    }
    if (status === "success") {
        return res.redirect(`http://localhost:3000/payment_success`);
    }
}