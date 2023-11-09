import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();


//TODO: Add reset pass by email
router.post('/register', authController.reqistration);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);
// router.post('/reset', authController.reset);

export default router;