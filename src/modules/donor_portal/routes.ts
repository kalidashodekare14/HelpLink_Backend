import express from 'express';
import { donorJoinCampaignControl, donateTrackControl, bikashPaymentControl, bikashPaymentCallbackControll } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { donorJoinCampaignValidation } from './validation';
const router = express.Router();


router.post('/join_campaign/:id', validateRequest(donorJoinCampaignValidation), donorJoinCampaignControl);
router.get('/donate_track/:email', donateTrackControl);
router.post('/bikash_payment', bikashPaymentControl);
router.get('/bikash_payment_callback', bikashPaymentCallbackControll);

export const donorRoutes = router;