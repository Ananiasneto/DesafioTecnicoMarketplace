import Joi from "joi";

export const productSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    imageUrl: Joi.string().optional(),
    category: Joi.string().required()
});
export const productUpdateSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().positive().optional(),
    imageUrl: Joi.string().optional(),
    status: Joi.string().optional()
    })
export const productUpdateStatusSchema = Joi.object({
    status: Joi.string().required()
});