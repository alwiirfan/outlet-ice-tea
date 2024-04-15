import { Sequelize } from "sequelize";

const useRawMaterial = {
  id: {
    type: Sequelize.STRING(100),
    primaryKey: true,
  },
  useDate: {
    type: Sequelize.DATE,
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

export default useRawMaterial;
