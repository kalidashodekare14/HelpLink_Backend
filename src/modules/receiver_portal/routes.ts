import express from 'express';
import { receiverProfileControl, receiverProfileUpdateControl, receiverRequestControl, trackRequestControl } from './controller';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router()



router.get('/receiver_profile/:email', receiverProfileControl)
router.patch('/receiver_info_update/:email', receiverProfileUpdateControl);
router.post('/receiver_request', receiverRequestControl);
router.get('/receiver_track_request/:email', trackRequestControl);


export const receiverRoutes = router