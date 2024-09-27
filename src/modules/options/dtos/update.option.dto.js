import Joi from "joi";

export const updateOptionSchema = Joi.object({
  option_uz: Joi.string(),
  option_ru: Joi.string(),
  option_en: Joi.string(),
  isCorrect: Joi.boolean().required(),
  questionId: Joi.string()
});
