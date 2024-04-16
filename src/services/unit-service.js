import { newUnitSchemaRequest } from "../dto/request/unit-request.js";
import { validate } from "../utils/validation-util.js";
import db from "../configs/database.js";
import { ResponseError } from "../errors/response-error.js";
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

export default {
  create,
  getByUnitName,
};
