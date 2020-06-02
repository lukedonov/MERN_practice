const express = require('express')

const userController = require('../controllers/UserController')

const router = express.Router()

router.post('/user/new', userController.createUser )

module.exports = {
  router
}