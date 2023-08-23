const express = require('express')
const router = express.Router()

const blogController = require('./blog.controller.js')

router.use('/blog', blogController)

module.exports = router