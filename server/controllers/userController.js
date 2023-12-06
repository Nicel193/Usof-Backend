import User from "../models/User.js";

class UserController {
  async createUser(req, res) {
    User.createNewUser(req.body, res);
  }

  async getUsers(req, res) {
    User.getAllUsers(res);
  }

  async getUserById(req, res) {
    User.getUserById(req.params.userId, res);
  }

  async updateUser(req, res) {
    User.updateUser(req.body, req.user.id, req.params.userId, res);
  }

  async addAvatar(req, res) {
    if (!req.file || !req.user) {
      res.status(400).json("Not found");
      return;
    }

    User.addAvatar(req.user.login, req.file.filename, res);
  }

  async deleteUser(req, res) {
    User.deleteUser(req.params.userId, res);
  }
}

export default new UserController();
