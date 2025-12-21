import axios from "axios";
import sendResponse from "../../utils/sendResponse";
import { donorService } from "./service"
import { Request, Response } from "express"
import { config } from "../../config/env";
import { Donation } from "../../model/donation.model";


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
    const { status } = req.query;
    const paymentID = req.query.paymentID as string
    if (status === "cancel") {
        return res.redirect(`http://localhost:3000/payment_cancel`);
    }
    if (status === "fail") {
        return res.redirect(`http://localhost:3000/payment_fail`);
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
                return res.redirect(`http://localhost:3000/payment_success`);
            }
        } catch (error) {
            console.log(error);
        }
    }
}