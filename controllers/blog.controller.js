const express = require('express')
const router = express.Router()

const Blog = require('../models/blog.model')
const { generateCrudMethods } = require('../services')
const blogCrud = generateCrudMethods(Blog)
const { connectDb,validateDbId, raiseRecord404Error } = require('../middlewares')

router.get('/', connectDb, (req, res, next) => {
    blogCrud.getAll()
        .then(data => res.send(data))
        .catch(err => next(err))
})

router.post('/', (req, res, next) => {
    blogCrud.create(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
})

router.get('/:id', connectDb, validateDbId, (req, res, next) => {
    blogCrud.getById(req.params.id)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})

router.put('/:id', validateDbId, (req, res) => {
    blogCrud.update(req.params.id, req.body)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})

router.delete('/:id', validateDbId, (req, res) => {
    blogCrud.delete(req.params.id)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})

module.exports = router