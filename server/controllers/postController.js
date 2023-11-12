import Post from "../models/TestPost.js";

class PostController {
  async getPosts(req, res) {
    const page = req.query.page ? Number(req.query.page) : 1;
    Post.getPosts(req, res, page);
  }

  async getPost(req, res) {
    Post.getPostById(req, res, req.params.postId);
  }

  async getPostCategories(req, res) {
    Post.getPostCategories(req, res, req.params.postId);
  }

  async createPost(req, res) {
    Post.createNewPost(req.body, res, req.user.login, req.user.userId);
  }

  async updatePost(req, res) {
    Post.updatePost(req.body, res, req.params.postId);
  }

  async deletePost(req, res) {
    Post.deletePost(req, res, req.params.postId);
  }
}

export default new PostController();
