import db from "../db.js";
import { DataTypes } from "sequelize";
import DbUser from "./user.js";

const DbPost = db.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    authorLogin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publishDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categories: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "posts",
    timestamps: false,
  }
);

DbPost.belongsTo(DbUser, { foreignKey: "authorId" });

DbPost.sync().then(() => {
  console.log("The posts was sync");
});

export default DbPost;
