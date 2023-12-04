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

    const findLikeRule = {
      where: { login: likeData.login, idComment: likeData.idComment },
    };

    await super.create(res, likeData, findLikeRule);
  }

  async getLikes(res, id) {
    await super.getAll(res, { where: { idComment: id } });
  }

  async destroyLike(res, user, id) {
    const findLikeRule = {
      where: { login: user.login, idComment: id },
    };

    await super.destroy(res, findLikeRule);
  }
}

export default new CommentLike();
