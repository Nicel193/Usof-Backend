import express from "express";
import PostController from "../controllers/postController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//TODO: Add logic for admin
router.get('/', PostController.getPosts);
router.get('/:postId', PostController.getPost);
router.get('/:postId/categories', PostController.getPostCategories);
router.post('/', AuthMiddleware, PostController.createPost);
router.patch('/:postId', AuthMiddleware, PostController.updatePost);
router.delete('/:postId', AuthMiddleware, PostController.deletePost);

export default router;