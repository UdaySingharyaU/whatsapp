
import express from 'express';
import userController from '../controller/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
const router =express();


router.post('/signUp',userController.signUp);

router.post('/login',userController.login);

router.post('/completeProfile',authMiddleware.auth,userController.completeProfile);

export default router;