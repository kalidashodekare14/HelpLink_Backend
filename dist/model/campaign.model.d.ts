export interface ICampaign {
    image: string[];
    title: string;
    description: string;
    category: string;
    location: {
        division: string;
        district: string;
        upazila: string;
        address: string;
    };
    situation: {
        severity: "High" | "Medium" | "Low";
        score: number;
    };
    request_status?: "Pending" | "Approved" | "Rejected";
    delivery_status?: "Assigned" | "Picked Up" | "Delivered" | "Cancelled";
    receiver_email: string;
}
export declare const Campaign: import("mongoose").Model<ICampaign, {}, {}, {}, import("mongoose").Document<unknown, {}, ICampaign, {}, {}> & ICampaign & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
//# sourceMappingURL=campaign.model.d.ts.map