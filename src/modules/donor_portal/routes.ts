import express from "express";
import {
  bikashPaymentControl,
  donateTrackControl,
  sslcommerzPaymentControll,
} from "./controller";

const router = express.Router();

router.get("/donate_track/:email", donateTrackControl);
// Bikash Payment Routes
router.post("/bikash_payment", bikashPaymentControl);

// SSLCommerz Payment Routes
router.post("/sslcommerz_payment", sslcommerzPaymentControll);

export const donorRoutes = router;
