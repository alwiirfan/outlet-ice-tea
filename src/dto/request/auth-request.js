import Joi from "joi";

// reister cashier request
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

// login cashier request
const loginCashierSchemaRequest = Joi.object({
  username: Joi.string().min(4).max(100).required(),
  password: Joi.string()
    .min(4)
    .max(100)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

// register admin request
const newAuthAdminSchemaRequest = Joi.object({
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
  callName: Joi.string().required(),
  phoneNumber: Joi.string().min(2).max(20).required(),
  pin: Joi.string().min(6).max(6).required(),
});

// login admin request
const loginAdminSchemaRequest = Joi.object({
  username: Joi.string().min(4).max(100).required(),
  password: Joi.string()
    .min(4)
    .max(100)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  pin: Joi.string().min(6).max(6).required(),
});

// refresh token request
const refreshCashierTokenSchemaRequest = Joi.object({
  refreshToken: Joi.string().required(),
});

// forget password request
const forgetPasswordSchemaRequest = Joi.object({
  username: Joi.string().min(4).max(100).required(),
});

// reset password request
const resetPasswordSchemaRequest = Joi.object({
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
});

// change password request
const changePasswordSchemaRequest = Joi.object({
  id: Joi.string().required(),
  oldPassword: Joi.string()
    .min(4)
    .max(100)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  newPassword: Joi.string()
    .min(4)
    .max(100)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  confirmPassword: Joi.string()
    .min(4)
    .max(100)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

export {
  newAuthCashierSchemaRequest,
  loginCashierSchemaRequest,
  newAuthAdminSchemaRequest,
  loginAdminSchemaRequest,
  refreshCashierTokenSchemaRequest,
  forgetPasswordSchemaRequest,
  resetPasswordSchemaRequest,
  changePasswordSchemaRequest,
};
