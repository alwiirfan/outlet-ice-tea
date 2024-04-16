import Joi from "joi";

const newUnitSchemaRequest = Joi.object({
  unit: Joi.string().required(),
});

export { newUnitSchemaRequest };
