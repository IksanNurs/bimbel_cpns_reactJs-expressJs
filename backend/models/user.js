"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Menambahkan relasi jika diperlukan
      // Misalnya User hasOne Lab, atau hubungan lainnya.
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        // Renamed to snake_case
        type: DataTypes.INTEGER, // Unix timestamp (in seconds)
        allowNull: false,
        defaultValue: sequelize.literal("EXTRACT(EPOCH FROM NOW())"),
        field: "created_at", // Mapped to the snake_case column name
      },
      updated_at: {
        // Renamed to snake_case
        type: DataTypes.INTEGER, // Unix timestamp (in seconds)
        allowNull: false,
        defaultValue: sequelize.literal("EXTRACT(EPOCH FROM NOW())"),
        field: "updated_at", // Mapped to the snake_case column name
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users", // Nama tabel di database
      timestamps: false, // Karena kita menggunakan timestamp dalam format Unix manual, kita set ini ke false
    }
  );

  return User;
};
