"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.get("/total_campaign", controller_1.totalCampaignsControll);
router.get("/campaign_details/:id", controller_1.campaignDetailsControll);
router.get("/user_role", controller_1.userRolecontroll);
router.get("/weather_risk_track", controller_1.weatherRiskTrackControll);
exports.publicRoutes = router;
//# sourceMappingURL=routes.js.map