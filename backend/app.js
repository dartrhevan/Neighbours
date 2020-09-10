if(!process.env.DEPLOYMENT)
    require('dotenv').config();

if(process.env.FILL_DB) {
    require('./workers/fillDB')
}
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION_URL, {useNewUrlParser: true,  useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

const pointRouter = require('./routes/point');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/point', pointRouter);

module.exports = app;
