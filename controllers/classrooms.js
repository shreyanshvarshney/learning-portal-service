const Classroom = require('../models/Classroom');
const debug = require('debug')('app:classroom.controller');

const ErrorResponse = require('../utils/errorResponse');

/** @type RequestHandler */
exports.getClassrooms = async (req, res, next)  => {
    try {
        const classrooms = await Classroom.find();
        res.status(200).json({success: true,  count: classrooms.length, data: classrooms});
    } catch (error) {
        next(error);
    }
}

// @route  GET /api/classrooms/:id
/** @type RequestHandler */
exports.getClassroom = async (req, res, next)  => {
    try {
        const classroom = await Classroom.findById(req.params.id);
        // if (!classroom) return res.status(400).json({success: false, message: "Classroom not exsits with id"});
        if (!classroom) return next(new ErrorResponse(`Resource not found with this id ${req.params.id}`, 404));
        res.status(200).json({success: true, data: classroom});
    } catch (error) {
        next(error);
    }
}

/** @type RequestHandler */
exports.createClassroom = async (req, res, next)  => {
    try {
        const classroom = await Classroom.create(req.body);
        res.status(201).json({success: true, data: classroom});
    } catch (error) {
        // res.status(400).json({success: false, message: error.message});
        next(error);
    }
}

// @route   PUT /api/classrooms/:id
/** @type RequestHandler */
exports.updateClassroom = async (req, res, next)  => {
    try {
        const classroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!classroom) return next(new ErrorResponse(`Resource not found with this id ${req.params.id}`, 404));
    
        res.status(200).json({success: true, data: classroom});
    } catch (error) {
        next(error);
    }
}

// @route   DELETE /api/classrooms/:id
/** @type RequestHandler */
exports.deleteClassroom = async (req, res, next)  => {
    try {
        const classroom = await Classroom.findByIdAndDelete(req.params.id);
        if (!classroom) return next(new ErrorResponse(`Resource not found with this id ${req.params.id}`, 404));
    
        res.status(200).json({success: true, data: classroom});
    } catch (error) {
        next(error);
    }
}