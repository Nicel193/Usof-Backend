import express from "express";
import PostController from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', PostController.getPosts);
router.get('/:postId', PostController.getPost);
router.get('/:postId/categories', PostController.getPostCategories);
router.get('/:postId/like', PostController.getLikes);

//TODO: Must be transfer in user router
router.get('/:userId/user', PostController.getPostsByUserId);

router.get('/:postId/comments', PostController.getComments);
router.post('/', authMiddleware, PostController.createPost);
router.post('/:postId/comments', authMiddleware, PostController.createComment);
router.post('/:postId/like', authMiddleware, PostController.createLike);
router.patch('/:postId', authMiddleware, PostController.updatePost);
router.delete('/:postId', authMiddleware, PostController.deletePost);
router.delete('/:postId/like', authMiddleware, PostController.deleteLike);

export default router;