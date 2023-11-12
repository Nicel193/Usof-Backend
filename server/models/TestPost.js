import DbPost from "../db/scheme/post.js";
import DbPostCategory from "../db/scheme/posts-categories.js";

const postsPerPage = 10;

class Post {
  //TODO: Add categories
  getPosts(req, res, page) {

  }

  getPostById(req, res, postId){

  }

  getPostCategories(req, res, postId){

  }

  async createNewPost(req, res, authorLogin, authorId) {
    try {
        const postData = {
          authorId: authorId,
          authorLogin: authorLogin,
          title: req.title,
          publishDate: new Date(),
          isActive: true,
          content: req.content,
          categories: req.categories, // Предполагается, что req.categories - это массив категорий
        };
    
        const post = await DbPost.create(postData);
    
        const categoryIds = req.categories; // Предполагается, что это массив идентификаторов категорий
        if (categoryIds && categoryIds.length > 0) {
          await Promise.all(categoryIds.map(categoryId =>
            DbPostCategory.create({ postId: post.id, categoryId })
          ));
        }
    
        res.json('Success');
      } catch (error) {
        console.error(error);
        res.status(400).json(error);
      }
    }
  }

  updatePost(req, res, postId) {

  }

  deletePost(req, res, postId) {

  }
}

export default new Post();
