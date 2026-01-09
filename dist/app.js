"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = require("./modules/auth/routes");
const routes_2 = require("./modules/receiver_portal/routes");
const routes_3 = require("./modules/donor_portal/routes");
const routes_4 = require("./modules/users/routes");
const routes_5 = require("./modules/volunteer_portal/routes");
const routes_6 = require("./modules/admin_portal/routes");
const routes_7 = require("./modules/public/routes");
const roleVerify_1 = require("./middlewares/roleVerify");
const app = (0, express_1.default)();
const corsOptions = {
    origin: ["http://localhost:3000", "https://helplink-frontend.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
// app.options("*", cors(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send(`
        <div>
          <h1>HelpLink Backend Running 🚀</h1>
            <p>🎉 Welcome to the HelpLink</p>
        </div>    
    `);
});
// API routes version
app.use("/api/v1/auth", routes_1.AuthRoutes);
app.use("/api/v1/public", routes_7.publicRoutes);
app.use("/api/v1/profile", routes_4.userRoutes);
app.use("/api/v1/receiver", (0, roleVerify_1.roleVerify)("receiver"), routes_2.receiverRoutes);
app.use("/api/v1/donor", (0, roleVerify_1.roleVerify)("donor"), routes_3.donorRoutes);
app.use("/api/v1/volunteer", (0, roleVerify_1.roleVerify)("volunteer"), routes_5.volunteerRoutes);
app.use("/api/v1/admin", (0, roleVerify_1.roleVerify)("admin"), routes_6.adminRoutes);
exports.default = app;
//# sourceMappingURL=app.js.map