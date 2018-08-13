const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

class UserController {
  //SIGN UP USER ------------------------>>>
  static signUpUser(req, res) {
    if (req.body.password === 0 || req.body.password === undefined) {
      res.status(400).json({
        message: "password is required"
      });
    }

    const salt = bcryptjs.genSaltSync(8);
    const hashedPassword = bcryptjs.hashSync(req.body.password, salt);

    User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
      .then(user => {
        const userToken = jwt.sign(
          {
            id: user._id,
            name: user.name,
            email: user.email
          },
          process.env.JWT_SECRET_KEY
        );

        let data = {
          token: userToken,
          userId: user._id,
          name: user.name,
          email: user.email
        };

        res.status(200).json({
          message: "Sign Up successfullly",
          data
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }

  //SIGN UP USER ------------------------>>>
  static signInUser(req, res) {
    User.findOne({ email: req.body.email })
      .then(user => {
        const checkPassword = bcryptjs.compareSync(
          req.body.password,
          user.password
        );

        if (checkPassword) {
          const userToken = jwt.sign(
            {
              id: user._id,
              name: user.name,
              email: user.email
            },
            process.env.JWT_SECRET_KEY
          );

          let data = {
            token: userToken,
            userId: user._id,
            name: user.name,
            email: user.email
          };

          res.status(200).json({
            message: "Sign In successfully",
            data: data
          });
        } else {
          res.status(400).json({
            message: "password wrong"
          });
        }
      })
      .catch(err => {
        res.status(400).json({
          message: "email wrong",
          err
        });
      });
  }

  //LOGIN FACEBOOK USER ------------------------>>>
  static loginFacebook(req, res) {
    let authResponse = req.body;
    let url_user_info = `https://graph.facebook.com/me?fields=id,name,email&access_token=${
      authResponse.accessToken
    }`;

    axios
      .get(url_user_info)
      .then(user => {      
        User.findOne({ email: user.data.email })
        .then(userDB => {
          if (userDB === null) {
            const salt = bcryptjs.genSaltSync(8);
            const hashedPassword = bcryptjs.hashSync(user.data.id, salt);

            User.create({
              name: user.data.name,
              email: user.data.email,
              password: hashedPassword
            }).then(user => {
              const userToken = jwt.sign(
                {
                  id: user._id,
                  name: user.name,
                  email: user.email
                },
                process.env.JWT_SECRET_KEY
              );

              let data = {
                token: userToken,
                userId: user._id,
                name: user.name,
                email: user.email
              };
              res.status(200).json({
                message: "user successfully registered",
                data
              });
            });
          }else {
            const checkPassword = bcryptjs.compareSync(
                user.data.id,
                userDB.password
              );
      
              if (checkPassword) {
                const userToken = jwt.sign(
                  {
                    id: userDB._id,
                    name: userDB.name,
                    email: userDB.email
                  },
                  process.env.JWT_SECRET_KEY
                );
      
                let data = {
                  token: userToken,
                  userId: userDB._id,
                  name: userDB.name,
                  email: userDB.email
                };
                res.status(200).json({
                  message: "sign in success",
                  token: data.token,
                  data: data
                });
                
              } else {
                res.status(400).json({
                  message: "password wrong"
                });
              }
          }
        });

      })
      .catch(err => {
        res.status(400).json({
            message: err.message
          });
      });
  }
}

module.exports = UserController;
