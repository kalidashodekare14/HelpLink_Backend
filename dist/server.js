"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const env_1 = require("./config/env");
(0, db_1.connectdb)();
const isLocal = process.env.NODE_ENV !== "production";
if (isLocal) {
    app_1.default.listen(env_1.config.port, () => {
        console.log(`Server running on port ${env_1.config.port}`);
    });
}
//# sourceMappingURL=server.js.map