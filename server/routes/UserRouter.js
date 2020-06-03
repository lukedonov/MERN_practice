const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

router.post('/register', UserController.createUser )
router.post('/login', UserController.createUser )

module.exports = router

