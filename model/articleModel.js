// articleModel.js
var mongoose = require('mongoose');
// Setup schema
var articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    reading_time: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String
    },
    imgName: {
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Article model
var Article = module.exports = mongoose.model('article', articleSchema);
module.exports.get = function (callback, limit) {
    Article.find(callback).limit(limit);
}