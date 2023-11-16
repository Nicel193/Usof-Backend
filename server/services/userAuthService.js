import TokenService from "./tokenService.js";

class UserAuth {
  tryGetAuth(req) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      res.status(401).json("UnauthorizedError");
      return false;
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      res.status(401).json("UnauthorizedError");
      return false;
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      res.status(401).json("UnauthorizedError");
      return false;
    }

    req.user = userData;

    return true;
  }
}

export default new UserAuth();
