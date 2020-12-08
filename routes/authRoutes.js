const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { check, validationResult} = require("express-validator");
const User = mongoose.model('user');

const router = express.Router();

router.post('/signup', [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
        min: 6
    })
], async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }
        user = new User({ email, password });

            await user.save();

            const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ token: token });
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.post('/signin', [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(422).send({ error: 'Must provide email and password.' });
    }

    let user = await User.findOne({ email });
    if (!user) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }

    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY')
        res.send({ token });
    } catch (err) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }
});

module.exports = router;