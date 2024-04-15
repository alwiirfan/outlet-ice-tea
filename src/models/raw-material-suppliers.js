import { Sequelize } from "sequelize";

const rawMaterialSupplier = {
  id: {
    type: Sequelize.STRING(100),
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(100),
    unique: true,
    allowNull: false,
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updated_at: {
    type: Sequelize.DATE,
  },
};

export default rawMaterialSupplier;
