import Joi from "joi";

const newRoleSchemaRequest = Joi.object({
  role: Joi.string().min(4).max(50).required(),
});

export { newRoleSchemaRequest };
