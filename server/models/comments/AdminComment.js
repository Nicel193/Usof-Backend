import Comment from "./Comment.js";

class AdminComment extends Comment {
  async updateAdminComment(id, res, content) {
    await super.changeComment(id, res, {
        isActive: content.isActive
      });
  }
}

export default new AdminComment();