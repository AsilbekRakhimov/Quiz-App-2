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
        .populate("options")
        .select(`_id title_${language} image quizId options`);
      const questions = [];
      // console.log(data[0].options);
      for (let i = 0; i < data.length; i++) {
        const obj = {};
        obj["id"] = data[i]["_id"];
        obj["title"] = data[i][`title_${language}`];
        obj["image"] = data[i]["image"];
        obj["quizId"] = data[i]["quizId"];
        obj["options"] = [];
        for (let j = 0; j < data[i]["options"].length; j++) {
          let obj1 = {};
          obj1["id"] = data[i]["options"][j][`_id`];
          obj1["option"] = data[i]["options"][j][`option_${language}`];
          obj1["isCorrect"] = data[i]["options"][j][`isCorrect`];
          obj1["questionId"] = data[i]["options"][j][`questionId`];
          obj["options"].push(obj1);
        }
        questions.push(obj);
      }
      return questions;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // get one question
  async getOneQuestion(id, language) {
    try {
      const data = await this.#_model
        .findById(id)
        .populate("options")
        .select(`_id title_${language} image quizId options`);
      if (!data) {
        return null
      }
      const questions = [];
      const obj = {};
      obj["id"] = data["_id"];
      obj["title"] = data[`title_${language}`];
      obj["image"] = data["image"];
      obj["quizId"] = data["quizId"];
      obj["options"] = [];
      for (let j = 0; j < data["options"].length; j++) {
        let obj1 = {};
        obj1["id"] = data["options"][j][`_id`];
        obj1["option"] = data["options"][j][`option_${language}`];
        obj1["isCorrect"] = data["options"][j][`isCorrect`];
        obj1["questionId"] = data["options"][j][`questionId`];
        obj["options"].push(obj1);
      }
      questions.push(obj);

      return questions;
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
