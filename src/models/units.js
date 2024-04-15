import { Sequelize } from "sequelize";

const unit = {
  id: {
    type: Sequelize.STRING(100),
    primaryKey: true,
  },
  name: {
    type: Sequelize.ENUM(
      "KILOGRAM",
      "GRAM",
      "LITRE",
      "MILLILITRE",
      "CUP",
      "TABLESPOON",
      "TEASPOON",
      "PIECE",
      "PACK",
      "BOX",
      "GALONE",
      "BOTTLE"
    ),
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

export default unit;
