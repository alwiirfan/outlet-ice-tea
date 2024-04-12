import Joi from "joi";

const newCashierSchemaRequest = Joi.object({
  fullName: Joi.string().min(4).max(100).required(),
  callName: Joi.string().required(),
  phoneNumber: Joi.string().min(2).max(20).required(),
  street: Joi.string().min(2).max(150).required(),
  city: Joi.string().min(2).max(50).required(),
  province: Joi.string().min(2).max(50).required(),
  country: Joi.string().min(2).max(50).required(),
  postalCode: Joi.string().min(2).max(10).required(),
});

// const searchCashierSchemaRequest = Joi.object({
//   fullName: Joi.string(),
//   callName: Joi.string(),
//   phoneNumber: Joi.string(),
//   street: Joi.string(),
//   city: Joi.string(),
//   province: Joi.string(),
//   country: Joi.string(),
//   postalCode: Joi.string(),
// });

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

export {
  newCashierSchemaRequest,
  // searchCashierSchemaRequest,
  updateCashierSchemaRequest,
};
