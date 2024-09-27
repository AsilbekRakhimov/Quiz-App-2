import Joi from "joi";

export const createOptionSchema = Joi.object({
  option_uz: Joi.string().required(),
  option_ru: Joi.string().required(),
  option_en: Joi.string().required(),
  isCorrect: Joi.boolean().required(),
  questionId: Joi.string().required()
});
