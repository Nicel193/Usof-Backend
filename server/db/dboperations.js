import DatabaseConnection from "../db/dbconnection.js";

class DbOperations{
    defaultInsert(res, tableName, data, onComplite){
        const sql = `INSERT INTO ${tableName} SET ?`;
        DatabaseConnection.query(sql, data, function (err, result, rows) {
            if (err) {
               res.status(400).json(err);
               return;
            }

            onComplite(rows, err, result);
        });
    }

    defaultSelect(res, tableName, onComplite){
        const sql = `SELECT * FROM ${tableName}`;

        DatabaseConnection.query(sql, function (err, rows, result) {
            if (err) {
                res.status(400).json(err);
                return;
             }
 
             onComplite(rows, err, result);
        });
    }
}

export default new DbOperations();