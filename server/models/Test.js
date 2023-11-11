import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("mysql://root:password@localhost:3306/usof");

const Test = sequelize.define(
  "Test",
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
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    roles: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isActivated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "tests", // имя таблицы
    timestamps: false, // отключение автогенерации полей createdAt и updatedAt
  }
);

Test.sync()
  .then(() => {
    console.log("Таблица успешно создана");
  })
  .catch((error) => {
    console.error("Ошибка при создании таблицы:", error);
  });

export default Test;
