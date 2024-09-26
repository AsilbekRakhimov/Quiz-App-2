import questionService from "./question.service.js";

class QuestionController {
  #_service;
  constructor() {
    this.#_service = questionService;
  }

  // create question
  createQuiz = async (req, res, next) => {
    try {
      const image = req.file.filename;
      const data = await this.#_service.createOneQuestion({
        image,
        ...req.body,
      });
      if (!data) {
        res.status(400).send({
          message: "bad request",
        });
        return;
      }
      res.status(201).send({
        message: "created",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  // get all questions
  getQuestions = async (req, res, next) => {
    try {
      const language = req.headers["accept-language"];
      const data = await this.#_service.getAllQuestions(language);
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

  // get one question
  getQuestion = async (req, res, next) => {
    try {
      const id = req.params.id;
      const language = req.headers["accept-language"];
      const data = await this.#_service.getOneQuestion(id, language);
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

  // update question
  updateQuestion = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await this.#_service.updateOneQuestion({ id, ...req.body });
      if (!data) {
        res.status(404).send({
          message: "not found",
        });
        return;
      }
      res.status(202).send({
        message: "updated",
      });
    } catch (error) {
      next(error);
    }
  };

  // delete one question
  deleteQuestion = async (req, res, next) => {
    try {
      const data = await this.#_service.deleteOneQuestion(req.params.id);
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

export default new QuestionController();
