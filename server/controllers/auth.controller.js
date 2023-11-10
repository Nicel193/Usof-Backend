import Auth from "../models/Auth.js";
import { validationResult } from "express-validator";

class AuthController {
  reqistration(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    } else {
      Auth.register(req.body, res);
    }
}

  login(req, res) {
    Auth.login(req.body, res);
  }

  logout(req, res) {
    const { refreshToken } = req.cookies;
    Auth.logout(refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).json("logout");
  }

  refresh(req, res) {
    if (req.cookies.hasOwnProperty('refreshToken')) {
      const { refreshToken } = req.cookies;
      Auth.refresh(refreshToken, res);
    } else res.status(400).json("Not found refreshToken");
  }
  // reset(req, res) {
  //     Auth.resetPass(req.body.email, res);
  // }
}

export default new AuthController();
