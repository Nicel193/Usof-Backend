import userAuthService from "../services/userAuthService.js";

export default function (req, res, next) {
  try {
    userAuthService.tryGetAuth(req);

    if (!req.user) {
      res.status(401).json("UnauthorizedError");
      return;
    }

    next();
  } catch (e) {
    res.status(401).json("UnauthorizedError");
    return;
  }
}
