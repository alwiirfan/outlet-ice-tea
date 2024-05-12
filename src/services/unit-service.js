import { newUnitSchemaRequest } from "../dto/request/unit-request.js";
import { validate } from "../utils/validation-util.js";
import db from "../configs/database.js";
import { ResponseError } from "../errors/response-error.js";
import { Op } from "sequelize";
import { v4 as uuid } from "uuid";

const create = async (request) => {
  const unitRequest = validate(newUnitSchemaRequest, request);

  const existingUnit = await db.models.units.findOne({
    where: {
      unit: unitRequest.unit.toUpperCase(),
    },
  });

  if (existingUnit) {
    throw new ResponseError(409, "Unit already exists");
  }

  const createdUnit = await db.models.units.create({
    id: uuid().toString(),
    unit: unitRequest.unit.toUpperCase(),
    created_at: new Date(),
  });

  return {
    id: createdUnit.id,
    unit: createdUnit.unit,
    created_at: createdUnit.created_at,
    updated_at: createdUnit.updated_at !== null ? createdUnit.updated_at : null,
  };
};

const getById = async (id, transaction = null) => {
  try {
    let options = {};

    if (transaction) {
      options.transaction = transaction;
    }

    const unit = await db.models.units.findOne({
      where: {
        id: id,
      },
      ...options,
    });

    if (!unit) {
      throw new ResponseError(404, "Unit not found");
    }

    return unit;
  } catch (error) {
    throw new ResponseError(error.status, error.message);
  }
};

const getByUnitName = async (unitName, transaction = null) => {
  try {
    let options = {};

    if (transaction) {
      options.transaction = transaction;
    }

    const unit = await db.models.units.findOne({
      where: {
        unit: unitName,
      },
      ...options,
    });

    if (!unit) {
      throw new ResponseError(404, "Unit not found");
    }

    return unit;
  } catch (error) {
    throw new ResponseError(error.status, error.message);
  }
};

const getAll = async (request, page, limit) => {
  const { unitName } = request;

  const offset = page * limit;

  const totalRows = await db.models.units.count({
    where: {
      unit: {
        [Op.like]: `${unitName.toUpperCase()}%`,
      },
    },
  });

  console.log(totalRows);

  const totalPage = Math.ceil(totalRows / limit);

  const units = await db.models.units.findAll({
    where: {
      unit: {
        [Op.like]: `${unitName.toUpperCase()}%`,
      },
    },
    offset: offset,
    limit: limit,
    order: [["unit", "ASC"]],
  });

  console.log(units);

  const unitResponses = units.map((unit) => toUnitResponse(unit));

  console.log(unitResponses);

  return {
    data: unitResponses,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  };
};

const toUnitResponse = (unit) => {
  return {
    id: unit.id,
    unit: unit.unit,
    created_at: unit.created_at,
    updated_at: unit.updated_at !== null ? unit.updated_at : null,
  };
};

export default {
  create,
  getById,
  getByUnitName,
  getAll,
};
