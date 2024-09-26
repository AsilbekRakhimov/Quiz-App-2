import { ConflictError } from "../../errors/conflict.error.js";
import { quiz } from "../quiz/quiz.schema.js";
import { Question } from "./question.schema.js";

class QuestionService {
  #_model;
  #quiz_model;
  constructor() {
    this.#_model = Question;
    this.#quiz_model = quiz;
  }

  // create question
  async createOneQuestion({ title_uz, title_ru, title_en, image, quizId }) {
    try {
      const data = await this.#_model.create({
        title_uz,
        title_ru,
        title_en,
        image,
        quizId,
      });
      await this.#quiz_model.updateOne(
        { _id: quizId },
        {
          $push: {
            questions: data,
          },
        }
      );
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // get all questions
  async getAllQuestions(language) {
    try {
      const data = await this.#_model
        .find()
        .select(`_id title_${language} image quizId options`);
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // get one question
  async getOneQuestion(id, language) {
    try {
      const data = await this.#_model
        .findById(id)
        .select(`_id title_${language} image quizId options`);
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // update one question
  async updateOneQuestion({ id, title_ru, title_en, title_uz, image, quizId }) {
    try {
      const data = await this.#_model.findByIdAndUpdate(id, {
        title_ru,
        title_en,
        title_uz,
        image,
        quizId,
      });
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // delete one question
  async deleteOneQuestion(id) {
    try {
      const data = await this.#_model.findByIdAndDelete(id);
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }
}

export default new QuestionService();
