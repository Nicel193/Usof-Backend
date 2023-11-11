import Config from "../configs.json" assert { type: "json" };
import { Sequelize, DataTypes } from "sequelize";

const path = `mysql://
${Config.database.user}:
${Config.database.password}@
${Config.database.host}:
${Config.database.port}/${Config.database.database}`;

const sequelize = new Sequelize(path);

export default sequelize;