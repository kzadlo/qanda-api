const express = require('express');
const mongoose = require('mongoose');
const Answer = require('../models/answer');
const Question = require('../models/question');

const router = express.Router();

router.get('/', (req, res, next) => {
    Answer
        .find()
        .select('_id text createdAt questionId')
        .exec()
        .then((answers) => {
            res.status(200).json({
                count: answers.length,
                answers: answers,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:answerId', (req, res, next) => {
    Answer
        .findById(req.params.answerId)
        .select('_id text createdAt questionId')
        .exec()
        .then((answer) => {
            if (answer) {
                res.status(200).json({
                    answer: answer
                });
            } else {
                res.status(404).json({
                    message: 'Answer does not exists.'
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    Question
        .findById(req.body.questionId)
        .then((question) => {
            if (!question) {
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

    const answer = new Answer({
        _id: new mongoose.Types.ObjectId(),
        questionId: req.body.questionId,
        text: req.body.text
    });

    answer
        .save()
        .then(() => {
            res.status(201).json({
                message: 'Answer was created successfully.',
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:answerId', (req, res, next) => {
    Answer
        .remove({
            _id: req.params.answerId
        })
        .exec()
        .then(() => {
            res.status(200).json({
                message: 'Answer was deleted successfully.'
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:answerId', (req, res, next) => {
    Answer
        .update({
            _id: req.params.answerId
        }, {
            $set: {
                text: req.body.text
            }
        })
        .then(() => {
            res.status(200).json({
                message: 'Answer was updated successfully.'
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;