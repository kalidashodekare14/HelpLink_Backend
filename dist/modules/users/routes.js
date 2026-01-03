"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
const upload_1 = require("../../middlewares/upload");
router.get('/user_profile/:email', controller_1.userProfileControl);
router.post("/image_upload/:email", upload_1.upload.single("image"), controller_1.userProfileImageUploadControl);
router.patch('/user_info_update/:email', controller_1.userProfileUpdateControl);
exports.userRoutes = router;
//# sourceMappingURL=routes.js.map