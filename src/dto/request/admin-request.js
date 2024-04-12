import Joi from "joi";

const newAdminSchema = Joi.object({
  fullName: Joi.string().min(4).max(100).required(),
  callName: Joi.string().required(),
  phoneNumber: Joi.string().min(2).max(20).required(),
});

const updateAdminSchema = Joi.object({
  id: Joi.string().required(),
  fullName: Joi.string().min(4).max(100).required(),
  callName: Joi.string().required(),
  phoneNumber: Joi.string().min(2).max(20).required(),
});

export { newAdminSchema, updateAdminSchema };
