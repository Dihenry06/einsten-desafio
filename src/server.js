const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(express.json());
app.use(cors());
app.use('/', require('./routesviews'));
app.use('/api', require('./routes'));
app.use(errors());

app.listen(3333);