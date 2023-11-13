import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/register', authController.reqistration);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);
router.post('/password-reset', authController.sendResetPassword);
router.post('/password-reset/:confirmtoken', authController.resetPassword);

export default router;