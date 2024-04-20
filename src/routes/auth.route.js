import  { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { wrapper } from '../utils/index.js';
import { isAuthenticated } from '../middlewares/auth.js';

const authRoute = Router();

authRoute.post('/signup', wrapper(authController.signUp));
authRoute.post('/login', wrapper(authController.login));
authRoute.get('/', isAuthenticated, wrapper(authController.getUser));

export default authRoute; 