
class DatabaseOperations{
    constructor(connection)
    {
        this.connection = connection; 
    }

    isUnique(table, column, value) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${table} WHERE ${column} = ?`;
            this.connection.query(query, value, (error, results) => {
                if (error) reject(error);
                
                resolve(results.length === 0);
            });
        });
    }
    
    find(table, column, value) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${table} WHERE ${column} = ?`;
            this.connection.query(query, value, (error, results) => {
                if (error) reject(error);
                resolve(results[0]);
            });
        });
    }
    
    save(table, data) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO ${table} SET ?`;
            this.connection.query(query, data, (error) => {
                if (error) reject(error);
                resolve();
            });
        });
    }
}

export default new DatabaseConnection();