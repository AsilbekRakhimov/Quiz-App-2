import { ConflictError } from "../../errors/conflict.error.js";
import { sub_category } from "../sub_category/sub_category.schema.js";
import { quiz } from "./quiz.schema.js";

class QuizService {
  #_model;
  #_subCategoryModel;
  constructor() {
    this.#_model = quiz;
    this.#_subCategoryModel = sub_category;
  }

  // create quiz
  async createOneQuiz({
    title_uz,
    title_ru,
    title_en,
    minPassScore,
    subCategoryId,
  }) {
    try {
      const data = await this.#_model.create({
        title_uz,
        title_ru,
        title_en,
        minPassScore,
        subCategoryId,
      });
      await this.#_subCategoryModel.updateOne(
        { _id: subCategoryId },
        {
          $push: {
            quiz: data,
          },
        }
      );
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // get quiz
  async getAllQuizes(language) {
    try {
      const data = await this.#_model
        .find()
        .populate("questions")
        .select(`title_${language} minPassScore questions subCategoryId`);
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // get one quiz'
  async getOneQuiz(id, language) {
    try {
      const quiz = await this.#_model
        .findById(id)
        .select(`title_${language} minPassScore questions subCategoryId`);
      return quiz;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // update one quiz
  async updateOneQuiz({
    id,
    title_uz,
    title_ru,
    title_en,
    minPassScore,
    subCategoryId,
  }) {
    try {
      const data = await this.#_model.findByIdAndUpdate(id, {
        title_uz,
        title_ru,
        title_en,
        minPassScore,
        subCategoryId,
      });
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // delete one quiz
  async deleteOneQuiz(id) {
    try {
      const data = await this.#_model.findByIdAndDelete(id);
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }
}

export default new QuizService();
