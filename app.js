const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./api/middlewares/cors');
const error404 = require('./api/middlewares/404');
const errorHandler = require('./api/middlewares/error-handler');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors);

const questionRoutes = require('./api/routes/questions');
app.use('/questions', questionRoutes);

const answerRoutes = require('./api/routes/answers');
app.use('/answers', answerRoutes);

app.use(error404);
app.use(errorHandler);

module.exports = app;