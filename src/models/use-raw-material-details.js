import { Sequelize } from "sequelize";

const useRawMaterialDetail = {
  id: {
    type: Sequelize.STRING(100),
    primaryKey: true,
  },
  name: {
    type: Sequelize.DATE,
    allowNull: false,
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

export default useRawMaterialDetail;
