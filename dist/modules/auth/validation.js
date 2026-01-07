"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const zod_1 = require("zod");
exports.registerValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, "Name is required"),
        email: zod_1.z.string().email("Invalid email format"),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
        role: zod_1.z.enum(["donor", "receiver"]),
    })
});
exports.loginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Invalid email"),
        password: zod_1.z.string().min(6, "Password is required")
    })
});
//# sourceMappingURL=validation.js.map