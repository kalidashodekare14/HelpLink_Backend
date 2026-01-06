import axios from "axios";
import { config } from "../../config/env";
import { Donation } from "../../model/donation.model";
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

export const bikashPaymentCallbackControll = async (req: Request, res: Response) => {
    const { status } = req.query;
    const paymentID = req.query.paymentID as string
    if (status === "cancel") {
        return res.redirect(`${config.frontend_url}/payment_cancel`);
    }
    if (status === "fail") {
        return res.redirect(`${config.frontend_url}/payment_fail`);
    }
    if (status === "success") {
        try {
            const paymentInfo = await Donation.findOne({ paymentID });
            const { data } = await axios.post(config.bkash_execute_payment_url, { paymentID }, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    authorization: paymentInfo?.id_token,
                    'x-app-key': config.bkash_api_key,
                }
            })
            if (data && data.statusCode === "0000") {
                const statusUpdate = await Donation.findOneAndUpdate(
                    { paymentID: paymentID },
                    {
                        $set: {
                            payment_status: "Paid"
                        }
                    },
                    {
                        new: true
                    }
                )
                if (statusUpdate) {
                    await Donation.findOneAndUpdate(
                        { paymentID: paymentID },
                        {
                            $set: {
                                id_token: ""
                            }
                        },
                        {
                            new: true
                        }
                    )
                }
                return res.redirect(`${config.frontend_url}/payment_success`);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export const sslcommerzPaymentSuccessControll = async (req: Request, res: Response) => {
    // Handle SSLCommerz payment success callback here
    const { status, tran_id } = req.body;

    if (status === "VALID") {
        await Donation.findOneAndUpdate(
            { paymentID: tran_id },
            {
                $set: {
                    payment_status: "Paid"
                }
            },
            {
                new: true
            }
        )
        return res.redirect(`${config.frontend_url}/payment_success`);
    } else {
        return res.redirect(`${config.frontend_url}/payment_fail`);
    }
}

export const sslcommerzPaymentFailControll = async (req: Request, res: Response) => {
    // Handle SSLCommerz payment fail callback here
    return res.redirect(`${config.frontend_url}/payment_fail`);
}

export const sslcommerzPaymentCancelControll = async (req: Request, res: Response) => {
    // Handle SSLCommerz payment cancel callback here
    return res.redirect(`${config.frontend_url}/payment_cancel`);
}

