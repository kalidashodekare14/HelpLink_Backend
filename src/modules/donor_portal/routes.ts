import express from 'express';
import { donorJoinCampaignControl, donateTrackControl } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { donorJoinCampaignValidation } from './validation';
const router = express.Router();


router.post('/join_campaign/:id', validateRequest(donorJoinCampaignValidation), donorJoinCampaignControl);
router.get('/donate_track/:email', donateTrackControl);


export const donorRoutes = router;