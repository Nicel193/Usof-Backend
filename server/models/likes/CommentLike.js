import DbComments from "../../db/scheme/comments.js";
import { Like } from "./Like.js";

class CommentLike extends Like {
  async createLike(res, user, id, likeType) {
    const likeData = {
      login: user.login,
      idComment: id,
      likeType: likeType,
      likeGroup: "comment"
    };

    await super.create(res, likeData);
  }

  async getLikes(res, id) {
    await super.getAll(res, { where: { idComment: id } });
  }
}

export default new CommentLike();
