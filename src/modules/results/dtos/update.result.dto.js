import Joi from "joi";

export const updateResultSchema = Joi.object({
  score: Joi.number().required(),
  quizId: Joi.string(),
  userId: Joi.string(),
});
