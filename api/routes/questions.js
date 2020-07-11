const express = require('express');
const router = express.Router();

router
    .get('/', (req, res, next) => {
        res.status(200).json({
            message: 'GET request to /questions'
        });
    })
    .post('/', (req, res, next) => {
        res.status(201).json({
            message: 'POST request to /questions'
        });
    })
    .get('/:questionId', (req, res, next) => {
        res.status(200).json({
            message: 'GET request to /questions/' + req.params.questionId
        });
    })
    .delete('/:questionId', (req, res, next) => {
        res.status(200).json({
            message: 'DELETE request to /questions/' + req.params.questionId
        });
    })
    .patch('/:questionId', (req, res, next) => {
        res.status(200).json({
            message: 'PATCH request to /questions/' + req.params.questionId
        });
    });

module.exports = router;
