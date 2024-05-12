import { newRawMaterialSupplierSchemaRequest } from "../dto/request/raw-material-supplier-request.js";
import { validate } from "../utils/validation-util.js";
import db from "../configs/database.js";
import unitService from "./unit-service.js";
import { ResponseError } from "../errors/response-error.js";
import { Op } from "sequelize";
import { v4 as uuid } from "uuid";

const create = async (request) => {
  let transaction;

  try {
    transaction = await db.transaction();

    const rawMaterialSupplierRequest = validate(
      newRawMaterialSupplierSchemaRequest,
      request
    );

    const unit = await unitService.getByUnitName(
      rawMaterialSupplierRequest.unit.toUpperCase(),
      transaction
    );

    if (!unit) {
      throw new ResponseError(404, "Unit not found");
    }

    const createdRawMaterialSupplier =
      await db.models.rawMaterialSuppliers.create(
        {
          id: uuid().toString(),
          material_name: rawMaterialSupplierRequest.materialName,
          total_quantity: rawMaterialSupplierRequest.totalQuantity,
          unit_price: rawMaterialSupplierRequest.unitPrice,
          unit_id: unit.id,
          created_at: new Date(),
        },
        { transaction }
      );

    console.log(createdRawMaterialSupplier);

    await transaction.commit();

    return toRawMaterialSupplierResponse(createdRawMaterialSupplier, unit);
  } catch (error) {
    if (transaction) {
      transaction.rollback();
    }

    throw new ResponseError(error.status, error.message);
  }
};

const getById = async (id) => {
  let transaction;

  try {
    transaction = await db.transaction();

    // get raw material supplier by id
    const rawMaterialSupplier = await db.models.rawMaterialSuppliers.findOne({
      where: { id: id },
      transaction,
    });

    if (!rawMaterialSupplier) {
      throw new ResponseError(404, "Raw Material Supplier not found");
    }

    // get unit by id
    const unit = await unitService.getById(
      rawMaterialSupplier.unit_id,
      transaction
    );

    console.log(rawMaterialSupplier);

    const response = toRawMaterialSupplierResponse(rawMaterialSupplier, unit);

    return {
      data: response,
    };
  } catch (error) {
    if (transaction) {
      transaction.rollback();
    }

    throw new ResponseError(error.status, error.message);
  }
};

const getAll = async (request, page, limit) => {
  const { materialName, unitPrice, totalQuantity, unit } = request;

  const offset = page * limit;

  const totalRows = await db.models.rawMaterialSuppliers.count({
    where: {
      [Op.or]: [
        {
          material_name: {
            [Op.like]: `%${materialName}%`,
          },
        },
        {
          unit_price: {
            [Op.gt]: unitPrice,
          },
        },
        {
          total_quantity: {
            [Op.gt]: totalQuantity,
          },
        },
      ],
    },
    include: {
      model: db.models.units,
      as: "unit",
      where: {
        [Op.or]: [{ unit: { [Op.like]: `${unit.toUpperCase()}` } }],
      },
    },
  });

  const totalPage = Math.ceil(totalRows / limit);

  const rawMaterialSuppliers = await db.models.rawMaterialSuppliers.findAll({
    where: {
      [Op.or]: [
        {
          material_name: {
            [Op.like]: `%${materialName}%`,
          },
        },
        {
          unit_price: {
            [Op.gt]: unitPrice,
          },
        },
        {
          total_quantity: {
            [Op.gt]: totalQuantity,
          },
        },
      ],
    },
    include: {
      model: db.models.units,
      as: "unit",
      where: {
        [Op.or]: [{ unit: { [Op.like]: `${unit.toUpperCase()}` } }],
      },
    },
    offset: offset,
    limit: limit,
    order: [["material_name", "ASC"]],
  });

  const responses = rawMaterialSuppliers.map((rawMaterialSupplier) =>
    toRawMaterialSupplierResponse(rawMaterialSupplier, rawMaterialSupplier.unit)
  );

  return {
    data: responses,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  };
};

const toRawMaterialSupplierResponse = (rawMaterialSupplier, unit) => {
  return {
    rawMaterialSupplierId: rawMaterialSupplier.id,
    materialName: rawMaterialSupplier.material_name,
    totalQuantity: rawMaterialSupplier.total_quantity,
    unitPrice: rawMaterialSupplier.unit_price,
    unit: unit.unit,
    totalPrice:
      rawMaterialSupplier.total_quantity * rawMaterialSupplier.unit_price,
    created_at: rawMaterialSupplier.created_at,
    updated_at:
      rawMaterialSupplier.updated_at !== null
        ? rawMaterialSupplier.updated_at
        : null,
  };
};

export default { create, getById, getAll };
