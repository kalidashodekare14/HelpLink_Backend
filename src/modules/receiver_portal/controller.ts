import sendResponse from "../../utils/sendResponse";
import { receiverService } from "./service"
import { Request, Response } from "express";



// export const receiverProfileControl = async (req: Request, res: Response) => {
//     const result = await receiverService.receiverProfile(req.params.email);
//     sendResponse(res, {
//         success: true,
//         message: "Receiver Profile successfully!",
//         data: result
//     })
// }

// export const receiverProfileUpdateControl = async (req: Request, res: Response) => {
//     const result = await receiverService.receiverProfileUpdate({ email: req.params.email, receiverData: req.body });
//     sendResponse(res, {
//         success: true,
//         message: "Receiver Profile Update successfully!",
//         data: result
//     })
// }

export const receiverRequestControl = async (req: Request, res: Response) => {
    const result = await receiverService.helpRequestPost(req.body);
    sendResponse(res, {
        success: true,
        message: "Receiver Request successfully!",
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
