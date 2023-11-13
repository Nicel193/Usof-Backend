import DbComments from "../db/scheme/comments.js";

class Comment {
  async getCommentById(id, res) {
    try {
      const comment = await DbComments.findByPk(id);
      if (!comment) {
        res.status(404).json("Not found");
        return;
      }
      res.json(comment);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  async changeComment(id, comment, res) {
    try {
      const existingComment = await DbComments.findByPk(id);
      if (!existingComment) {
        res.status(404).json('Not found');
        return;
      }
  
      const updateFields = {
        content: comment.content,
        date: new Date()
      };
  
      await existingComment.update(updateFields);
  
      res.json('Success');
    } catch (err) {
      res.status(400).json(err);
    }
  }

  async deleteComment(id, res) {
    try {
      const existingComment = await DbComments.findByPk(id);
      if (!existingComment) {
        res.status(404).json('Not found');
        return;
      }
  
      await existingComment.destroy();
  
      res.json('Success');
    } catch (err) {
      res.status(400).json(err);
    }
  }
}

export default new Comment();
