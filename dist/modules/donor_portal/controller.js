"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sslcommerzPaymentControll = exports.bikashPaymentControl = exports.donateTrackControl = exports.donorJoinCampaignControl = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const service_1 = require("./service");
const donorJoinCampaignControl = async (req, res) => {
    const { id } = req.params;
    console.log('checking campaign', id);
    const result = await service_1.donorService.joinCampaign({ id: id, campaignData: req.body });
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Campaign Join Successfully",
        data: result
    });
};
exports.donorJoinCampaignControl = donorJoinCampaignControl;
const donateTrackControl = async (req, res) => {
    const result = await service_1.donorService.donateTrack(req.params.email);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Campaign Join Successfully",
        data: result
    });
};
exports.donateTrackControl = donateTrackControl;
const bikashPaymentControl = async (req, res) => {
    const result = await service_1.donorService.bikashPayment(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Bikash Payment Successfully",
        data: result
    });
};
exports.bikashPaymentControl = bikashPaymentControl;
// export const bikashPaymentCallbackControll = async (req: Request, res: Response) => {
//     const { status } = req.query;
//     const paymentID = req.query.paymentID as string
//     if (status === "cancel") {
//         return res.redirect(`${config.frontend_url}/payment_cancel`);
//     }
//     if (status === "fail") {
//         return res.redirect(`${config.frontend_url}/payment_fail`);
//     }
//     if (status === "success") {
//         try {
//             const paymentInfo = await Donation.findOne({ paymentID });
//             const { data } = await axios.post(config.bkash_execute_payment_url, { paymentID }, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Accept: "application/json",
//                     authorization: paymentInfo?.id_token,
//                     'x-app-key': config.bkash_api_key,
//                 }
//             })
//             if (data && data.statusCode === "0000") {
//                 const statusUpdate = await Donation.findOneAndUpdate(
//                     { paymentID: paymentID },
//                     {
//                         $set: {
//                             payment_status: "Paid"
//                         }
//                     },
//                     {
//                         new: true
//                     }
//                 )
//                 if (statusUpdate) {
//                     await Donation.findOneAndUpdate(
//                         { paymentID: paymentID },
//                         {
//                             $set: {
//                                 id_token: ""
//                             }
//                         },
//                         {
//                             new: true
//                         }
//                     )
//                 }
//                 return res.redirect(`${config.frontend_url}/payment_success`);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }
const sslcommerzPaymentControll = async (req, res) => {
    const result = await service_1.donorService.sllcommerzPayment(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "SSLCommerz Payment Successfully",
        data: result
    });
};
exports.sslcommerzPaymentControll = sslcommerzPaymentControll;
// export const sslcommerzPaymentSuccessControll = async (req: Request, res: Response) => {
//     // Handle SSLCommerz payment success callback here
//     const { status, tran_id } = req.body;
//     console.log('SSLCommerz Callback Data', req.body);
//     if (status === "VALID") {
//         await Donation.findOneAndUpdate(
//             { paymentID: tran_id },
//             {
//                 $set: {
//                     payment_status: "Paid"
//                 }
//             },
//             {
//                 new: true
//             }
//         )
//         return res.redirect(`${config.frontend_url}/payment_success`);
//     } else {
//         return res.redirect(`${config.frontend_url}/payment_fail`);
//     }
// }
// export const sslcommerzPaymentFailControll = async (req: Request, res: Response) => {
//     // Handle SSLCommerz payment fail callback here
//     return res.redirect(`${config.frontend_url}/payment_fail`);
// }
// export const sslcommerzPaymentCancelControll = async (req: Request, res: Response) => {
//     // Handle SSLCommerz payment cancel callback here
//     return res.redirect(`${config.frontend_url}/payment_cancel`);
// }
//# sourceMappingURL=controller.js.map