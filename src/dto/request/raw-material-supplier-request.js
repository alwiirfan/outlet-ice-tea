import Joi from "joi";

const newRawMaterialSupplierSchemaRequest = Joi.object({
  materialName: Joi.string().required(),
  totalQuantity: Joi.number().required(),
  unitPrice: Joi.number().required(),
  unit: Joi.string().required(),
});

export { newRawMaterialSupplierSchemaRequest };
