import { Like } from "./Like.js";
import DbPost from "../../db/scheme/post.js";
import DbLikes from "../../db/scheme/likes.js";

class PostLike extends Like {
  async createLike(res, user, id, likeType) {
    const likeData = {
      login: user.login,
      idPost: id,
      likeType: likeType,
      likeGroup: "post",
    }

    const findLikeRule = {
      where: { login: likeData.login, idPost: likeData.idPost },
    };

    await super.create(res, likeData, findLikeRule);
  }

  async getLikes(res, id) {
    await super.getAll(res, { where: { idPost: id } });
  }

  async destroyLike(res, user, id) {
    const findLikeRule = {
      where: { login: user.login, idPost: id },
    };

    await super.destroy(res, findLikeRule);
  }
}

export default new PostLike();
