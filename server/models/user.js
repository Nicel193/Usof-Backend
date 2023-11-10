import DatabaseConnection from "../db/dbconnection.js"
import userDto from "../userDto.js";

class User {
    createNewUser(user, res) {
        let sqlUser = {
            login: user.login,
            pass: user.pass,
            fullName: user.fullName,
            profilePicture: user.profilePicture,
            rating: user.rating,
            email: user.email
        };

        const sql = 'INSERT INTO users SET ?';
        DatabaseConnection.query(sql, sqlUser, function (err, result ,rows) {
            if (err) {
               res.status(400).json(err);
               return;
            }
            res.json("Success");
        });
    }

    getAllUsers(res) {
        const sql = 'SELECT * FROM users'
        DatabaseConnection.query(sql, function (err, rows) {
            if (err) {
               res.status(400).json(err);
               return;
            }
            
            res.json(userDto.getDto(rows));
        });
    }

    getUserById(id, res) {
        const sql = 'SELECT * FROM users WHERE id=?';

        DatabaseConnection.query(sql, id, function(err, rows) {
            if(err) {
                res.status(400).json(err);
                return;
            }
            if (rows.length == 0) {
                res.status(400).json('User not found');
                return;
            }
            res.json(userDto.getDto(rows)[0]);
        })
    }

    addAvatar(login, path, res) {
        const sql = `UPDATE users SET profilePicture="${path}" WHERE login="${login}"`
        DatabaseConnection.query(sql, function (err, result ,rows) {
            if (err) {
               res.status(400).json(err);
               return;
            }
            res.json(path);
        });
    }

    updateUser(user, authId, id, res) {
        const sql = `UPDATE users SET ? WHERE id="${id}"`;

        if (authId != id) {
            res.status(400).json('not avalible');
            return;
        }

        DatabaseConnection.query(sql, user, function (err, result ,rows) {
            if (err) {
               res.status(400).json(err);
               return;
            }
            res.json("Success");
        });
    }

    deleteUser(id, res) {
        const sql = `DELETE FROM users WHERE id="${id}"`;

        DatabaseConnection.query(sql, function(err, rows) {
            if(err) {
                res.status(200).json(err);
                return;
            }
            console.log(rows);
            if(rows.affectedRows == 0) {
                res.status(200).json('User already delete');
                return;
            }
            res.json('Success');
        });
        
    }
}

export default new User();