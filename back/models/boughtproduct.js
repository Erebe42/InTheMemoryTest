'use strict';
module.exports = (sequelize, DataTypes) => {
  const BoughtProduct = sequelize.define('BoughtProduct', {
    date: DataTypes.DATE,
    orderId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    country: DataTypes.STRING,
    productCode: DataTypes.STRING,
    productDescription: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    unitPrice: DataTypes.FLOAT
  }, {});
  BoughtProduct.associate = function(models) {
    // associations can be defined here
  };
  return BoughtProduct;
};