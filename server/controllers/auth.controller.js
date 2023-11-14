import Auth from "../models/Auth.js";
import { validationResult } from "express-validator";



class AuthController {
  async reqistration(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    } else {
      Auth.register(req.body, res);
    }
  }

  async login(req, res) {
    Auth.login(req.body, res);
  }

  async logout(req, res) {
    const { refreshToken } = req.cookies;
    Auth.logout(refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).json("logout");
  }

  async refresh(req, res) {
    if (req.cookies.hasOwnProperty("refreshToken")) {
      const { refreshToken } = req.cookies;
      Auth.refresh(refreshToken, res);
    } else res.status(400).json("Not found refreshToken");
  }

  async sendResetPassword(req, res) {
    await Auth.sendResetPassword(req.body.email, res);
  }

  async resetPassword(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    } else {
      await Auth.resetPassword(req.params.confirmtoken, req.body.password, res);
    }
  }
}

export default new AuthController();
