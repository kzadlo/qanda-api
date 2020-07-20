const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./api/middlewares/cors');
const error404 = require('./api/middlewares/404');
const errorHandler = require('./api/middlewares/error-handler');
const morgan = require('morgan');
const userRoutes = require('./api/routes/users');
const questionRoutes = require('./api/routes/questions');
require('dotenv').config();
const answerRoutes = require('./api/routes/answers');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors);

app.use('/users', userRoutes);
app.use('/questions', questionRoutes);
app.use('/answers', answerRoutes);

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use(error404);
app.use(errorHandler);

module.exports = app;