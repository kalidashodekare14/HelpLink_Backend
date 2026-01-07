import { Types } from "mongoose";
interface Idonation {
    campaign_id: string;
    donor_name: string;
    donor_email: string;
    message: string;
    amount: string;
    paymentID: string;
    payment_status: "pending" | "unpaid" | "paid";
    payment_method: "bKash" | "nagad" | "sslcommerz";
}
export declare const donorService: {
    joinCampaign: (payload: any) => Promise<(import("mongoose").Document<unknown, {}, import("../../model/campaign.model").ICampaign, {}, {}> & import("../../model/campaign.model").ICampaign & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    donateTrack: (payload: any) => Promise<{
        donationDetails: {
            amount: string;
            payment_status: "Pending" | "Unpaid" | "Paid";
            payment_method: "Bikash" | "Nagad" | "SSLCommerz";
            date: Date | undefined;
        }[];
        image?: string[] | undefined;
        title?: string | undefined;
        description?: string | undefined;
        category?: string | undefined;
        location?: import("mongoose").FlattenMaps<{
            division: string;
            district: string;
            upazila: string;
            address: string;
        }> | undefined;
        situation?: import("mongoose").FlattenMaps<{
            severity: "High" | "Medium" | "Low";
            score: number;
        }> | undefined;
        request_status?: "Pending" | "Approved" | "Rejected";
        delivery_status?: "Assigned" | "Picked Up" | "Delivered" | "Cancelled";
        receiver_email?: string | undefined;
        _id?: Types.ObjectId | undefined;
        __v?: number | undefined;
    }[]>;
    bikashPayment: (paymentInfo: Idonation) => Promise<{
        bkashURL: any;
    } | undefined>;
    sllcommerzPayment: (paymentInfo: Idonation) => Promise<{
        GatewayPageURL: any;
    } | undefined>;
};
export {};
//# sourceMappingURL=service.d.ts.map