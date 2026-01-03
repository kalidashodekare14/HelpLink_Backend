"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../../model/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
exports.AuthService = {
    registerUser: async (payload) => {
        const { name, email, password, role } = payload;
        const hashPassword = await bcryptjs_1.default.hash(password, 14);
        const queryUser = await user_model_1.User.findOne({ email: email });
        if (queryUser) {
            throw Error("User already exits");
        }
        const user = await user_model_1.User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        return user;
    },
    loginUser: async (payload) => {
        const { email, password } = payload;
        const user = await user_model_1.User.findOne({ email }).select("+password");
        if (!user)
            throw new Error("User not found");
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            throw new Error("Invalid Crenentials");
        if (user.isActive === false) {
            throw new Error("Your account has been disabled");
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role }, env_1.config.jwt_secret, {
            expiresIn: "7d"
        });
        return { token, user };
    },
    socialLogin: async (payload) => {
        const { name, email, image } = payload;
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            const saveUser = await user_model_1.User.create({
                name: name,
                email: email,
                image: image,
                isSocial: true,
            });
            const token = jsonwebtoken_1.default.sign({ id: saveUser?._id, email: saveUser?.email, role: saveUser?.role }, env_1.config.jwt_secret, { expiresIn: "7d" });
            return {
                token,
                user: saveUser
            };
        }
        const token = jsonwebtoken_1.default.sign({ id: user?._id, email: user?.email, role: user?.role }, env_1.config.jwt_secret, { expiresIn: "7d" });
        return {
            token,
            user: user
        };
    }
};
//# sourceMappingURL=service.js.map