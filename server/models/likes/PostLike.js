import { Like } from "./Like.js";

class PostLike extends Like {
  async createLike(res, user, id) {
    await super.create(res, {
      login: user.login,
      idPost: id,
      likeType: "post",
    });
  }

  async getLikes(res, id) {
    await super.getAll(res, { where: { idPost: id } });
  }
}

export default new PostLike();
