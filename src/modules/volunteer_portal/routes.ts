import express from 'express';
import { volOverviewInfoControll, totalCampaignsControll, requestStatusControll, deliveryStatusControll } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { requestStatusValidation, delivaryStatusValidation } from './validation';
const router = express.Router();



router.get("/volunteer_overview", volOverviewInfoControll);
router.get("/total_campaign", totalCampaignsControll);
router.patch("/request_status/:id", validateRequest(requestStatusValidation), requestStatusControll);
router.patch("/delivery_status/:id", validateRequest(delivaryStatusValidation), deliveryStatusControll);



export const volunteerRoutes = router;