import express from 'express';
import { registerUser, loginUser, socialLoginControll } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { registerValidation, loginValidation } from './validation'
const router = express.Router();


router.post('/register', validateRequest(registerValidation), registerUser);
router.post("/login", validateRequest(loginValidation), loginUser);
router.post('/social_login', socialLoginControll);

export const AuthRoutes = router

