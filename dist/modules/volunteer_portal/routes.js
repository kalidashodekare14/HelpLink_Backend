"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.volunteerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const validation_1 = require("./validation");
const router = express_1.default.Router();
router.get("/volunteer_overview", controller_1.volOverviewInfoControll);
router.get("/total_campaign", controller_1.totalCampaignsControll);
router.patch("/request_status/:id", (0, validateRequest_1.default)(validation_1.requestStatusValidation), controller_1.requestStatusControll);
router.patch("/delivery_status/:id", (0, validateRequest_1.default)(validation_1.delivaryStatusValidation), controller_1.deliveryStatusControll);
exports.volunteerRoutes = router;
//# sourceMappingURL=routes.js.map