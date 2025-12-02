import express from 'express';
import { userProfileControl, userProfileImageUploadControl, userProfileUpdateControl } from './controller';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();
import { upload } from '../../middlewares/upload'


router.get('/user_profile/:email', userProfileControl);
router.post("/image_upload/:email", upload.single("image"), userProfileImageUploadControl);
router.patch('/user_info_update/:email', userProfileUpdateControl);



export const userRoutes = router;