import { BaseError } from "./base.error.js";

export class GetDataError extends BaseError{
    constructor(message){
        super()
        this.message = message
        this.name = "Get data error"
        this.status = 409
    }
}