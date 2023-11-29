import { Like } from "./Like.js";

class CommentLike extends Like {
  async createLike(res, user, id) {
    super.create(res, {
      login: user.login,
      idComment: id,
      likeType: "like",
      likeGroup: "comment"
    });
  }

  async getLikes(res, id) {
    await super.getAll(res, { where: { idComment: id } });
  }
}

export default new CommentLike();
