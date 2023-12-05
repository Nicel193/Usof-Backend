import express from "express";
import UserController from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import { upload } from "../services/storageService.js";

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(["admin"]), UserController.createUser);
router.get('/', UserController.getUsers);
router.get('/:userId', UserController.getUserById);
router.patch('/:userId', authMiddleware, roleMiddleware(["admin"]), UserController.updateUser);
router.post('/uavatar', authMiddleware, upload.single('file'), UserController.addAvatar);
router.delete('/:userId', authMiddleware, roleMiddleware(["admin"]), UserController.deleteUser);

export default router;