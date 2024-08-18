import { ValidationError } from "../errors/validation.error.js";

export const ValidationMiddleware = (schema) => {
  return (req, _, next) => {
    const data = req.body;
    const { error, value } = schema.validate(data);
    if (error) {
      throw new ValidationError(error.message);
    }
    req.body = value;
    next();
  };
};
