import express from 'express';
import {
    donorJoinCampaignControl,
    donateTrackControl,
    bikashPaymentControl,
    // bikashPaymentCallbackControll,
    sslcommerzPaymentControll,
    // sslcommerzPaymentSuccessControll,
    // sslcommerzPaymentFailControll,
    // sslcommerzPaymentCancelControll
} from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { donorJoinCampaignValidation } from './validation';
const router = express.Router();


router.post('/join_campaign/:id', validateRequest(donorJoinCampaignValidation), donorJoinCampaignControl);
router.get('/donate_track/:email', donateTrackControl);
// Bikash Payment Routes
router.post('/bikash_payment', bikashPaymentControl);
// Bikash Payment Callback
// router.get('/bikash_payment_callback', bikashPaymentCallbackControll);
// SSLCommerz Payment Routes
router.post('/sslcommerz_payment', sslcommerzPaymentControll);
// SSLCommerz Payment Callbacks
// router.post('/sslcommerz_payment_success', sslcommerzPaymentSuccessControll);
// router.post('/sslcommerz_payment_fail', sslcommerzPaymentFailControll);
// router.post('/sslcommerz_payment_cancel', sslcommerzPaymentCancelControll);

export const donorRoutes = router;