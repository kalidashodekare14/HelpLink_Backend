import express from 'express';
import { totalCampaignsControll, campaignDetailsControll, userRolecontroll, weatherRiskTrackControll } from './controller';
const router = express.Router();


router.get("/total_campaign", totalCampaignsControll);
router.get("/campaign_details/:id", campaignDetailsControll);
router.get("/user_role", userRolecontroll);
router.get("/weather_risk_track", weatherRiskTrackControll);



export const publicRoutes = router;