import  { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { wrapper } from '../utils/index.js';

const authRoute = Router();

authRoute.post('/signup', wrapper(authController.signUp));
authRoute.post('/login', wrapper(authController.login));

export default authRoute; 