import jwtConfig from "../../config/jwt.config.js";
import { JwtTokenError } from "../../errors/jwt-token.error.js";
import { SignError } from "../../errors/sign-user.error.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyToken,
} from "../../helper/jwt.helper.js";
import { users } from "./user.schema.js";

class UsersService {
  #_model;
  constructor() {
    this.#_model = users;
  }

  // signUp user
  async signUpUser({ full_name, role, email, password, photo }) {
    try {
      const user = await this.#_model.create({
        full_name,
        email,
        password,
        role,
        photo,
      });
      const accessToken = signAccessToken({ id: user._id, role: user.role });
      const refreshToken = signRefreshToken({ id: user._id, role: user.role });
      return { user, accessToken, refreshToken };
    } catch (error) {
      throw new SignError(error.message);
    }
  }
  // signUp userrole

  // sign in user
  async signInUser({ email, password }) {
    try {
      const user = await this.#_model.findOne({
        email: email,
      });
      if (user?.password === password) {
        const accessToken = signAccessToken({ id: user._id, role: user.role });
        const refreshToken = signRefreshToken({
          id: user._id,
          role: user.role,
        });
        return {id:user["_id"],accessToken, refreshToken, };
      }
      return null;
    } catch (error) {
      throw new SignError("There is error in service while sign in");
    }
  }
  // sign in user

  // sign refresh token
  async signNewRefreshToken({ refreshToken }) {
    try {
      const response = verifyToken(refreshToken, jwtConfig.jwt_refresh_key);
      const newAccessToken = signAccessToken({
        id: response?.id,
        role: response?.role,
      });
      const newRefreshToken = signRefreshToken({
        id: response?.id,
        role: response?.role,
      });
      return { newAccessToken, newRefreshToken };
    } catch (error) {
      throw JwtTokenError("Error in service while signing new refresh token");
    }
  }
  // sign refresh token
}

export default new UsersService();
