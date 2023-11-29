import UserPost from "../models/posts/UserPost.js";
import AdminPost from "../models/posts/AdminPost.js";
import PostLike from "../models/likes/PostLike.js";
import userAuthService from "../services/userAuthService.js";

class PostController {
  async getPosts(req, res) {
    const page = req.query.page ? Number(req.query.page) : 1;
    const isAuthUser = userAuthService.tryGetAuth(req);

    if (!isAuthUser) {
      await UserPost.getUserPost(req, res, page);
    } else {
      if (!req.user) {
        await UserPost.getUserPost(req, res, page);
      } else {
        await AdminPost.getAdminPost(req, res, page);
      }
    }
  }

  async getPostsByUserId(req, res) {
    const page = req.query.page ? Number(req.query.page) : 1;
    
    // I can get unaktive posts
    UserPost.getPostsByUserId(req, res, page, req.params.userId);
  }

  async getPost(req, res) {
    await UserPost.getPostById(req, res, req.params.postId);
  }

  async getLikes(req, res) {
    await PostLike.getLikes(res, req.params.postId);
  }

  async getComments(req, res) {
    await UserPost.getComments(res, req.params.postId);
  }

  async getPostCategories(req, res) {
    await UserPost.getPostCategories(req, res, req.params.postId);
  }

  async createComment(req, res) {
    await UserPost.createNewComment(
      req.user,
      req.body.content,
      res,
      req.params.postId
    );
  }

  async createLike(req, res) {
    await PostLike.createLike(res, req.user, req.params.postId);
  }

  async createPost(req, res) {
    await UserPost.creteUserPost(req.body, res, req.user.login, req.user.id);
  }

  async updatePost(req, res) {
    if (req.user.role == "user") {
      await UserPost.updateUserPost(req.body, res, req.params.postId);
    } else {
      await AdminPost.updateUserPost(req.body, res, req.params.postId);
    }
  }

  async deletePost(req, res) {
    await UserPost.deletePost(req, res, req.params.postId);
  }

  async deleteLike(req, res) {
    await PostLike.destroy(res, req.user);
  }
}

export default new PostController();
