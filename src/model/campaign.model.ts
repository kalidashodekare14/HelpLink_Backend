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
    request_status?: "Pending" | "Approved" | "Rejected";
    delivery_status?: "Assigned" | "Picked Up" | "Delivered" | "Cancelled";
    receiver_email: string;
    donors: [
        {
            donor_name: string,
            donor_email: string,
            amount: number,
            message: string,
            date: Date,
            payment_status: "Unpaid" | "Paid" | "Cancelled",
            payment_method: "Bkash" | "Nagad" | "SSLCommerz"
        }
    ]
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
        donors: [
            {
                donor_name: { type: String, required: true },
                donor_email: { type: String, required: true },
                amount: { type: Number, required: true },
                message: { type: String, required: true },
                date: { type: Date, required: true },
                payment_status: {
                    type: String,
                    enum: ["Unpaid", "Paid", "Cancelled"],
                    default: "Unpaid"
                },
                payment_method: {
                    type: String,
                    enum: ["Bkash", "Nagad", "SSLCommerz"]
                }
            }
        ],

    },
    { timestamps: true }
)

export const Campaign = model<ICampaign>("campaign", campaignSchema);