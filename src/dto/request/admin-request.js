import Joi from "joi";

const updateAdminSchemaRequest = Joi.object({
  id: Joi.string().required(),
  fullName: Joi.string().min(4).max(100).required(),
  callName: Joi.string().min(4).max(100).required(),
  pin: Joi.string().min(6).max(6).required(),
  phoneNumber: Joi.string().min(2).max(20).required(),
});

export { updateAdminSchemaRequest };
