// validators/product.validators.js
import Joi from "joi";

export const createProductSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  summary: Joi.string().allow("", null),
  description: Joi.string().allow("", null),
  price: Joi.number().positive().required(),
  inStock: Joi.boolean().required(),
  quantity: Joi.number().integer().min(0).required(),
  mainImage: Joi.string().uri().required(),
  images: Joi.array().items(Joi.string().uri()).default([]),
  size: Joi.string().allow("", null),
  color: Joi.string().allow("", null),
  categories: Joi.array().items(Joi.string().trim()).required(),

  metaTitle: Joi.string().allow("", null),
  metaDescription: Joi.string().allow("", null),
  metaKeywords: Joi.string().allow("", null),
});

export const updateProductSchema = createProductSchema.fork(
  Object.keys(createProductSchema.describe().keys),
  (schema) => schema.optional()
);
