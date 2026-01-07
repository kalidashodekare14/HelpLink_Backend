"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignDeliStatusValidation = exports.campaignStatusValidation = exports.userActiveValidation = exports.userRoleValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userRoleValidation = zod_1.default.object({
    body: zod_1.default.object({
        role: zod_1.default.enum(["admin", "donor", "receiver", "volunteer"], "Invalid status")
    }),
    params: zod_1.default.object({
        id: zod_1.default.string().min(1, "Request ID is required")
    })
});
exports.userActiveValidation = zod_1.default.object({
    body: zod_1.default.object({
        status: zod_1.default.boolean()
    }),
    params: zod_1.default.object({
        id: zod_1.default.string().min(1, "Request ID is required")
    })
});
exports.campaignStatusValidation = zod_1.default.object({
    body: zod_1.default.object({
        request_status: zod_1.default.enum(["Pending", "Approved", "Rejected"], "Invalid status")
    }),
    params: zod_1.default.object({
        id: zod_1.default.string().min(1, "Request ID is required")
    })
});
exports.campaignDeliStatusValidation = zod_1.default.object({
    body: zod_1.default.object({
        delivery_status: zod_1.default.enum(["Assigned", "Picked Up", "Delivered", "Cancelled"], "Invalid status")
    }),
    params: zod_1.default.object({
        id: zod_1.default.string().min(1, "Request ID is required")
    })
});
//# sourceMappingURL=validation.js.map