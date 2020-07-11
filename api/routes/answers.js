const express = require('express');
const router = express.Router();

router
    .get('/', (req, res, next) => {
        res.status(200).json({
            message: 'GET request to /answers'
        });
    })
    .post('/', (req, res, next) => {
        res.status(201).json({
            message: 'POST request to /answers'
        });
    })
    .get('/:answerId', (req, res, next) => {
        res.status(200).json({
            message: 'GET request to /answers/' + req.params.answerId
        });
    })
    .delete('/:answerId', (req, res, next) => {
        res.status(200).json({
            message: 'DELETE request to /answers/' + req.params.answerId
        });
    })
    .patch('/:answerId', (req, res, next) => {
        res.status(200).json({
            message: 'PATCH request to /answers/' + req.params.answerId
        });
    });

module.exports = router;
