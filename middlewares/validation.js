import Joi from "joi";

const createProductSchema = Joi.object({
  name: Joi.string().min(3).required().trim(),
  category: Joi.string().min(3).required().trim(),
  description: Joi.string().min(3).max(1000).required().trim(),
  price: Joi.string().required(),
  color: Joi.string().required(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(3).trim(),
  category: Joi.string().min(3).trim(),
  description: Joi.string().min(3).max(1000).trim(),
  price: Joi.string(),
  color: Joi.string(),
});

export default { createProductSchema, updateProductSchema };
