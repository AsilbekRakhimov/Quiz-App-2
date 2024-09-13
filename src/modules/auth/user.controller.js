import userService from "./user.service.js";

class UserController {
  #_service;
  constructor() {
    this.#_service = userService;
  }

  // sign up user
  signUp = async (req, res, next) => {
    try {
      const photo = req.file.filename;
      const user = await this.#_service.signUpUser({ photo, ...req.body });
      res.status(201).send({
        data: user,
        message: "User signed up succesfully",
      });
    } catch (error) {
      next(error)
      // res.status(400).send({
      //   message: "There is error in user signed up",
      // });
    }
  };
  // sign up user

  // sign in user
  signIn = async (req, res) => {
    try {
      const data = await this.#_service.signInUser(req.body);
      if (data) {
        res.status(200).send({
          message: "Successfully signed in",
          data: data,
        });
        return;
      }
      res.status(404).send({
        message: "User is not found",
      });
    } catch (error) {
      res.status(404).send({
        message: "Error in sign in",
      });
    }
  };
  // sign in user

  // sign refresh token
  signRefreshToken = async (req, res) =>{
    try {
        const data = await this.#_service.signNewRefreshToken(req.body);
        res.status(201).send({
            data:data,
            message:"New tokens"
        })
    } catch (error) {
        res.status(400).send({
            name: error.name,
            message:"Cannot sign new refresh token"
        })
    }
  }
  // sign refresh token
}

export default new UserController();
