import Post from "../models/Post.js";

class PostController {
  async getPosts(req, res) {
    const page = req.query.page ? Number(req.query.page) : 1;
    Post.getPosts(req, res, page);
  }

  async getPost(req, res) {
    Post.getPostById(req, res, req.params.postId);
  }

  async getLikes(req, res) {
    Post.getLikes(res, req.params.postId);
  }

  async getComments(req, res) {
    Post.getComments(res, req.params.postId);
  }

  async getPostCategories(req, res) {
    Post.getPostCategories(req, res, req.params.postId);
  }

  async createComment(req, res) {
    Post.createNewComment(req.user, req.body.content, res, req.params.postId);
  }

  async createLike(req, res) {
    Post.createNewLike(req.user, res, req.params.postId);
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

  async deleteLike(req, res) {
    Post.deleteLike(req.user, res);
  }
}

export default new PostController();
