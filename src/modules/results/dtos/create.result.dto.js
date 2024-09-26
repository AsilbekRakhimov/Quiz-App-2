import Joi from "joi";

export const createResultSchema = Joi.object({
  score: Joi.number().required(),
  quizId: Joi.string().required(),
  userId: Joi.string().required(),
});
