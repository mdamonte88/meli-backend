"use strict";

const express = require('express');
const connectDB = require('./config/db');
const app = express();
const bodyParser = require('body-parser');
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = app;