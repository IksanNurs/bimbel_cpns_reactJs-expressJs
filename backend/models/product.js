"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Relasi dengan User (created_by, updated_by)
      Product.belongsTo(models.User, {
        foreignKey: "created_by",
        as: "createdByUser", // Mengubah alias agar tidak bentrok
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });

      Product.belongsTo(models.User, {
        foreignKey: "updated_by",
        as: "updatedByUser", // Mengubah alias agar tidak bentrok
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });

      Product.hasMany(models.Order, {
        foreignKey: "product_id", // This is assuming the foreign key in the orders table is product_id
        as: "orders", // Alias for the related orders
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.INTEGER,
        defaultValue: 1, // Default value for active status
        allowNull: true,
        field: "is_active",
      },
      created_at: {
        type: DataTypes.INTEGER, // Unix timestamp (in seconds)
        allowNull: false,
        defaultValue: sequelize.literal("EXTRACT(EPOCH FROM NOW())"),
        field: "created_at", // Mapped to the snake_case column name
      },
      updated_at: {
        type: DataTypes.INTEGER, // Unix timestamp (in seconds)
        allowNull: false,
        defaultValue: sequelize.literal("EXTRACT(EPOCH FROM NOW())"),
        field: "updated_at", // Mapped to the snake_case column name
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Users", // Tabel referensi
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        field: "created_by", // Mapped to the snake_case column name
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Users", // Tabel referensi
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        field: "updated_by", // Mapped to the snake_case column name
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "Products", // Nama tabel dalam database
      timestamps: false, // Karena kita menggunakan Unix timestamp secara manual
    }
  );

  return Product;
};
