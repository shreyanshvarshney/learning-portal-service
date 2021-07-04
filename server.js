const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('app:server');
const dotenv = require('dotenv');

const app = express();
const connectMongodb = require('./config/db');
const colors = require('./utils/colors-config');
const errorHandler = require('./middlewares/error');

// Route files
const classroomsRoutes = require('./routes/classrooms');

// Loading env varaibles
dotenv.config({path: './config/config.env'});

// Database Connection
connectMongodb();

// Middlewares
if (process.env.NODE_ENV === 'development') {
    colors.enable();

    debug('Enabling morgan request logger...'.info);
    app.use(morgan('dev'));
}

// Request body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res, next) => {
    res.status(200).json({status: 'ok'});
});

app.use('/api/classrooms', classroomsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, debug(`Server running in ${process.env.NODE_ENV} mode and listening on port ${PORT}...`.warn.bold.italic));

// Global Error Handling
server.on("close", () => {debug('Server Closed.')});

process.on('unhandledRejection', (error) => {
    debug(`Got an Unhandled Promise Rejection: ${error.message}`.error);
    server.close();
    process.exit(1);
});

process.on('uncaughtException', (exception) => {
    debug(`Got an Uncaught Exception: ${exception.message}`.error);
    server.close();
    process.exit(1);
});