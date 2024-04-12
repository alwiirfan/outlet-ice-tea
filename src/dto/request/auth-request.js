import Joi from "joi";

const newAuthCashierSchemaRequest = Joi.object({
  username: Joi.string().min(4).max(100).required(),
  email: Joi.string()
    .min(4)
    .max(100)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string()
    .min(4)
    .max(100)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  confirmPassword: Joi.string()
    .min(4)
    .max(100)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  fullName: Joi.string().min(4).max(100).required(),
  callName: Joi.string().required().required(),
  phoneNumber: Joi.string().min(2).max(20).required(),
  street: Joi.string().min(2).max(150).required(),
  city: Joi.string().min(2).max(50).required(),
  province: Joi.string().min(2).max(50).required(),
  country: Joi.string().min(2).max(50).required(),
  postalCode: Joi.string().min(2).max(10).required(),
});

const loginCashierSchemaRequest = Joi.object({
  username: Joi.string().min(4).max(100).required(),
  password: Joi.string()
    .min(4)
    .max(100)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

const refreshCashierTokenSchemaRequest = Joi.object({
  refreshToken: Joi.string().required(),
});

export {
  newAuthCashierSchemaRequest,
  loginCashierSchemaRequest,
  refreshCashierTokenSchemaRequest,
};
