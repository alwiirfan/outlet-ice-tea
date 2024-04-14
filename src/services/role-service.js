import { newRoleSchemaRequest } from "../dto/request/role-request.js";
import { ResponseError } from "../errors/response-error.js";
import db from "../configs/database.js";
import { validate } from "../utils/validation-util.js";
import { v4 as uuid } from "uuid";
import { Op } from "sequelize";

const create = async (request) => {
  const requestRole = validate(newRoleSchemaRequest, request);

  const existingRole = await db.models.roles.findOne({
    where: {
      role: requestRole.role.toUpperCase(),
    },
  });

  if (existingRole) {
    throw new ResponseError(409, "Role already exists");
  }

  const createdRole = await db.models.roles.create({
    id: uuid().toString(),
    role: requestRole.role.toUpperCase(),
    created_at: new Date(),
  });

  return {
    id: createdRole.id,
    role: createdRole.role.toUpperCase(),
    created_at: createdRole.created_at,
    updated_at: createdRole.updated_at !== null ? createdRole.updated_at : null,
  };
};

const getAll = async (request, page, limit) => {
  const { role } = request;

  const offset = page * limit;

  const totalRows = await db.models.roles.count({
    [Op.or]: [
      {
        role: {
          [Op.like]: `%${role}%`,
        },
      },
    ],
  });

  const totalPage = Math.ceil(totalRows / limit);

  const roles = await db.models.roles.findAll({
    where: {
      [Op.or]: [
        {
          role: {
            [Op.like]: `%${role}%`,
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    order: [["role", "ASC"]],
  });

  const responses = roles.map((role) => toRoleResponse(role));

  return {
    data: responses,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  };
};

const getByRoleName = async (roleName, transaction = null) => {
  try {
    let options = {};

    if (transaction) {
      options.transaction = transaction;
    }

    const role = await db.models.roles.findOne({
      where: {
        role: roleName.toUpperCase(),
      },
      ...options,
    });

    if (!role) {
      throw new ResponseError(404, "Role not found");
    }

    return role;
  } catch (error) {
    throw new ResponseError(error.status, error.message);
  }
};

const toRoleResponse = (role) => {
  return {
    id: role.id,
    role: role.role,
    created_at: role.created_at,
    updated_at: role.updated_at !== null ? role.updated_at : null,
  };
};

export default { create, getAll, getByRoleName };
