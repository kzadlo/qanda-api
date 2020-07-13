const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Question = require('../models/Question');

router
    .get('/', (req, res, next) => {
        Question
            .find()
            .select('_id text createdAt')
            .exec()
            .then((questions) => {
                res.status(200).json({
                    count: questions.length,
                    questions: questions,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    error: err
                });
            });
    })
    .post('/', (req, res, next) => {
        const question = new Question({
            _id: new mongoose.Types.ObjectId(),
            text: req.body.text
        });

        question
            .save()
            .then(() => {
                res.status(201).json({
                    message: 'Question was created successfully.',
                });
            })
            .catch((err) => {
                res.status(500).json({
                    error: err
                });
            });
    })
    .get('/:questionId', (req, res, next) => {
        Question
            .findById(req.params.questionId)
            .select('_id text createdAt')
            .exec()
            .then((question) => {
                if (question) {
                    res.status(200).json({
                        question: question
                    });
                } else {
                    res.status(404).json({
                        message: 'Question does not exists.'
                    });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    error: err
                });
            });
    })
    .delete('/:questionId', (req, res, next) => {
        Question
            .remove({
                _id: req.params.questionId
            })
            .exec()
            .then(() => {
                res.status(200).json({
                    message: 'Question was deleted successfully.'
                });
            })
            .catch((err) => {
                res.status(500).json({
                    error: err
                });
            });
    })
    .patch('/:questionId', (req, res, next) => {
        Question
            .update({
                _id: req.params.questionId
            }, {
                $set: {
                    text: req.body.text
                }
            })
            .then(() => {
                res.status(200).json({
                    message: 'Question was updated successfully.'
                });
            })
            .catch((err) => {
                res.status(500).json({
                    error: err
                });
            });
    });

module.exports = router;
