import Joi from "joi";

export const signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  birthDate: Joi.date()
    .max("now")
    .greater(new Date(Date.now() - 100 * 365 * 24 * 60 * 60 * 1000)) // up to 100 years ago
    .required()
    .custom((value, helpers) => {
      const age = (Date.now() - new Date(value)) / (365 * 24 * 60 * 60 * 1000);
      if (age < 16) {
        return helpers.message("Registration Failed, you must be at least 16 years old" );
      }
      return value;
    }, "Age Validation"),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
