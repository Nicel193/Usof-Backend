import db from "../db.js";
import { DataTypes } from "sequelize";
import DbUser from "./user.js";

const DbToken = db.define(
  "Token",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tokens",
    timestamps: false
  }
);

// Token.belongsTo(DbUser, { foreignKey: 'userId', targetKey: 'id' });

DbToken.sync()
  .then(() => {
    console.log("The tokens was sync");
  })
  .catch((error) => {
    console.error("Error when creating the tokens table:", error);
  });

export default DbToken;
