"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Donation = void 0;
const mongoose_1 = require("mongoose");
const donationSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true
});
exports.Donation = (0, mongoose_1.model)("Donation", donationSchema);
//# sourceMappingURL=donation.model.js.map