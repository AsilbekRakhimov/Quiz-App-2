import Joi from "joi";

export const signUpUserSchema = Joi.object({
    full_name: Joi.string().required().min(3),
    email: Joi.string().required().min(3),
    password: Joi.string().required().min(4),
    role: Joi.string()
});