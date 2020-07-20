const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', (req, res, next) => {
    User
        .find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length > 0) {
                return res.status(409).json({
                    message: 'User with that email exists.'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });

                        user
                            .save()
                            .then(() => {
                                res.status(201).json({
                                    message: 'User was created successfully.',
                                });
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        })
        .catch();
});

router.post('/auth', (req, res, next) => {
    User
        .findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(401).json({
                    message: 'Unauthorized.'
                });
            }

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    res.status(401).json({
                        message: 'Unauthorized.'
                    });
                }

                if (result) {
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userEmail: user.email
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );

                    return res.status(200).json({
                        token: token
                    });
                }

                res.status(401).json({
                    message: 'Unauthorized.'
                });
            })
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:userId', (req, res, next) => {
    User
        .remove({
            _id: req.params.userId
        })
        .exec()
        .then(() => {
            res.status(200).json({
                message: 'User was deleted successfully.'
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;