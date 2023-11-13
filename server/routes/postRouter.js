import express from "express";
import PostController from "../controllers/postController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//TODO: Add logic for admin
router.get('/', PostController.getPosts);
router.get('/:postId', PostController.getPost);
router.get('/:postId/categories', PostController.getPostCategories);
router.get('/:postId/like', PostController.getLikes);
router.post('/', AuthMiddleware, PostController.createPost);
router.post('/:postId/like', AuthMiddleware, PostController.createLike);
router.patch('/:postId', AuthMiddleware, PostController.updatePost);
router.delete('/:postId', AuthMiddleware, PostController.deletePost);
router.delete('/:postId/like', AuthMiddleware, PostController.deleteLike);

export default router;