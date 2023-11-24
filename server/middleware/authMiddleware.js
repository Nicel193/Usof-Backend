import userAuthService from "../services/userAuthService.js";

export default function (req, res, next) {
  try {
    const isAuthUser = userAuthService.tryGetAuth(req);

    if (!isAuthUser) {
      res.status(401).json("UnauthorizedError");
      return;
    }

    next();
  } catch (e) {
    res.status(401).json("UnauthorizedError");
    return;
  }
}
