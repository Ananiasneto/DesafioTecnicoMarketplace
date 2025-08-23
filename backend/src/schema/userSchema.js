import Joi from "joi";

export const signUpSchema = Joi.object({
  image: Joi.any().optional(),
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});


export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()

});