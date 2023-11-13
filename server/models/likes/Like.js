import DbLikes from "../../db/scheme/likes.js";

class Like {
  async create(res, likeData) {
    try {
      await DbLikes.create(likeData);

      res.json("Success");
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        res
          .status(400)
          .json("Duplicate entry. This login has already liked this post");

        return;
      }

      res.status(500).json("Internal Server Error");
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
        where: { login: user.login }
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
}

export { Like };
