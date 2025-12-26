import express from 'express';
import { totalCampaignsControll, campaignDetailsControll, userRolecontroll } from './controller';
const router = express.Router();


router.get("/total_campaign", totalCampaignsControll);
router.get("/campaign_details/:id", campaignDetailsControll);
router.get("/user_role", userRolecontroll);



export const publicRoutes = router;