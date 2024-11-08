'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MidtransNotification extends Model {
    static associate(models) {
      // Relasi dengan Order (order_id)
      MidtransNotification.belongsTo(models.Order, {
        foreignKey: 'order_id',
        as: 'order',  // Alias untuk relasi
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }
  }

  MidtransNotification.init({
    order_id: {  // Renamed to snake_case
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Orders',  // Tabel referensi
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    order_uuid: {  // Renamed to snake_case
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    signature_key: {  // Renamed to snake_case
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    transaction_id: {  // Renamed to snake_case
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    transaction_time: {  // Renamed to snake_case
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    transaction_status: {  // Renamed to snake_case
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    fraud_status: {  // Renamed to snake_case
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    payment_type: {  // Renamed to snake_case
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    gross_amount: {  // Renamed to snake_case
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    raw: {  // No change as it's already valid
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {  // Renamed to snake_case
      type: DataTypes.INTEGER,  // Unix timestamp (in seconds)
      allowNull: false,
      defaultValue: sequelize.literal('EXTRACT(EPOCH FROM NOW())'),
      field: 'created_at',  // Mapped to the snake_case column name
    },
    updated_at: {  // Renamed to snake_case
      type: DataTypes.INTEGER,  // Unix timestamp (in seconds)
      allowNull: false,
      defaultValue: sequelize.literal('EXTRACT(EPOCH FROM NOW())'),
      field: 'updated_at',  // Mapped to the snake_case column name
    },
  }, {
    sequelize,
    modelName: 'MidtransNotification',
    tableName: 'MidtransNotifications',  // Nama tabel dalam database (keep it as it is)
    timestamps: false,  // Karena kita menggunakan Unix timestamp secara manual
  });

  return MidtransNotification;
};
