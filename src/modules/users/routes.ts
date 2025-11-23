import express from 'express';
import { userProfileControl, userProfileUpdateControl } from './controller';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();



router.get('/user_profile/:email', userProfileControl)
router.patch('/user_info_update/:email', userProfileUpdateControl);



export const userRoutes = router;