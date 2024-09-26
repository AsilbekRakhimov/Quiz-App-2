import resultService from "./result.service.js";

class ResultController {
  #_service;
  constructor() {
    this.#_service = resultService;
  }

  // create result
  createResult = async (req, res, next) => {
    try {
      const data = await this.#_service.createOneResult(req.body);
      if (!data) {
        res.status(400).send({
          message: "bad request",
        });
        return;
      }
      res.status(201).send({
        message: "created",
      });
    } catch (error) {
      next(error);
    }
  };

  // get all results
  getResults = async (req, res, next) => {
    try {
      const data = await this.#_service.getAllResults();
      if (!data) {
        res.status(404).send({
          message: "not found",
        });
        return;
      }
      res.status(200).send({
        message: "success",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  // get one result
  getResult = async (req, res, next) => {
    try {
      const data = await this.#_service.getOneResult(req.params.id);
      if (!data) {
        res.status(404).send({
          message: "not found",
        });
        return;
      }
      res.status(200).send({
        message: "success",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  // update result
  updateResult = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await this.#_service.updateOneResult({ id, ...req.body });
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

  // delete result
  deleteResult = async (req, res, next) => {
    try {
      const data = await this.#_service.deleteOneResult(req.params.id);
      if (!data) {
        res.status(404).send({
          message: "not found",
        });
        return;
      }
      res.status(200).send({
        message:'deleted'
      })
    } catch (error) {
      next(error);
    }
  };
}

export default new ResultController();
