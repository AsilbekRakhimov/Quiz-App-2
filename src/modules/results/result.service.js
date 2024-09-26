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
}

export default new ResultService();
