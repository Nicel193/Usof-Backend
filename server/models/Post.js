import DbCategory from "../db/scheme/categories.js";
import DbPost from "../db/scheme/post.js";
import DbPostCategory from "../db/scheme/posts-categories.js";
import DbComments from "../db/scheme/comments.js";

import PostLike from "./likes/PostLike.js";

const PostsPerPage = 10;

class Post {
  async getPosts(req, res, page) {
    try {
      const offset = (page - 1) * PostsPerPage;

      const posts = await DbPost.findAll({
        where: { isActive: true },
        limit: PostsPerPage,
        offset: offset,
      });

      res.json(posts);
    } catch (error) {
      res.status(400).json(error);
    }
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

  async getLikes(res, postId) {
    await PostLike.getLikes(res, postId);
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
        idOwner: user.userId,
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

  async createNewLike(user, res, postId) {
    await PostLike.createLike(res, user, postId);
  }

  async createNewPost(req, res, authorLogin, authorId) {
    try {
      const categories = await DbCategory.findAll({
        where: { id: req.categories },
      });

      if (categories.length !== req.categories.length) {
        return res.status(400).json("Invalid category ids");
      }

      const categoryTitles = categories.map((category) => category.title);
      const titles = categoryTitles.join(", ");

      const post = await DbPost.create({
        authorId: authorId,
        authorLogin: authorLogin,
        title: req.title,
        publishDate: new Date().toISOString().slice(0, 19).replace("T", " "),
        isActive: true,
        content: req.content,
        categories: titles,
      });

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

  async updatePost(req, res, postId) {
    try {
      const categories = await DbCategory.findAll({
        where: { id: req.categories },
      });

      if (categories.length !== req.categories.length) {
        return res.status(400).json("Invalid category ids");
      }

      const categoryTitles = categories.map((category) => category.title);
      const titles = categoryTitles.join(", ");

      const updatedPostData = {
        title: req.title,
        publishDate: new Date().toISOString().slice(0, 19).replace("T", " "),
        content: req.content,
        categories: titles,
      };

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
        // Удаляем все связи категорий
        await post.setCategories([]);

        // Удаляем сам пост
        await post.destroy();

        res.json("Success");
      } else {
        res.status(404).json("Post not found");
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async deleteLike(user, res) {
    await PostLike.destroy(res, user);
  }
}

export default new Post();
