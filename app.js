"use strict";

import express from 'express';
import connectDB from './config/db';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import itemsRoutes from './routes/api/items_routes';

const app = express();
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger("dev"));

app.get('/api', (req, res) => res.send('API Running'));
app.use('/api/items', itemsRoutes);

module.exports = app;