import Comment from "../models/Comment.js";
import CommentLike from "../models/likes/CommentLike.js";

class CommentController {
  async getCommentById(req, res) {
    await Comment.getCommentById(req.params.commentId, res);
  }

  async changeComment(req, res) {
    await Comment.changeComment(req.params.commentId, req.body, res);
  }

  async deleteComment(req, res) {
    await Comment.deleteComment(req.params.commentId, res);
  }

  async getAllLikes(req, res) {
    CommentLike.getLikes(res, req.params.commentId);
  }

  async setLike(req, res) {
    CommentLike.createLike(res, req.user, req.params.commentId);
  }

  async deleteLike(req, res) {
    CommentLike.destroy(res, req.user);
  }
}

export default new CommentController();
