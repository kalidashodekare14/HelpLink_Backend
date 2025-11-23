import sendResponse from "../../utils/sendResponse";
import { volunteerService } from "./service"
import { Response, Request } from "express"

export const totalCampaignsControll = async (req: Request, res: Response) => {
    const result = await volunteerService.totalCampaigns();
    sendResponse(res, {
        success: true,
        message: "Total Campaign Successfully",
        data: result
    })
}

export const requestStatusControll = async (req: Request, res: Response) => {
    const requestData = {
        id: req.params.id,
        status: req.body.request_status
    }
    const result = await volunteerService.verifyRequest(requestData);
    sendResponse(res, {
        success: true,
        message: "Request Status Successfully",
        data: result
    })
}

export const deliveryStatusControll = async (req: Request, res: Response) => {
    const requestData = {
        id: req.params.id,
        status: req.body.delivery_status
    }
    const result = await volunteerService.assignedDelivery(requestData);
    sendResponse(res, {
        success: true,
        message: "Delivary Status Successfully",
        data: result
    })
}


