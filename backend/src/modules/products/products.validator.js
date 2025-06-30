import Joi from "joi";

export const createProductSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  slug: Joi.string().trim().required(),
  summary: Joi.string().allow("", null),
  description: Joi.string().allow("", null),
  price: Joi.number().positive().required(),
  oldPrice: Joi.number().min(0).default(0),
  inStock: Joi.boolean().required(),
  quantity: Joi.number().integer().min(0).required(),
  mainImage: Joi.string().uri().required(),
  images: Joi.array().items(Joi.string().uri()).default([]),

  sizes: Joi.array().items(Joi.number().positive()).min(1).required(),
  color: Joi.array().items(Joi.string().trim().lowercase()).min(1).required(),

  /* categories: Joi.array().items(Joi.string().trim()).min(1).required(), */
  user: Joi.string().required(),

  averageRating: Joi.number().min(0).max(5).default(0),
  reviewCount: Joi.number().integer().min(0).default(0),

  metaTitle: Joi.string().allow("", null),
  metaDescription: Joi.string().allow("", null),
  metaKeywords: Joi.array().items(Joi.string().trim()).default([]),
});


export const updateProductSchema = createProductSchema.fork(
  Object.keys(createProductSchema.describe().keys),
  (schema) => schema.optional()
);