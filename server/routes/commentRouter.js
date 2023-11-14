import CommentController from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import express from "express";

const router = new express.Router();

router.get("/:commentId/like", CommentController.getAllLikes);
router.get("/:commentId", CommentController.getCommentById);
router.patch("/:commentId", authMiddleware, CommentController.changeComment);
router.post("/:commentId/like", authMiddleware, CommentController.setLike);
router.delete("/:commentId/like", authMiddleware, CommentController.deleteLike);
router.delete("/:commentId", authMiddleware, CommentController.deleteComment);

export default router;
