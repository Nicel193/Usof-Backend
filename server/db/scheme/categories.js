import db from "../db.js";
import { DataTypes } from "sequelize";

const DbCategory = db.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(31),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "categories",
    timestamps: false,
  }
);

DbCategory.sync()
  .then(() => {
    console.log("The categories was sync");
  })
  .catch((error) => {
    console.error("Error when creating the categories table:", error);
  });

export default DbCategory;
