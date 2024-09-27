import { ConflictError } from "../../errors/conflict.error.js";
import { Comment } from "./comment.schema.js";

class CommentService {
  #_model;
  constructor() {
    this.#_model = Comment;
  }

  // create one comment
  async createOneComment({
    comment_uz,
    comment_ru,
    comment_en,
    userId,
    questionId,
  }) {
    try {
      const data = await this.#_model.create({
        comment_uz,
        comment_ru,
        comment_en,
        userId,
        questionId,
      });
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // get all comment
  async getAllComments(language) {
    try {
      const data = await this.#_model
        .find()
        .select(`_id comment_${language} questionId userId`);
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // get one comment
  async getOneComment(id, language) {
    try {
      const data = await this.#_model
        .findById(id)
        .select(`_id comment_${language} questionId userId`);
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // update one comment
  async updateOneCommment({
    id,
    comment_uz,
    comment_ru,
    comment_en,
    userId,
    questionId,
  }) {
    try {
      const data = await this.#_model.findByIdAndUpdate(id, {
        comment_uz,
        comment_ru,
        comment_en,
        userId,
        questionId,
      });
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // delete one comment
  async deleteOneComment(id) {
    try {
      const data = await this.#_model.findByIdAndDelete(id);
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }
}

export default new CommentService();
