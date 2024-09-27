import Joi from "joi";

export const updateCommentSchema = Joi.object({
  comment_uz: Joi.string().min(3),
  comment_ru: Joi.string().min(3),
  comment_en: Joi.string().min(3),
  questionId: Joi.string(),
  userId: Joi.string(),
});
