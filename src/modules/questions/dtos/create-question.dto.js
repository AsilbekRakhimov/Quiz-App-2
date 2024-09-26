import Joi from "joi";

export const createQuestionSchema = Joi.object({
  title_uz: Joi.string().required().min(3),
  title_ru: Joi.string().required().min(3),
  title_en: Joi.string().required().min(3),
  quizId: Joi.string().required(),
});
