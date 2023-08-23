const mongoose = require('mongoose')

module.exports = mongoose.model('Blog', {
    title: String,
    author: String,
    uploadDate: { type: Date, default: Date.now, immutable: true },
    lastUpdated: { type: Date, default: Date.now },
    content: String
}, 'blogs')