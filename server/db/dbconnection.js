import mysql from "mysql2";
import fs from "fs";
import path from "path";
import config from "./config.json" assert { type: "json" };
import { fileURLToPath } from 'url';
import { dirname } from "path";

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

  const currentDir = dirname(fileURLToPath(import.meta.url));
  const sqlScriptPath = path.join(currentDir, 'db.sql');
  const sqlScript = fs.readFileSync(sqlScriptPath, "utf8");

  connection.query(sqlScript, (error) => {
    if (error) throw error;
    console.log("Database setup completed.");
  });
});

export default connection;
