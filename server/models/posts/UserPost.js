import Post from "./Post.js";

class UserPost extends Post {
  async creteUserPost(req, res, authorLogin, authorId) {
    await super.createNewPost(req, res, {
      authorId: authorId,
      authorLogin: authorLogin,
      title: req.title,
      publishDate: new Date(),
      isActive: true,
      content: req.content,
    });
  }

  async getUserPost(req, res, query) {
    await super.getPosts(req, res, query, {
      where: { isActive: true }
    })
  }

  async updateUserPost(req, res, postId) {
    await super.updatePost(
      req,
      res,
      {
        title: req.title,
        publishDate: new Date(),
        content: req.content,
      },
      postId
    );
  }
}

export default new UserPost();
