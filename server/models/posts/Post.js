import DbCategory from "../../db/scheme/categories.js";
import DbPost from "../../db/scheme/post.js";
import DbPostCategory from "../../db/scheme/posts-categories.js";
import DbComments from "../../db/scheme/comments.js";

import User from "../User.js";

import { sortAndFilter } from "../../services/sortService.js";

const PostsPerPage = 10;

class Post {
  async getPosts(req, res, query, findRule) {
    const page = query.page ? Number(req.query.page) : 1;

    sortAndFilter(query, findRule);

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

  async getComments(res, postId, query) {
    try {
      const findRule = {
        where: { postId: postId },
        order: [["date", "DESC"]],
      };

      const likes = await DbComments.findAll(findRule);

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
        where: { title: req.categories },
      });

      if (categories.length !== req.categories.length) {
        return res.status(400).json("Invalid categories");
      }

      postData.categories = req.categories.join(", ");

      const post = await DbPost.create(postData);
      await Promise.all(
        categories.map((category) =>
          DbPostCategory.create({ postId: post.id, categoryId: category.id })
        )
      );

      await User.updateRating(postData.authorId);

      res.json("Success");
    } catch (error) {
      console.error(error);
      res.status(500).json("Internal server error");
    }
  }

  async updatePost(req, res, updatedPostData, postId) {
    try {
      const categories = await DbCategory.findAll({
        where: { title: req.categories },
      });

      if (categories.length !== req.categories.length) {
        return res.status(400).json("Invalid category ids");
      }

      updatedPostData.categories = req.categories.join(", ");

      const updatedPost = await DbPost.update(updatedPostData, {
        where: { id: postId },
      });

      if (updatedPost) {
        const post = await DbPost.findByPk(postId);

        if (post) {
          await post.setCategories(categories.map((category) => category.id));

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
