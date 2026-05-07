import express from "express";
import {
  bikashPaymentCallbackControll,
  campaignDetailsControll,
  sslcommerzPaymentCancelControll,
  sslcommerzPaymentFailControll,
  sslcommerzPaymentSuccessControll,
  totalCampaignsControll,
  userRolecontroll,
} from "./controller";
const router = express.Router();

router.get("/total_campaign", totalCampaignsControll);
router.get("/campaign_details/:id", campaignDetailsControll);
router.get("/user_role", userRolecontroll);

router.get("/bikash_payment_callback", bikashPaymentCallbackControll);
router.post("/sslcommerz_payment_success", sslcommerzPaymentSuccessControll);
router.post("/sslcommerz_payment_fail", sslcommerzPaymentFailControll);
router.post("/sslcommerz_payment_cancel", sslcommerzPaymentCancelControll);

export const publicRoutes = router;
