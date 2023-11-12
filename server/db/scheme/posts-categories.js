import db from "../db.js";
import { DataTypes } from "sequelize";
import DbPost from "./post.js";
import DbCategory from "./categories.js";

const DbPostCategory = db.define(
  "PostCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "posts-categories",
    timestamps: false,
  }
);

DbPost.belongsToMany(DbCategory, {
  through: DbPostCategory,
  foreignKey: "postId",
});

DbCategory.belongsToMany(DbPost, {
  through: DbPostCategory,
  foreignKey: "categoryId",
});

DbPostCategory.sync().then(() => {
  console.log("The posts-categories was sync");
});

export default DbPostCategory;
