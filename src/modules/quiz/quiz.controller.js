import quizService from "./quiz.service.js";

class QuizController {
  #_service;
  constructor() {
    this.#_service = quizService;
  }

  // create quiz
  createQuiz = async (req, res, next) => {
    try {
      const data = await this.#_service.createOneQuiz(req.body);
      if (!data) {
        res.status(400).send({
          message: "not created",
        });
        return;
      }
      res.status(201).send({
        message: "success",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  // get quiz
  getQuizes = async (req, res, next) => {
    try {
      const language = req.headers["accept-language"];
      const data = await this.#_service.getAllQuizes(language);
      if (!data) {
        res.status(404).send({
          message: "not found",
        });
        return;
      }
      res.status(200).send({
        message: "success",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  // get one quiz
  getQuiz = async (req, res, next) => {
    try {
      const language = req.headers["accept-language"];
      const id = req.params.id;
      const quiz = await this.#_service.getOneQuiz(id, language);
      if (!quiz) {
        res.status(404).send({
          message: "not found",
        });
        return;
      }
      res.status(200).send({
        message: "success",
        data: quiz,
      });
    } catch (error) {
      next(error);
    }
  };

  // update quiz
  updateQuiz = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await this.#_service.updateOneQuiz({ id, ...req.body });
      if (!data) {
        res.status(404).send({
          message: "not found",
        });
        return;
      }
      res.status(200).send({
        message: "updated",
      });
    } catch (error) {
      next(error);
    }
  };

  // delete one quiz
  deleteQuiz = async (req, res, next) => {
    try {
      const data = await this.#_service.deleteOneQuiz(req.params.id);
      if (!data) {
        res.status(404).send({
          message: "not found",
        });
        return;
      }
      res.status(200).send({
        message: "deleted",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new QuizController();
