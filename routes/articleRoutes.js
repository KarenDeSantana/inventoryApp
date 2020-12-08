const express = require('express');
const mongoose = require('mongoose');
const { check, validationResult} = require("express-validator");
// const requireAuth = require('../middlewares/requireAuth');

const Article = mongoose.model('article');

const router = express.Router();

// router.use(requireAuth);
mongoose.set('useFindAndModify', false);

router.get('/articles', async (req, res) => {
    const articles = await Article.find();

    res.send(articles);
});

router.post('/article/save', 
        check("title", "Please Enter a Valid Title")
        .not()
        .isEmpty(),
        check("author", "Please Enter a Valid Author")
        .not()
        .isEmpty(),
        check("content", "Please Enter a Valid Content")
        .not()
        .isEmpty(),
        check("reading_time", "Please Enter a Valid Reading Time")
        .not()
        .isEmpty(),
        async (req, res) => {
    console.log(req.body);
    const { title, author, content, reading_time } = req.body.title;

    if (!title || !author || !content || !reading_time) {
        return res.status(422).send({ error: ' must provide all fields' });
    }
    try {
        const article = new Article({ title, content, author, reading_time });
        await article.save();
        res.send(article);
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
});


router.delete('/article/delete/:_id', async (req, res) => {
    const deletedArticle = await Article.deleteOne({ _id: req.params._id }, function (err, results) {
        if (err) {
            console.log('This is a catched error' + err);
        }
    });

    res.send( { _id: req.params._id } )
})

router.put('/article/edit/:_id', async (req, res, next) => {
    console.log(req.body);
    const updatedArticle = await Article.findByIdAndUpdate(req.params._id, req.body.title, function (err, results) {
        if (err) {
            return next(err);
        }
    });

    res.send( updatedArticle )
})

module.exports = router; 