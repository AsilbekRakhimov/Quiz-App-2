import Joi from "joi";

export const createCommentSchema = Joi.object({
    comment_uz:Joi.string().required().min(3),
    comment_ru:Joi.string().required().min(3),
    comment_en:Joi.string().required().min(3),
    questionId:Joi.string().required(),
    userId:Joi.string().required(),
})