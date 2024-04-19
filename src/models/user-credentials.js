import { Sequelize } from "sequelize";

const UserCredential = {
  id: {
    type: Sequelize.STRING(100),
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING(100),
    unique: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  activated: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  refresh_token: {
    type: Sequelize.TEXT,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updated_at: {
    type: Sequelize.DATE,
  },
};

export default UserCredential;
