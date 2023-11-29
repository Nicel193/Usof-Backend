import DbCategory from "../../db/scheme/categories.js";
import DbPost from "../../db/scheme/post.js";
import DbPostCategory from "../../db/scheme/posts-categories.js";
import DbComments from "../../db/scheme/comments.js";
import { Op } from "sequelize";

const PostsPerPage = 10;

class Post {
  sortAndFilter(query, findRule) {
    const sortType = query.sort || "date";
    const sortOrder = query.order || "desc";
    const category = query.category;
    const startDate = query.startDate;
    const endDate = query.endDate;

    switch (sortType) {
      case "likes":
        // findRule.order = [["likesCount", sortOrder.toUpperCase()]];
        break;
      case "date":
        findRule.order = [["publishDate", sortOrder.toUpperCase()]];
        break;
      default:
        findRule.order = [["publishDate", "DESC"]];
        break;
    }

    if (category) {
      findRule.include = [
        {
          model: DbCategory,
          where: { id: category },
        },
      ];
    }

    if (startDate && endDate) {
      findRule.where = {
        publishDate: {
          [Op.between]: [startDate, endDate],
        },
      };
    } else if (startDate) {
      findRule.where = {
        publishDate: {
          [Op.gte]: startDate,
        },
      };
    } else if (endDate) {
      findRule.where = {
        publishDate: {
          [Op.lte]: endDate,
        },
      };
    }
  }

  //TODO: Deligate sorting and filtering logic
  async getPosts(req, res, query, findRule) {
    const page = query.page ? Number(req.query.page) : 1;

    this.sortAndFilter(query, findRule);

    try {
      const postsCount = await DbPost.count(findRule);
      const offset = (page - 1) * PostsPerPage;

      findRule.limit = PostsPerPage;
      findRule.offset = offset;

      const posts = await DbPost.findAll(findRule);
      const totalPages = Math.ceil(postsCount / PostsPerPage);

      res.json({
        posts: posts,
        totalPages: totalPages,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async getPostsByUserId(req, res, query, userId) {
    await this.getPosts(req, res, query, {
      where: { authorId: userId, isActive: true },
    });
  }

  async getPostById(req, res, postId) {
    try {
      const post = await DbPost.findByPk(postId);

      if (!post) {
        res.status(400).json("Post not found");
        return;
      }

      res.json(post);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async getPostCategories(req, res, postId) {
    try {
      const post = await DbPost.findByPk(postId);

      if (!post) {
        res.status(400).json("Post not found");
        return;
      }

      const categories = post.categories;
      res.json(categories);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async getComments(res, postId) {
    try {
      const likes = await DbComments.findAll({
        where: { postId: postId },
      });

      res.status(200).json(likes);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async createNewComment(user, content, res, postId) {
    try {
      await DbComments.create({
        loginOwner: user.login,
        idOwner: user.id,
        postId: postId,
        content: content,
        date: new Date(),
      });

      res.json("Success");
    } catch (error) {
      console.log(error);
      res.status(500).json("Internal Server Error");
    }
  }

  async createNewPost(req, res, postData) {
    try {
      const categories = await DbCategory.findAll({
        where: { id: req.categories },
      });

      if (categories.length !== req.categories.length) {
        return res.status(400).json("Invalid category ids");
      }

      const categoryTitles = categories.map((category) => category.title);
      const titles = categoryTitles.join(", ");

      postData.categories = titles;

      const post = await DbPost.create(postData);
      await Promise.all(
        req.categories.map((categoryId) =>
          DbPostCategory.create({ postId: post.id, categoryId })
        )
      );

      res.json("Success");
    } catch (error) {
      console.error(error);
      res.status(500).json("Internal Server Error");
    }
  }

  async updatePost(req, res, updatedPostData, postId) {
    try {
      const categories = await DbCategory.findAll({
        where: { id: req.categories },
      });

      if (categories.length !== req.categories.length) {
        return res.status(400).json("Invalid category ids");
      }

      const categoryTitles = categories.map((category) => category.title);
      const titles = categoryTitles.join(", ");

      updatedPostData.categories = titles;

      const updatedPost = await DbPost.update(updatedPostData, {
        where: { id: postId },
      });

      if (updatedPost) {
        const post = await DbPost.findByPk(postId);

        if (post) {
          await post.setCategories(req.categories);

          res.json("Success");
        } else {
          res.status(404).json("Post not found");
        }
      } else {
        res.status(404).json("Post not found");
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async deletePost(req, res, postId) {
    try {
      const post = await DbPost.findByPk(postId);

      if (post) {
        await post.setCategories([]);
        await post.destroy();

        res.json("Success");
      } else {
        res.status(404).json("Post not found");
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

export default Post;
