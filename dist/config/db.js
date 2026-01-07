"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectdb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const connectdb = async () => {
    try {
        await mongoose_1.default.connect(env_1.config.db_url);
        console.log("MongoDB Connected 🔗");
    }
    catch (error) {
        console.log('Database connection failed ❌', error);
        process.exit(1);
    }
};
exports.connectdb = connectdb;
//# sourceMappingURL=db.js.map