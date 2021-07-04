const debug = require('debug')('app:error.middleware');
const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    // Debug for dev
    debug('Global Error Handler Middleware Reached...'.warn);
    // debug(`${err.stack}`.error);
    // debug(err);

    let error = {...err};
    error.message = err.message;

    // Error handling for Invalid Mongo Object Id
    if (err.name === 'CastError') {
        const message = `Resource not found with this id ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // Error Handling for duplicate key error
    if (err.name === 'MongoError' && err.code === 11000) {
        const message = `Duplicate value are not allowed for ${JSON.stringify(err.keyValue)}`;
        error = new ErrorResponse(message, 409);
    }

    // Error Handling for validation errors
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(value => value.properties.message);
        debug(messages);
        error = new ErrorResponse(messages, 400);
    }

    res.status(error.statusCode || 500).json({success: false, message: error.message || 'Internal Server Error'});
}

module.exports = errorHandler;