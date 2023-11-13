import CommentController from "../controllers/commentController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

import express from "express";

const router = new express.Router();

router.get("/:commentId", CommentController.getCommentById);
router.patch("/:commentId", AuthMiddleware, CommentController.changeComment);
router.delete("/:commentId", AuthMiddleware, CommentController.deleteComment);
router.post("/:commentId/like", AuthMiddleware, CommentController.setLike);
router.delete("/:commentId/like", AuthMiddleware, CommentController.deleteLike);
router.get("/:commentId/like", CommentController.getAllLikes);

export default router;
