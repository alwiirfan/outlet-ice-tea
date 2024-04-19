import db from "../configs/database.js";
import UserCredential from "./user-credentials.js";
import Role from "./roles.js";
import Cashier from "./cashiers.js";
import Admin from "./admins.js";
import { logger } from "../configs/logger.js";
import rawMaterialSupplier from "./raw-material-suppliers.js";
import rawMaterial from "./raw-materials.js";
import useRawMaterial from "./use-raw-materials.js";
import useRawMaterialDetail from "./use-raw-material-details.js";
import unit from "./units.js";

const userCredentials = db.define("userCredentials", UserCredential, {
  tableName: "user_credentials",
  timestamps: false,
  underscored: true,
});

const roles = db.define("roles", Role, {
  tableName: "roles",
  timestamps: false,
  underscored: true,
});

const cashiers = db.define("cashiers", Cashier, {
  tableName: "cashiers",
  timestamps: false,
  underscored: true,
});

const admins = db.define("admins", Admin, {
  tableName: "admins",
  timestamps: false,
  underscored: true,
});

const rawMaterialSuppliers = db.define(
  "rawMaterialSuppliers",
  rawMaterialSupplier,
  {
    tableName: "raw_material_suppliers",
    timestamps: false,
    underscored: true,
  }
);

const rawMaterials = db.define("rawMaterials", rawMaterial, {
  tableName: "raw_materials",
  timestamps: false,
  underscored: true,
});

const useRawMaterials = db.define("useRawMaterials", useRawMaterial, {
  tableName: "use_raw_materials",
  timestamps: false,
  underscored: true,
});

const useRawMaterialDetails = db.define(
  "useRawMaterialDetails",
  useRawMaterialDetail,
  {
    tableName: "use_raw_material_details",
    timestamps: false,
    underscored: true,
  }
);

const units = db.define("units", unit, {
  tableName: "units",
  timestamps: false,
  underscored: true,
});

// One-to-Many relationship between raw materila suppliers and units
units.hasMany(rawMaterialSuppliers, {
  foreignKey: "unit_id",
  foreignKeyConstraint: true,
  as: "rawMaterialSuppliers",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

rawMaterialSuppliers.belongsTo(units, {
  foreignKey: "unit_id",
  foreignKeyConstraint: true,
  as: "unit",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// One-to-Many relationship between raw materials and units
units.hasMany(rawMaterials, {
  foreignKey: "unit_id",
  foreignKeyConstraint: true,
  as: "rawMaterials",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

rawMaterials.belongsTo(units, {
  foreignKey: "unit_id",
  foreignKeyConstraint: true,
  as: "unit",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// One-to-Many relationship between use raw materials and raw material details
useRawMaterials.hasMany(useRawMaterialDetails, {
  foreignKey: "use_raw_material_id",
  as: "useRawMaterialDetails",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

useRawMaterialDetails.belongsTo(useRawMaterials, {
  foreignKey: "use_raw_material_id",
  as: "useRawMaterial",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// One-to-Many relationship between raw materials and use raw material details
rawMaterials.hasMany(useRawMaterialDetails, {
  foreignKey: "raw_material_id",
  as: "useRawMaterialDetails",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

useRawMaterialDetails.belongsTo(rawMaterials, {
  foreignKey: "raw_material_id",
  as: "rawMaterial",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Many-to-Many relationship between users and roles
userCredentials.belongsToMany(roles, {
  through: {
    model: "user_roles",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  as: "userRoles",
  foreignKey: "user_id",
  otherKey: "role_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

roles.belongsToMany(userCredentials, {
  through: {
    model: "user_roles",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  as: "roleUsers",
  foreignKey: "role_id",
  otherKey: "user_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// One-to-One relationship between users and cashiers ( user_id in cashiers table )
userCredentials.hasOne(cashiers, {
  foreignKey: "user_id",
  as: "cashier",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

cashiers.belongsTo(userCredentials, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// One-to-One relationship between users and admins ( user_id in admins table )
userCredentials.hasOne(admins, {
  foreignKey: "user_id",
  as: "admin",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

admins.belongsTo(userCredentials, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Sync database with models
db.sync({ force: true })
  .then(() => {
    logger.info("Database synced");
    console.log(db.models);
  })
  .catch((err) => {
    logger.error(err);
  });

// Connect database
export const connectDatabase = async () => {
  await db
    .authenticate()
    .then(() => {
      logger.info("Connection has been established successfully.");
    })
    .catch((err) => {
      logger.error("Unable to connect to the database:", err);
    });
};

export default db;
