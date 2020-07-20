const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

router
    .post('/register', (req, res, next) => {
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
    })
    .delete('/:userId', (req, res, next) => {
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