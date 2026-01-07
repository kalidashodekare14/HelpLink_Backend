"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Campaign = void 0;
const mongoose_1 = require("mongoose");
const campaignSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.Campaign = (0, mongoose_1.model)("campaign", campaignSchema);
//# sourceMappingURL=campaign.model.js.map