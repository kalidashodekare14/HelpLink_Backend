import express from 'express';
import { totalUsersControll, userRoleManageControll, userActiveManageControll, totalCampaignControll, campaignStatusManageControll } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { userRoleValidation, userActiveValidation, campaignStatusValidation } from './validation';
const router = express.Router();



router.get("/total_users", totalUsersControll);
router.patch("/user_role/:id", validateRequest(userRoleValidation), userRoleManageControll);
router.patch("/user_active/:id", validateRequest(userActiveValidation), userActiveManageControll);
router.get("/total_campaign", totalCampaignControll);
router.patch("/campaign_status/:id", validateRequest(campaignStatusValidation), campaignStatusManageControll);


export const adminRoutes = router;