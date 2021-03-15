"use strict";

const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require("morgan")
const itemsRoutes = require('./routes/api/items_routes');
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger("dev"));

app.get('/api', (req, res) => res.send('API Running'));
app.use('/api/items', itemsRoutes);


module.exports = app;