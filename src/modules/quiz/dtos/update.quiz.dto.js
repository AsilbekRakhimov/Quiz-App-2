import Joi from "joi";

export const updateQuizSchema = Joi.object({
  title_uz: Joi.string().required(),
  title_ru: Joi.string().required(),
  title_en: Joi.string().required(),
  minPassScore: Joi.number(),
  subCategoryId: Joi.string(),
});
