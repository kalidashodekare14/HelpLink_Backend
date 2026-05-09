"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.get("/donate_track/:email", controller_1.donateTrackControl);
// Bikash Payment Routes
router.post("/bikash_payment", controller_1.bikashPaymentControl);
// SSLCommerz Payment Routes
router.post("/sslcommerz_payment", controller_1.sslcommerzPaymentControll);
exports.donorRoutes = router;
//# sourceMappingURL=routes.js.map