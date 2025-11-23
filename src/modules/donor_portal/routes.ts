import express from 'express';
import { donorJoinCampaignControl } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { donorJoinCampaignValidation } from './validation';
const router = express.Router();


router.post('/:campaignId/join', validateRequest(donorJoinCampaignValidation), donorJoinCampaignControl);


export const donorRoutes = router;