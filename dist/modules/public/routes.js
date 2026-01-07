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
router.get('/bikash_payment_callback', controller_1.bikashPaymentCallbackControll);
router.post('/sslcommerz_payment_success', controller_1.sslcommerzPaymentSuccessControll);
router.post('/sslcommerz_payment_fail', controller_1.sslcommerzPaymentFailControll);
router.post('/sslcommerz_payment_cancel', controller_1.sslcommerzPaymentCancelControll);
exports.publicRoutes = router;
//# sourceMappingURL=routes.js.map