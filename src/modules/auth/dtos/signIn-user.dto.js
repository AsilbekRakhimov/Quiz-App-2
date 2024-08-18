import Joi from "joi";

export const signInUserSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required().min(4)
})