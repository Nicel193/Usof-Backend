import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getUsers);
router.get('/:userId', UserController.getUserById);
router.patch('/:userId', UserController.updateUser);
router.patch('/avatar', UserController.addAvatar);
router.delete('/:userId', UserController.deleteUser);

export default router;