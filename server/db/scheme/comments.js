import db from "../db.js";
import { DataTypes } from "sequelize";

const DbComments = db.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    loginOwner: {
      type: DataTypes.STRING(31),
      allowNull: false,
    },
    idOwner: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(3000),
      allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "comments",
    timestamps: false,
  }
);

DbComments.sync()
  .then(() => {
    console.log("The comments was sync");
  })
  .catch((err) => {
    console.error("Error creating table:", err);
  });

  
export default DbComments;