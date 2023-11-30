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

    await super.create(res, likeData);
  }

  async getLikes(res, id) {
    await super.getAll(res, { where: { idPost: id } });
  }
}

export default new PostLike();
