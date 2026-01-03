"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiverRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const upload_1 = require("../../middlewares/upload");
const router = express_1.default.Router();
router.post('/receiver_request', controller_1.receiverRequestControl);
router.post('/campaign_image_upload', upload_1.upload.array("files", 5), controller_1.campaignImageUploadControl);
router.get('/receiver_track_request/:email', controller_1.trackRequestControl);
router.get('/campaign_request_info/:id', controller_1.campaignRequestInfoControl);
router.patch('/campaign_request_update/:id', controller_1.campaignRequestUpdateControl);
router.delete('/campaign_request_delete/:id', controller_1.campaignRequestDeleteControll);
exports.receiverRoutes = router;
//# sourceMappingURL=routes.js.map