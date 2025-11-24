import express from 'express';
import { totalCampaignsControll, campaignDetailsControll } from './controller';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();


router.get("/total_campaign", totalCampaignsControll);
router.get("/campaign_details/:id", campaignDetailsControll);




export const publicRoutes = router;