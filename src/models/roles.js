import { Sequelize } from "sequelize";

const Role = {
  id: {
    type: Sequelize.STRING(100),
    primaryKey: true,
  },
  role: {
    type: Sequelize.ENUM("ADMIN", "CASHIER"),
    unique: true,
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

export default Role;
