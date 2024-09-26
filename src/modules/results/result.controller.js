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
}

export default new ResultController();
