import db from "../config/database.js";
import UserCredential from "./user-credentials.js";
import Role from "./roles.js";
import Cashier from "./cashiers.js";
import Admin from "./admins.js";
import { logger } from "../config/logger.js";

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

// One-to-One relationship between users and cashiers
userCredentials.hasOne(cashiers, {
  foreignKey: "user_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

cashiers.belongsTo(userCredentials, {
  foreignKey: "user_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// One-to-One relationship between users and admins
userCredentials.hasOne(admins, {
  foreignKey: "user_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

admins.belongsTo(userCredentials, {
  foreignKey: "user_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Sync database with models
db.sync()
  .then(() => {
    logger.info("Database synced");
    console.log(db.models);
  })
  .catch((err) => {
    logger.error(err);
  });

export default db;
