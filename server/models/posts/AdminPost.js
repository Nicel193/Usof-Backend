import Post from "./Post.js";

class AdminPost extends Post {
  async getAdminPost(req, res, query) {
    await super.getPosts(req, res, query, {});
  }

  async updateUserPost(req, res, postId) {
    await super.updatePost(
      req,
      res,
      {
        isActive: req.isActive,
      },
      postId
    );
  }
}

export default new AdminPost();
