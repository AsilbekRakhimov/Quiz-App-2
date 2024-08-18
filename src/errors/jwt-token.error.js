import { BaseError } from "./base.error.js";

export class JwtTokenError extends BaseError{
    constructor(message){
        super();
        this.name = 'Jwt Error'
        this.message = message
        this.status = 403
    }
}