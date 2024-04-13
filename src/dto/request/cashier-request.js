import Joi from "joi";

const updateCashierSchemaRequest = Joi.object({
  id: Joi.string().required(),
  fullName: Joi.string().min(4).max(100).required(),
  callName: Joi.string().required(),
  phoneNumber: Joi.string().min(2).max(20).required(),
  street: Joi.string().min(2).max(150),
  city: Joi.string().min(2).max(50),
  province: Joi.string().min(2).max(50),
  country: Joi.string().min(2).max(50).required(),
  postalCode: Joi.string().min(2).max(10).required(),
});

export { updateCashierSchemaRequest };
