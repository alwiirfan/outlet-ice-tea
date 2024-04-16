import { Sequelize } from "sequelize";

const rawMaterialSupplier = {
  id: {
    type: Sequelize.STRING(100),
    primaryKey: true,
  },
  material_name: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  total_quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  unit_price: {
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
