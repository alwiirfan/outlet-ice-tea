import { Sequelize } from "sequelize";

const Admin = {
  id: {
    type: Sequelize.STRING(100),
    primaryKey: true,
  },
  full_name: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  call_name: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  phone_number: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true,
  },
  pin: {
    type: Sequelize.STRING(6),
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

export default Admin;
