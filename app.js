const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./api/middlewares/cors');
const error404 = require('./api/middlewares/404');
const errorHandler = require('./api/middlewares/error-handler');
const auth = require('./api/middlewares/auth');
const morgan = require('morgan');
const userRoutes = require('./api/routes/users');
const questionRoutes = require('./api/routes/questions');
const answerRoutes = require('./api/routes/answers');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors);

app.use('/users', userRoutes);
app.use('/questions', auth, questionRoutes);
app.use('/answers', auth, answerRoutes);

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