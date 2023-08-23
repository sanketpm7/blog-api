// const dotenv = require("dotenv")
// dotenv.config()

const validateDbId = (req, res, next) => {
    const ObjectId = require('mongoose').Types.ObjectId
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({
            error: `Invalid ObjectId: ${req.params.id}`
        })
    } else {
        next()
    }
}

const raiseRecord404Error = (req, res) => {
    res.status(404).json({
        error: `no record with given _id ${req.params.id}`
    })
}

const errorHandler = (err, req, res, next) => {
    res.status(500).json({ error: err })
}

const connectDb = async (req, res, next) => {
    const mongoose = require('mongoose')

    const PASSWORD = encodeURIComponent(process.env.MONGO_PASSWORD)
    const DB_URI = process.env.MONGO_URI.replace('PASSWORD', PASSWORD)

    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        next();
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Database connection error' })
    }
}

module.exports = {
    validateDbId,
    raiseRecord404Error,
    errorHandler,
    connectDb
}