import express from 'express';
import { receiverRequestControl, campaignImageUploadControl, trackRequestControl, campaignRequestInfoControl, campaignRequestUpdateControl } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../middlewares/upload';
const router = express.Router()



router.post('/receiver_request', receiverRequestControl);
router.post('/campaign_image_upload', upload.array("files", 5), campaignImageUploadControl);
router.get('/receiver_track_request/:email', trackRequestControl);
router.get('/campaign_request_info/:id', campaignRequestInfoControl);
router.patch('/campaign_request_update/:id', campaignRequestUpdateControl);

export const receiverRoutes = router