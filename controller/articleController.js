// articleController.js
// Import article model
Article = require('../model/articleModel');
// Handle index actions
exports.index = function (req, res) {
    Article.get(function (err, articles) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Articles retrieved successfully",
            data: articles
        });
    });
};
// Handle create article actions
exports.new = function (req, res) {
    var article = new Article();
    article.title = req.body.title;
    article.content = req.body.content;
    article.author = req.body.author;
    article.reading_time = req.body.reading_time;
    article.img = req.body.img;
// save the article and check for errors
    article.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New article created!',
            data: article
        });
    });
};
// Handle view article info
exports.view = function (req, res) {
    Article.findById(req.params.article_id, function (err, article) {
        if (err)
            res.send(err);
        res.json({
            message: 'Article details loading..',
            data: article
        });
    });
};
// Handle update article info
exports.update = function (req, res) {
Article.findById(req.params.article_id, function (err, article) {
        if (err)
            res.send(err);
            article.title = req.body.title;
            article.content = req.body.content;
            article.author = req.body.author;
            article.reading_time = req.body.reading_time;
            article.img = req.body.img;
// save the article and check for errors
        article.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Article Info updated',
                data: article
            });
        });
    });
};
// Handle delete article
exports.delete = function (req, res) {
    Article.deleteOne({
        _id: req.params.article_id
    }, function (err, article) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Article deleted'
        });
    });
};