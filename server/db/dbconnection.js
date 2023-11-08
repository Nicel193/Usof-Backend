import mysql from "mysql2";
import fs from "fs";
import path from "path";
import { __dirname } from "path";
import config from "./config.json" assert { type: "json" };

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  multipleStatements: true,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");

  const sqlScript = fs.readFileSync(path.join(__dirname, "db.sql"), "utf8");
  connection.query(sqlScript, (error) => {
    if (error) throw error;
    console.log("Database setup completed.");
  });
});

export default connection;
