import express from 'express'
import requestController from '../controller/request.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
const router = express();

router.post('/sendRequest/:receiverId',authMiddleware.auth,requestController.sendRequest);

router.post('/actionOnRequest/:requestId',authMiddleware.auth,requestController.actionOnRequest);

router.post('/getAllRequest',authMiddleware.auth,requestController.getAllRequest);
export default router;