import { BaseError } from "./base.error.js";

export class SignError extends BaseError {
  constructor(message) {
    super();
    this.message = message;
    this.status = 400;
    this.name = "Kirishda xatolik";
  }
}
