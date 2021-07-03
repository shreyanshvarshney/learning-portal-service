const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('app:server.js');
const dotenv = require('dotenv');

const app = express();

// Loading env varaibles
dotenv.config({path: './config/config.env'});

if (process.env.NODE_ENV === 'development') {
    debug('Enabling morgan request logger...');
    app.use(morgan('dev'));
}

app.get('/', (req, res, next) => {
    res.status(200).json({status: 'ok'});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, debug(`Server running in ${process.env.NODE_ENV} mode and listening on port ${PORT}...`));