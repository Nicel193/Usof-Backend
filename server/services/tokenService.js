import DatabaseConnection from "../db/dbconnection.js"
import jwt from "jsonwebtoken"

const JWT_ACCESS_SECRET = '14b0e619-4697-4fad-b5be-7550d9f331e4';
const JWT_REFRESH_SECRET = '1fec183a-3df8-40df-a33b-965d46ab50c5';

class TokenService {
    generateTokens(userId, email, login) {
        const payload = {
            "userId": userId,
            "email": email,
            "login": login
        }

        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: '3h'})
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
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

    saveTocken(login, refreshToken) {
        const tokenSql = 'INSERT INTO tokens SET ?';

        let tokenData = {
            login: login, 
            refreshTocken: refreshToken
        }

        DatabaseConnection.query(tokenSql, tokenData, function (err, rows) {
            if(err && err.errno == 1062) {
                mysql.query(`UPDATE tokens SET refreshTocken="${refreshToken}" WHERE login="${login}"`, function(err, rows) {
                    if(err) {
                        console.log(err);
                    }
                });
            }
        });
    }

    removeToken(refreshToken) {
        const sql = `DELETE FROM tokens WHERE refreshTocken="${refreshToken}"`;

        DatabaseConnection.query(sql, function(err, rows) {
            if(err) {
                console.log(err);
            }
        });
    }
}

export default new TokenService();