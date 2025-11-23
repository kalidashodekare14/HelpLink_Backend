import { Schema, model } from "mongoose";


export interface ICampaign {
    image: string[],
    title: string,
    description: string,
    category: string,
    location: {
        division: string,
        district: string,
        upazila: string,
        address: string
    },
    status?: "Pending" | "Approved" | "Rejected"
    receiver_email: string,
    donors: [
        {
            donor_email: string,
            amount: number,
            message: string,
            date: Date,
            status: "Pending" | "Confirmed" | "Cancelled"
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
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending"
        },
        receiver_email: { type: String, required: true },
        donors: [
            {
                donor_email: { type: String, required: true },
                amount: { type: Number, required: true },
                message: { type: String, required: true },
                date: { type: Date, required: true },
                status: {
                    type: String,
                    enum: ["Pending", "Approved", "Rejected"],
                    default: "Pending"
                }
            }
        ],

    },
    { timestamps: true }
)

export const Campaign = model<ICampaign>("campaign", campaignSchema);