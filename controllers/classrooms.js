const debug = require('debug')('app:classroom.controller');

/** @type RequestHandler */
exports.getClassrooms = (req, res, next)  => {
    debug({success: true, data: null});
    res.status(200).json({success: true, data: null});
}

// @route  GET /api/classrooms/:id
/** @type RequestHandler */
exports.getClassroom = (req, res, next)  => {
    res.status(200).json({success: true, data: null});
}

/** @type RequestHandler */
exports.createClassroom = (req, res, next)  => {
    res.status(200).json({success: true, data: null});
}

// @route   PUT /api/classrooms/:id
/** @type RequestHandler */
exports.updateClassroom = (req, res, next)  => {
    res.status(200).json({success: true, data: null});
}

// @route   DELETE /api/classrooms/:id
/** @type RequestHandler */
exports.deleteClassroom = (req, res, next)  => {
    res.status(200).json({success: true, data: null});
}