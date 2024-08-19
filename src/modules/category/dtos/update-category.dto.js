import Joi from "joi";

export const updateCategorySchema = Joi.object({
    description_uz:Joi.string(),
    description_ru:Joi.string(),
    description_en:Joi.string(),
    name_uz:Joi.string(),
    name_ru:Joi.string(),
    name_en:Joi.string()
})