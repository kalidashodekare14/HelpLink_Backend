"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    image: { type: String },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    password: {
        type: String,
        required: function () {
            return !this.isSocial;
        },
        minLength: 6,
    },
    isSocial: { type: Boolean, default: false },
    role: { type: String, enum: ["admin", "donor", "receiver", "volunteer"], default: "receiver" },
    isActive: { type: Boolean, required: true, default: true },
    gender: { type: String },
    location: {
        division: { type: String },
        district: { type: String },
        upazila: { type: String },
        address: { type: String }
    },
}, {
    timestamps: true
});
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};
exports.User = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=user.model.js.map