import { Sequelize } from "sequelize";

const rawMaterial = {
  id: {
    type: Sequelize.STRING(100),
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(100),
    unique: true,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  quantity: {
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

export default rawMaterial;
