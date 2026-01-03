"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const validation_1 = require("./validation");
const router = express_1.default.Router();
router.post('/join_campaign/:id', (0, validateRequest_1.default)(validation_1.donorJoinCampaignValidation), controller_1.donorJoinCampaignControl);
router.get('/donate_track/:email', controller_1.donateTrackControl);
// Bikash Payment Routes
router.post('/bikash_payment', controller_1.bikashPaymentControl);
// Bikash Payment Callback
router.get('/bikash_payment_callback', controller_1.bikashPaymentCallbackControll);
// SSLCommerz Payment Routes
router.post('/sslcommerz_payment', controller_1.sslcommerzPaymentControll);
// SSLCommerz Payment Callbacks
router.post('/sslcommerz_payment_success', controller_1.sslcommerzPaymentSuccessControll);
router.post('/sslcommerz_payment_fail', controller_1.sslcommerzPaymentFailControll);
router.post('/sslcommerz_payment_cancel', controller_1.sslcommerzPaymentCancelControll);
exports.donorRoutes = router;
//# sourceMappingURL=routes.js.map