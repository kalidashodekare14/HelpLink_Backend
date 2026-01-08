import { model, Schema } from "mongoose";

interface Idonation {
    campaign_id: string,
    donor_name: string,
    phone_number: number,
    donor_email: string,
    message: string,
    amount: string,
    paymentID: string,
    id_token: string,
    payment_status: "Pending" | "Unpaid" | "Paid",
    payment_method: "Bikash" | "Nagad" | "SSLCommerz",
    createdAt?: Date;
    updatedAt?: Date;
}

const donationSchema = new Schema<Idonation>(
    {
        campaign_id: { type: String, required: true },
        donor_name: { type: String, required: true },
        phone_number: { type: Number, required: true },
        donor_email: { type: String, required: true },
        message: { type: String, required: true },
        amount: { type: String, required: true },
        paymentID: { type: String },
        id_token: { type: String },
        payment_status: { type: String, enum: ["Pending", "Unpaid", "Paid"] },
        payment_method: { type: String, enum: ["Bikash", "Nagad", "SSLCommerz"] }
    },
    {
        timestamps: true
    }
)


export const Donation = model<Idonation>("Donation", donationSchema);