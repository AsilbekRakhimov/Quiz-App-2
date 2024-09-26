import { ConflictError } from "../../errors/conflict.error.js";
import { Result } from "./result.schema.js";

class ResultService {
  #_model;
  constructor() {
    this.#_model = Result;
  }

  // create result
  async createOneResult({ score, userId, quizId }) {
    try {
      const data = await this.#_model.create({
        score,
        attemptDate: new Date(),
        attemptTimes: 1,
        userId,
        quizId,
      });
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // get all results
  async getAllResults() {
    try {
      const data = await this.#_model.find();
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // get one result
  async getOneResult(id) {
    try {
      const data = await this.#_model.findById(id);
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // update result
  async updateOneResult({ id, score, quizId, userId }) {
    try {
      const data = await this.#_model.findByIdAndUpdate(id, {
        score,
        quizId,
        userId,
      });
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // delete result
  async deleteOneResult(id) {
    try {
      const data = await this.#_model.findByIdAndDelete(id);
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }
}

export default new ResultService();
