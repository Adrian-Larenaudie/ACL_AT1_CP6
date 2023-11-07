require('dotenv').config();
const debug = require('debug')('app:server');
const path = require('path');
const express = require('express');
const router = require('./app/routers');

const port = process.env.PORT || 4000;

const app = express();

app.set('trust proxy', true);

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());

app.use(router);

app.listen(port, () => {
  debug(`Server ready: http://localhost:${port}`);
});
