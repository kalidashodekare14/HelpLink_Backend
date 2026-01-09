import express from 'express';
import {
    overviewInfoControll,
    totalUsersControll,
    userRoleManageControll,
    userActiveManageControll,
    totalCampaignControll,
    campaignStatusManageControll,
    campaignDevliveryStatusManageControll,
    totalDonationControll
} from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { userRoleValidation, userActiveValidation, campaignStatusValidation, campaignDeliStatusValidation } from './validation';
const router = express.Router();



router.get("/overview_info", overviewInfoControll);
router.get("/total_users", totalUsersControll);
router.patch("/user_role/:id", validateRequest(userRoleValidation), userRoleManageControll);
router.patch("/user_active/:id", validateRequest(userActiveValidation), userActiveManageControll);
router.get("/total_campaign", totalCampaignControll);
router.patch("/campaign_request_status/:id", validateRequest(campaignStatusValidation), campaignStatusManageControll);
router.patch("/campaign_delivery_status/:id", validateRequest(campaignDeliStatusValidation), campaignDevliveryStatusManageControll);
router.get("/total_donation", totalDonationControll);

export const adminRoutes = router;