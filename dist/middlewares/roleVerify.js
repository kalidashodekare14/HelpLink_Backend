"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const roleVerify = (...roles) => {
    return (req, res, next) => {
        if (req.methods === "OPTIONS") {
            return next();
        }
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "Access denied. No token provided." });
            }
            const decoded = jsonwebtoken_1.default.verify(token, env_1.config.jwt_secret);
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: "You don't have permission" });
            }
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    };
};
exports.roleVerify = roleVerify;
//# sourceMappingURL=roleVerify.js.map