import Joi from "joi";

export const updateSubCategorySchema = Joi.object({
  name_uz: Joi.string().required(),
  name_ru: Joi.string().required(),
  name_en: Joi.string().required(),
  description_uz: Joi.string(),
  description_ru: Joi.string(),
  description_en: Joi.string(),
});
