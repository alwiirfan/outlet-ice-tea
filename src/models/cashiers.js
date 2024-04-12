import { Sequelize } from "sequelize";

const Cashier = {
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
  street: {
    type: Sequelize.STRING(150),
  },
  city: {
    type: Sequelize.STRING(50),
  },
  province: {
    type: Sequelize.STRING(50),
  },
  country: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  postal_code: {
    type: Sequelize.STRING(10),
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

export default Cashier;
