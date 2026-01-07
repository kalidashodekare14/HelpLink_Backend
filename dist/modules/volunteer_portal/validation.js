"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delivaryStatusValidation = exports.requestStatusValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.requestStatusValidation = zod_1.default.object({
    body: zod_1.default.object({
        request_status: zod_1.default.enum(["Pending", "Approved", "Rejected"], "Invalid Request status")
    }),
    params: zod_1.default.object({
        id: zod_1.default.string().min(1, "Request ID is required")
    })
});
exports.delivaryStatusValidation = zod_1.default.object({
    body: zod_1.default.object({
        delivery_status: zod_1.default.enum(["Assigned", "Picked Up", "Delivered", "Cancelled"], "Invalid Request status")
    }),
    params: zod_1.default.object({
        id: zod_1.default.string().min(1, "Request ID is required")
    })
});
//# sourceMappingURL=validation.js.map