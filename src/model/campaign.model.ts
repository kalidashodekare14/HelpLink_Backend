import { Schema, model } from "mongoose";


export interface ICampaign {
    image: string[];
    title: string;
    description: string;
    category: string;
    location: {
        division: string,
        district: string,
        upazila: string,
        address: string
    };
    situation: {
        severity: "High" | "Medium" | "Low",
        score: number
    };
    request_status?: "Pending" | "Approved" | "Rejected";
    delivery_status?: "Assigned" | "Picked Up" | "Delivered" | "Cancelled";
    receiver_email: string;

}

const campaignSchema = new Schema<ICampaign>(
    {
        image: {
            type: [String],
            default: []
        },
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        location: {
            division: { type: String, required: true },
            district: { type: String, required: true },
            upazila: { type: String, required: true },
            address: { type: String, required: true }
        },
        situation: {
            severity: {
                type: String,
                enum: ["High", "Medium", "Low"],
                required: true
            },
            score: { type: Number, required: true }
        },
        request_status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending"
        },
        delivery_status: {
            type: String,
            enum: ["Assigned", "Picked Up", "Delivered", "Cancelled"],
            default: "Assigned"
        },
        receiver_email: { type: String, required: true },

    },
    { timestamps: true }
)

export const Campaign = model<ICampaign>("campaign", campaignSchema);