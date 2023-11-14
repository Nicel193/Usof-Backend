import DbToken from "../db/scheme/token.js";
import jwt from "jsonwebtoken";

const JWT_ACCESS_SECRET = "14b0e619-4697-4fad-b5be-7550d9f331e4";
const JWT_REFRESH_SECRET = "1fec183a-3df8-40df-a33b-965d46ab50c5";
const JWT_RESET_PASSWORD_SECRET = "56ec18sa-3sad8-das-ds3ad-965d4ssadasd";

class TokenService {
  generateTokens(user) {
    const payload = {
      id: user.id,
      email: user.email,
      login: user.login,
      role: user.roles
    };

    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: "3d",
    });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  generateResetToken(email) {
    const payload = {
      email: email,
    };

    const resetToken = jwt.sign(payload, JWT_RESET_PASSWORD_SECRET, {
      expiresIn: "1d",
    });

    return resetToken;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateResetPasswordToken(token) {
    try {
      const emailData = jwt.verify(token, JWT_RESET_PASSWORD_SECRET);
      return emailData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(login, refreshToken) {
    try {
      let tokenData = {
        login: login,
        refreshToken: refreshToken,
      };

      await DbToken.create(tokenData);
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        await DbToken.update(
          { refreshTocken: refreshToken },
          { where: { login: login } }
        );
      } else {
        console.error(err);
      }
    }
  }

  async removeToken(refreshToken) {
    try {
      await DbToken.destroy({
        where: { refreshToken: refreshToken },
      });
    } catch (err) {
      console.error(err);
    }
  }
}

export default new TokenService();
