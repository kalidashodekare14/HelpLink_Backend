export interface Idonation {
    campaign_id: string;
    donor_name: string;
    phone_number: number;
    donor_email: string;
    message: string;
    amount: number;
    paymentID: string;
    id_token: string;
    payment_status: "Pending" | "Unpaid" | "Paid";
    payment_method: "Bikash" | "Nagad" | "SSLCommerz";
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const Donation: import("mongoose").Model<Idonation, {}, {}, {}, import("mongoose").Document<unknown, {}, Idonation, {}, {}> & Idonation & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
//# sourceMappingURL=donation.model.d.ts.map