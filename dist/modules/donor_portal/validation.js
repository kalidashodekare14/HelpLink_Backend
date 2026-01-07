"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donorJoinCampaignValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.donorJoinCampaignValidation = zod_1.default.object({
    body: zod_1.default.object({
        donor_name: zod_1.default.string(),
        donor_email: zod_1.default.string().email("Valid donor email required"),
        message: zod_1.default.string(),
        amount: zod_1.default.number().min(1, "Amount must be greater than 0"),
        request_status: zod_1.default.enum(["Unpaid", "Paid", "Cancelled"]).optional(),
        payment_method: zod_1.default.enum(["Bkash", "Nagad", "SSLCommerz"]).optional()
    }),
    params: zod_1.default.object({
        id: zod_1.default.string().min(1, "Campaign Id is required")
    })
});
//# sourceMappingURL=validation.js.map