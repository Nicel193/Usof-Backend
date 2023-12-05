import DbUser from "../db/scheme/user.js";
import { upload } from "../services/storageService.js";
import userDto from "../services/userDto.js";



class User {
  createNewUser(user, res) {
    let sqlUser = {
      login: user.login,
      pass: user.pass,
      fullName: user.fullName,
      profilePicture: user.profilePicture,
      rating: user.rating,
      email: user.email,
    };

    try {
      const createdUser = DbUser.create(sqlUser);
      res.json("Success");
    } catch (err) {
      res.status(400).json(err.message);
    }
  }

  async getAllUsers(res) {
    try {
      const users = await DbUser.findAll();
      res.json(userDto.getDto(users));
    } catch (err) {
      res.status(400).json(err.message);
    }
  }

  async getUserById(id, res) {
    try {
      const user = await DbUser.findByPk(id);

      if (!user) {
        res.status(400).json("User not found");
        return;
      }

      res.json(userDto.getDto([user])[0]);
    } catch (err) {
      res.status(400).json(err.message);
    }
  }

  async addAvatar(login, fileName, res) {
    try {
      const [updatedRowsCount] = await DbUser.update(
        { profilePicture: fileName },
        { where: { login } }
      );

      if (updatedRowsCount === 0) {
        res.status(400).json("User not found");
        return;
      }

      res.json(fileName);
    } catch (err) {
      res.status(400).json(err.message);
    }
  }

  async updateUser(user, authId, id, res) {
    try {
      if (authId != id) {
        res.status(400).json("not available");
        return;
      }

      const [updatedRowsCount] = await DbUser.update(user, { where: { id } });
      if (updatedRowsCount === 0) {
        res.status(400).json("User not found");
        return;
      }
      res.json("Success");
    } catch (err) {
      res.status(400).json(err.message);
    }
  }

  async deleteUser(id, res) {
    try {
      const deletedRowsCount = await DbUser.destroy({ where: { id } });

      if (deletedRowsCount === 0) {
        res.status(400).json("User not found");
        return;
      }

      res.json("Success");
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
}

export default new User();
