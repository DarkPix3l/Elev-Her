import Joi from 'joi';

export const adminCreateUser = Joi.object({
  name: Joi.string().min(2).required(),
  surname: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'client').required(),
  address: Joi.object({
    street: Joi.string().allow(''),
    apartment: Joi.string().allow(''),
    city: Joi.string().allow(''),
    postalCode: Joi.string().allow(''),
    country: Joi.string().allow(''),
  }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2),
  surname: Joi.string().min(2),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  address: Joi.object({
    street: Joi.string().allow(''),
    apartment: Joi.string().allow(''),
    city: Joi.string().allow(''),
    postalCode: Joi.string().allow(''),
    country: Joi.string().allow(''),
  }),
  shippingAddress: Joi.object({
    street: Joi.string().allow(''),
    apartment: Joi.string().allow(''),
    city: Joi.string().allow(''),
    postalCode: Joi.string().allow(''),
    country: Joi.string().allow(''),
  }),
}).min(1);
