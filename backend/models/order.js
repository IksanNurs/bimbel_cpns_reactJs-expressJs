"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Relasi dengan User (user_id, created_by, updated_by)
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user", // Alias untuk relasi
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      // Ubah alias asosiasi untuk menghindari bentrok dengan nama kolom
      Order.belongsTo(models.User, {
        foreignKey: "created_by",
        as: "created_by_user", // Ubah alias untuk menghindari bentrok
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });

      Order.belongsTo(models.User, {
        foreignKey: "updated_by",
        as: "updated_by_user", // Ubah alias untuk menghindari bentrok
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });

      Order.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product", // Alias untuk relasi
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }
  }

  Order.init(
    {
      uuid: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Tabel referensi
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "user_id",
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Products", // Tabel referensi
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        field: "product_id",
      },
      transaction_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "transaction_id",
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cancelled_at: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "cancelled_at",
      },
      is_active: {
        type: DataTypes.INTEGER,
        defaultValue: 1, // Default value for active status
        allowNull: true,
        field: "is_active",
      },
      expired_at: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      checked_out_at: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      midtrans_payment_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      midtrans_payment_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      paid_at: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      modelName: "Order",
      tableName: "Orders", // Nama tabel dalam database
      timestamps: false, // Karena kita menggunakan Unix timestamp secara manual
    }
  );

  return Order;
};
