import DatabaseConnection from "../db/dbconnection.js"
import TokenService from "../services/tokenService.js";
import bcrypt from "bcrypt"

const saltRounds = 5;

class Auth {
    async register(user, res) {
        let sqlUser = {
            login: user.login,
            pass: bcrypt.hashSync(user.pass, bcrypt.genSaltSync(saltRounds)),
            fullName: user.fullName,
            profilePicture: 'user.png',
            rating: 0,
            email: user.email,
            isActivated: true
        };

        const sql = 'INSERT INTO users SET ?';

        DatabaseConnection.query(sql, sqlUser, async function (err, result, rows) {
            if (err) {
               res.status(400).json(err);
               return;  
            }

            let tokens = TokenService.generateTokens(result.insertId, user.email, user.login);
            TokenService.saveTocken(user.login, tokens.refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            
            res.json({accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                    login: user.login,
                    email: user.email,
                    id: result.insertId,
                    roles: 'user'
                });
        });
    }

    login(user, res) {
        const sql = 'SELECT * FROM users WHERE login=?';

        DatabaseConnection.query(sql, user.login ,function(err, rows) {
            if (err) {
                res.status(400).json('Unknown login error');
                return;
            }
            if (rows.length == 0) {
                res.status(400).json('User with this login is not found!');
                return;
            }

            let userByLogin = rows[0];
            let isPassword = bcrypt.compareSync(user.pass, userByLogin.pass);
            if (isPassword) {
                let tokens = TokenService.generateTokens(userByLogin.id, userByLogin.email, userByLogin.login);
                TokenService.saveTocken(userByLogin.login, tokens.refreshToken);
                res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
                
                res.json({accessToken: tokens.accessToken,
                        refreshToken: tokens.refreshToken,
                        login: userByLogin.login,
                        email: userByLogin.email,
                        id: userByLogin.id,
                        roles: userByLogin.roles,
                        isActivated: userByLogin.isActivated
                });
            }
            else {
                res.status(400).json('Incorrect password');
                return
            }

        })
    }

    logout(refreshToken) {
        TokenService.removeToken(refreshToken);
    }

    resetPass(email, res) {
        const newPassword = shortid.generate();
        let new_has = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(saltRounds));
        const sql = `UPDATE users SET pass="${new_has}" WHERE email="${email}"`

        DatabaseConnection.query(sql, async function(err, rows) {
            if(err) {
                res.status(400).json(err);
                return;
            }
            await MailService.sendPass(email, newPassword);
            res.json('Succes');
        });
    }

    refresh(refreshToken, res) {
        if (!refreshToken) {
            res.status(401).json('UnauthorizedError');
            return;
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        if(!userData) {
            res.status(401).json('UnauthorizedError');
            return;
        }

        DatabaseConnection.query('SELECT * FROM tokens WHERE refreshTocken=?', refreshToken, function(err, rows) {
            if(err) {
                res.status(401).json('UnauthorizedError');
                return;
            }

            let tokens = TokenService.generateTokens(userData.userId, userData.email, userData.login);
            TokenService.saveTocken(userData.login, tokens.refreshToken);

            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json({accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                email: userData.email,
                id: userData.id,
                login: userData.login,
            });
        })
    }
}

export default new Auth();