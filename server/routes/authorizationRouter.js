import express from "express";

import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js"
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post('/register', authController.reqistration);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authMiddleware, roleMiddleware(['user', 'admin']), authController.refresh);
router.post('/password-reset', authController.sendResetPassword);
router.post('/password-reset/:confirmtoken', authController.resetPassword);

export default router;