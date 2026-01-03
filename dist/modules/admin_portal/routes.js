"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const validation_1 = require("./validation");
const router = express_1.default.Router();
router.get("/overview_info", controller_1.overviewInfoControll);
router.get("/total_users", controller_1.totalUsersControll);
router.patch("/user_role/:id", (0, validateRequest_1.default)(validation_1.userRoleValidation), controller_1.userRoleManageControll);
router.patch("/user_active/:id", (0, validateRequest_1.default)(validation_1.userActiveValidation), controller_1.userActiveManageControll);
router.get("/total_campaign", controller_1.totalCampaignControll);
router.patch("/campaign_request_status/:id", (0, validateRequest_1.default)(validation_1.campaignStatusValidation), controller_1.campaignStatusManageControll);
router.patch("/campaign_delivery_status/:id", (0, validateRequest_1.default)(validation_1.campaignDeliStatusValidation), controller_1.campaignDevliveryStatusManageControll);
exports.adminRoutes = router;
//# sourceMappingURL=routes.js.map