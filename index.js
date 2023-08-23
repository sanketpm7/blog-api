const functions = require('@google-cloud/functions-framework')
const express = require('express')
const cors = require('cors');

const routes = require('./controllers/index')
const { connectDb, errorHandler } = require('./middlewares/index.js')

const app = express()

app.use(cors());

app.use('/api', routes)

app.use(connectDb)
app.use(errorHandler)

app.use((req, res) => {
  res.status(404).json({ message: 'Invalid API endpoint' })
})

functions.http('blogApi',app)