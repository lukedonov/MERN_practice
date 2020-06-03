const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const User = new Schema(
  {
    name: { type: String, required: true},
    email: { type: String, required: true },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('users', User)