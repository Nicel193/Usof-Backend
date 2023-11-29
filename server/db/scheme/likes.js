import db from "../db.js";
import { DataTypes } from "sequelize";

import DbPost from "./post.js";
import DbComments from "./comments.js";

//TODO:Add date
const DbLikes = db.define(
  "Like",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: DataTypes.STRING(31),
      allowNull: false,
      unique: true,
    },
    idPost: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idComment: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    likeType: {
      type: DataTypes.ENUM("like", "dislike"),
      allowNull: false,
    },
    likeGroup: {
      type: DataTypes.ENUM("post", "comment"),
      allowNull: false,
    },
  },
  {
    tableName: "likes",
    timestamps: false
  }
);

DbLikes.belongsTo(DbPost, { foreignKey: "idPost" });
DbLikes.belongsTo(DbComments, { foreignKey: "idComment" });

DbLikes.sync()
  .then(() => {
    console.log("The likes was sync");
  })
  .catch((err) => {
    console.error("Error creating table:", err);
  });

export default DbLikes;
