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
      const quizes = [];

      for (let i = 0; i < data.length; i++) {
        const obj = {};
        obj["id"] = data[i]._id;
        obj["title"] = data[i][`title_${language}`];
        obj["minPassScore"] = data[i].minPassScore;
        obj["subCategoryId"] = data[i].subCategoryId;
        obj["questions"] = [];
        for (let j = 0; j < data[i]["questions"].length; j++) {
          let obj1 = {};
          obj1["id"] = data[i]["questions"][j]["_id"];
          obj1["title"] = data[i]["questions"][j][`title_${language}`];
          obj1["image"] = data[i]["questions"][j][`image`];
          obj1["quizId"] = data[i]["questions"][j][`quizId`];
          obj1["options"] = data[i]["questions"][j][`options`];
          obj["questions"].push(obj1);
          obj1 = {};
        }
        quizes.push(obj);
      }
      return quizes;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // get one quiz'
  async getOneQuiz(id, language) {
    try {
      const data = await this.#_model
        .findById(id)
        .populate("questions")
        .select(`title_${language} minPassScore questions subCategoryId`);
      const quizes = [];

      const obj = {};
      obj["id"] = data._id;
      obj["title"] = data[`title_${language}`];
      obj["minPassScore"] = data.minPassScore;
      obj["subCategoryId"] = data.subCategoryId;
      obj["questions"] = [];
      for (let j = 0; j < data["questions"].length; j++) {
        let obj1 = {};
        obj1["id"] = data["questions"][j]["_id"];
        obj1["title"] = data["questions"][j][`title_${language}`];
        obj1["image"] = data["questions"][j][`image`];
        obj1["quizId"] = data["questions"][j][`quizId`];
        obj1["options"] = data["questions"][j][`options`];
        obj["questions"].push(obj1);
      }
      quizes.push(obj);
      return quizes;
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
