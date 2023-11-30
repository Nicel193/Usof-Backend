import DbLikes from "../../db/scheme/likes.js";

class Like {
  async create(res, likeData) {
    const findLikeRule = {
      where: { login: likeData.login, idPost: likeData.idPost },
    };

    try {
      if (await DbLikes.findOne(findLikeRule)) {
        await this.update(res, likeData, findLikeRule);
        return;
      }

      await DbLikes.create(likeData);

      res.json("Success");
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  async update(res, likeData, findRule) {
    try {
      await DbLikes.update({ likeType: likeData.likeType }, findRule);

      res.json("Like data updated");
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  async getAll(res, findRule) {
    try {
      const likes = await DbLikes.findAll(findRule);

      res.status(200).json(likes);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async destroy(res, user) {
    try {
      const existingLike = await DbLikes.findOne({
        where: { login: user.login },
      });

      if (!existingLike) {
        res.status(404).json("Not found");
        return;
      }

      await existingLike.destroy();

      res.json("Success");
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async getLikesCount(res) {}
}

export { Like };
