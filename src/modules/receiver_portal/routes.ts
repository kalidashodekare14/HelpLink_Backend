import express from 'express';
import { receiverRequestControl, campaignImageUploadControl, trackRequestControl } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../middlewares/upload';
const router = express.Router()



// router.get('/receiver_profile/:email', receiverProfileControl)
// router.patch('/receiver_info_update/:email', receiverProfileUpdateControl);
router.post('/receiver_request', receiverRequestControl);
router.post('/campaign_image_upload', upload.array("files", 5), campaignImageUploadControl);
router.get('/receiver_track_request/:email', trackRequestControl);


export const receiverRoutes = router