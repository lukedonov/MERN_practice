const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys= require('../../config/keys')

const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

const ONE_YEAR_IN_SECONDS = 31556926;

createUser = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if(user) {
      return res.status(400).json({ email: "Email already exists" })
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.email,
        password: req.body.email,
      })
      
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err))
        });
      });
    }
  })
}

validateUser = (req, res) => {
  const {errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    res.status(400).json(errors)
  }

  const email = req.body.email;
  const password = req.body.password;

  user.findOne({email}).then(user => {
    if (!user) {
      return res.status(404).json({emailnotfound: "Email not found"})
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: ONE_YEAR_IN_SECONDS
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer" + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({passwordincorrect: "Password incorrect"})
      }
    });
  });
};
    
module.exports = {
  createUser,
  validateUser
}