import UserPost from "../models/posts/UserPost.js";
import PostLike from "../models/likes/PostLike.js";

class PostController {
  async getPosts(req, res) {
    const page = req.query.page ? Number(req.query.page) : 1;
    UserPost.getPosts(req, res, page);
  }

  async getPost(req, res) {
    UserPost.getPostById(req, res, req.params.postId);
  }

  async getLikes(req, res) {
    PostLike.getLikes(res, req.params.postId);
  }

  async getComments(req, res) {
    UserPost.getComments(res, req.params.postId);
  }

  async getPostCategories(req, res) {
    UserPost.getPostCategories(req, res, req.params.postId);
  }

  async createComment(req, res) {
    UserPost.createNewComment(
      req.user,
      req.body.content,
      res,
      req.params.postId
    );
  }

  async createLike(req, res) {
    PostLike.createLike(res, req.user, req.params.postId);
  }

  async createPost(req, res) {
    UserPost.createNewPost(req.body, res, req.user.login, req.user.userId);
  }

  async updatePost(req, res) {
    if (req.user.role == "user") {
      UserPost.updateUserPost(req.body, res, req.params.postId);
    } else {
    }
  }

  async deletePost(req, res) {
    UserPost.deletePost(req, res, req.params.postId);
  }

  async deleteLike(req, res) {
    PostLike.destroy(res, req.user);
  }
}

export default new PostController();
