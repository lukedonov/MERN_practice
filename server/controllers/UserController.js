const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

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
    module.exports = {
  createUser
}