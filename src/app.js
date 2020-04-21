const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', require('./routes'));
app.use(errors());

module.exports  = app;