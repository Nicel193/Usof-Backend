import DatabaseConnection from "../db/dbconnection.js";
const postsPerPage = 10;

class Post {
  //TODO: Add categories
  getPosts(req, res, page) {
    const offset = (page - 1) * postsPerPage;
    const sql = `SELECT * FROM posts WHERE isActive=true LIMIT ${postsPerPage} OFFSET ${offset}`;

    DatabaseConnection.query(sql, function (err, rows) {
        if (err) {
           res.status(400).json(err);
           return;
        }
        
        res.json(rows);
    });
  }

  getPostById(req, res, postId){
    const sql = 'SELECT * FROM posts WHERE id=?';

    DatabaseConnection.query(sql, postId, function(err, rows) {
        if(err) {
            res.status(400).json(err);
            return;
        }
        if (rows.length == 0) {
            res.status(400).json('Post not found');
            return;
        }
        res.json(rows[0]);
    })
  }

  getPostCategories(req, res, postId){
    const sql = 'SELECT * FROM posts WHERE id=?';

    DatabaseConnection.query(sql, postId, function(err, rows) {
      if(err) {
          res.status(400).json(err);
          return;
      }
      if (rows.length == 0) {
          res.status(400).json('Post not found');
          return;
      }

      res.json(rows[0].categories);
  })
  }

  createNewPost(req, res, authorLogin, authorId) {
    const sqlPost = {
      authorId: authorId,
      authorLogin: authorLogin,
      title: req.title,
      publishDate: new Date().toISOString().slice(0, 19).replace("T", " "),
      isActive: true,
      content: req.content,
      categories: req.categories,
    };

    const sql = "INSERT INTO posts SET ?";
    DatabaseConnection.query(sql, sqlPost, function (err, result, rows) {
      if (err) {
        res.status(400).json(err);
        return;
      }
      res.json("Success");
    });
  }

  updatePost(req, res, postId) {
    const sqlPost = {
      title: req.title,
      publishDate: new Date().toISOString().slice(0, 19).replace("T", " "),
      content: req.content,
      categories: req.categories,
    };

    const sql = `UPDATE posts SET ? WHERE id="${postId}"`;
    DatabaseConnection.query(sql, sqlPost, function (err, result, rows) {
      if (err) {
        res.status(400).json(err);
        return;
      }
      res.json("Success");
    });
  }

  deletePost(req, res, postId) {
    const sql = `DELETE FROM posts WHERE id="${postId}"`;

    DatabaseConnection.query(sql, function (err, rows) {
      if (err) {
        res.status(200).json(err);
        return;
      }
      console.log(rows);
      if (rows.affectedRows == 0) {
        res.status(200).json("Post already delete");
        return;
      }
      res.json("Success");
    });
  }
}

export default new Post();
