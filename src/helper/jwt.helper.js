import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt.config.js";
import { JwtTokenError } from "../errors/jwt-token.error.js";

// sign access token
export const signAccessToken = (data) => {
  return jwt.sign(data, jwtConfig.jwt_access_key, {
    expiresIn: jwtConfig.jwt_access_key_expire,
  });
};
// sign access token

// sign refresh token
export const signRefreshToken = (data) => {
  return jwt.sign(data, jwtConfig.jwt_refresh_key, {
    expiresIn: jwtConfig.jwt_refresh_key_expire,
  });
};
// sign refresh token

// verify token
export const verifyToken = (token, secretKey) => {
  let response = null;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (decoded) {
      response = decoded;
    }
    if (err instanceof jwt.JsonWebTokenError) {
      throw new JwtTokenError("Token is invalid");
    }
    if (err instanceof jwt.NotBeforeError) {
      throw new JwtTokenError("Token used before initialized");
    }
    if (err instanceof jwt.TokenExpiredError) {
      throw new JwtTokenError("Token is expired");
    }
  });
  return response;
};
// verify token
