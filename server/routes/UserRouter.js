const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')

const UserController = require('../controllers/UserController')

const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

router.post('/register', UserController.createUser )
router.post('/login', UserController.createUser )

module.exports = router

