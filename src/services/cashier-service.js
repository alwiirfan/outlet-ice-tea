import { validate } from "../utils/validation-util.js";
import { updateCashierSchemaRequest } from "../dto/request/cashier-request.js";
import { ResponseError } from "../errors/response-error.js";
import db from "../configs/database.js";
import { Op } from "sequelize";

const create = async (request, transaction = null) => {
  try {
    let options = {};

    if (transaction) {
      options.transaction = transaction;
    }

    const createdCashier = await db.models.cashiers.create(
      {
        id: request.id,
        full_name: request.fullName,
        call_name: request.callName,
        phone_number: request.phoneNumber,
        street: request.street,
        city: request.city,
        province: request.province,
        country: request.country,
        user_id: request.userId,
        postal_code: request.postalCode,
        created_at: request.createdAt,
      },
      options
    );

    return createdCashier;
  } catch (error) {
    throw new ResponseError(error.status, error.message);
  }
};

const getByPhoneNumber = async (phoneNumber, transaction = null) => {
  try {
    let options = {};

    if (transaction) {
      options.transaction = transaction;
    }
    return await db.models.cashiers.findOne(
      {
        where: { phone_number: phoneNumber },
      },
      options
    );
  } catch (error) {
    throw new ResponseError(error.status, error.message);
  }
};

const getById = async (id) => {
  const cashier = await db.models.cashiers.findOne({ where: { id: id } });

  if (!cashier) {
    throw new ResponseError(404, "Cashier not found");
  }

  return toCashierResponse(cashier);
};

const getAll = async (request, page, limit) => {
  const {
    fullName,
    callName,
    phoneNumber,
    street,
    city,
    province,
    country,
    postalCode,
  } = request;

  const offset = page * limit;

  const totalRows = await db.models.cashiers.count({
    where: {
      [Op.or]: [
        {
          full_name: {
            [Op.like]: `%${fullName}%`,
          },
        },
        {
          call_name: {
            [Op.like]: `%${callName}%`,
          },
        },
        {
          phone_number: {
            [Op.like]: `%${phoneNumber}%`,
          },
        },
        {
          street: {
            [Op.like]: `%${street}%`,
          },
        },
        {
          city: {
            [Op.like]: `%${city}%`,
          },
        },
        {
          province: {
            [Op.like]: `%${province}%`,
          },
        },
        {
          country: {
            [Op.like]: `%${country}%`,
          },
        },
        {
          postal_code: {
            [Op.like]: `%${postalCode}%`,
          },
        },
      ],
    },
  });

  const totalPage = Math.ceil(totalRows / limit);

  const cashiers = await db.models.cashiers.findAll({
    where: {
      [Op.or]: [
        {
          full_name: {
            [Op.like]: `%${fullName}%`,
          },
        },
        {
          call_name: {
            [Op.like]: `%${callName}%`,
          },
        },
        {
          phone_number: {
            [Op.like]: `%${phoneNumber}%`,
          },
        },
        {
          street: {
            [Op.like]: `%${street}%`,
          },
        },
        {
          city: {
            [Op.like]: `%${city}%`,
          },
        },
        {
          province: {
            [Op.like]: `%${province}%`,
          },
        },
        {
          country: {
            [Op.like]: `%${country}%`,
          },
        },
        {
          postal_code: {
            [Op.like]: `%${postalCode}%`,
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    order: [["created_at", "DESC"]],
  });

  const responses = cashiers.map((cashier) => toCashierResponse(cashier));

  return {
    data: responses,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  };
};

const update = async (request) => {
  const updateCashierRequest = validate(updateCashierSchemaRequest, request);

  const cashier = await db.models.cashiers.findOne({
    where: { id: updateCashierRequest.id },
  });

  if (!cashier) {
    throw new ResponseError(404, "Cashier not found");
  }

  cashier.full_name = updateCashierRequest.fullName;
  cashier.call_name = updateCashierRequest.callName;
  cashier.phone_number = updateCashierRequest.phoneNumber;
  cashier.street = updateCashierRequest.street;
  cashier.city = updateCashierRequest.city;
  cashier.province = updateCashierRequest.province;
  cashier.country = updateCashierRequest.country;
  cashier.postal_code = updateCashierRequest.postalCode;
  cashier.updated_at = new Date();

  const updatedCashier = await cashier.save();

  return toCashierResponse(updatedCashier);
};

const toCashierResponse = (cashier) => {
  return {
    id: cashier.id,
    fullName: cashier.full_name,
    callName: cashier.call_name,
    phoneNumber: cashier.phone_number,
    street: cashier.street,
    city: cashier.city,
    province: cashier.province,
    country: cashier.country,
    userId: cashier.user_id,
    postalCode: cashier.postal_code,
    created_at: cashier.created_at,
    updated_at: cashier.updated_at !== null ? cashier.updated_at : null,
  };
};

export default {
  create,
  getByPhoneNumber,
  getById,
  getAll,
  update,
};
