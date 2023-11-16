import Comment from "./Comment.js";

class UserComment extends Comment {
  async updateUserComment(id, res, content) {
    await super.changeComment(id, res, {
        content: content.content,
        date: new Date()
      });
  }
}

export default new UserComment();