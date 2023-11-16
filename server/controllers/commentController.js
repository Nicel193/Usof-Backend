import UserComment from "../models/comments/UserComment.js";
import AdminComment from "../models/comments/AdminComment.js";
import CommentLike from "../models/likes/CommentLike.js";

class CommentController {
  async getCommentById(req, res) {
    await UserComment.getCommentById(req.params.commentId, res);
  }

  async changeComment(req, res) {
    if (req.user.role == "user") {
      await UserComment.updateUserComment(req.params.commentId, res, req.body);
    } else {
      await AdminComment.updateAdminComment(req.params.commentId, res, req.body);
    }
  }

  async deleteComment(req, res) {
    await UserComment.deleteComment(req.params.commentId, res);
  }

  async getAllLikes(req, res) {
    await CommentLike.getLikes(res, req.params.commentId);
  }

  async setLike(req, res) {
    await ommentLike.createLike(res, req.user, req.params.commentId);
  }

  async deleteLike(req, res) {
    await CommentLike.destroy(res, req.user);
  }
}

export default new CommentController();
