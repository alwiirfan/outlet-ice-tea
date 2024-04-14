import db from "../configs/database.js";
import { ResponseError } from "../errors/response-error.js";
import { validate } from "../utils/validation-util.js";
import { updateAdminSchemaRequest } from "../dto/request/admin-request.js";

const create = async (request, transaction = null) => {
  try {
    let options = {};

    if (transaction) {
      options.transaction = transaction;
    }

    const createdAdmin = await db.models.admins.create(
      {
        id: request.id,
        full_name: request.fullName,
        call_name: request.callName,
        pin: request.pin,
        phone_number: request.phoneNumber,
        user_id: request.userId,
        created_at: request.createdAt,
      },
      options
    );

    return createdAdmin;
  } catch (error) {
    throw new ResponseError(error.status, error.message);
  }
};

const getByPin = async (pin, transaction = null) => {
  try {
    let options = {};

    if (transaction) {
      options.transaction = transaction;
    }

    return await db.models.admins.findOne(
      {
        where: { pin: pin },
      },
      options
    );
  } catch (error) {
    throw new ResponseError(error.status, error.message);
  }
};

const getById = async (id) => {
  const admin = await db.models.admins.findOne({ where: { id: id } });

  if (!admin) {
    throw new ResponseError(404, "Admin not found");
  }

  return toAdminResponse(admin);
};

const update = async (request) => {
  const updateAdminRequest = validate(updateAdminSchemaRequest, request);

  const admin = await db.models.admins.findOne({
    where: { id: updateAdminRequest.id },
  });

  if (!admin) {
    throw new ResponseError(404, "Admin not found");
  }

  admin.full_name = updateAdminRequest.fullName;
  admin.call_name = updateAdminRequest.callName;
  admin.pin = updateAdminRequest.pin;
  admin.phone_number = updateAdminRequest.phoneNumber;
  admin.updated_at = new Date();

  const updatedAdmin = await admin.save();

  return toAdminResponse(updatedAdmin);
};

const toAdminResponse = (admin) => {
  return {
    id: admin.id,
    fullName: admin.full_name,
    callName: admin.call_name,
    pin: admin.pin,
    phoneNumber: admin.phone_number,
    userId: admin.user_id,
    createdAt: admin.created_at,
    updatedAt: admin.updated_at !== null ? admin.updated_at : null,
  };
};

export default {
  create,
  getByPin,
  getById,
  update,
};
