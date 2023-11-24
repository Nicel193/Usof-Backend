import TokenService from "./tokenService.js";

class UserAuth {
  tryGetAuth(req) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return false;
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return false;
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return false;
    }

    req.user = userData;

    return true;
  }
}

export default new UserAuth();
