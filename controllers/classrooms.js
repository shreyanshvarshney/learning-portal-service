const Classroom = require('../models/Classroom');
const debug = require('debug')('app:classroom.controller');

/** @type RequestHandler */
exports.getClassrooms = async (req, res, next)  => {
    try {
        const classrooms = await Classroom.find();
        res.status(200).json({success: true, data: classrooms, count: classrooms.length});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

// @route  GET /api/classrooms/:id
/** @type RequestHandler */
exports.getClassroom = async (req, res, next)  => {
    try {
        const classroom = await Classroom.findById(req.params.id);
        if (!classroom) return res.status(400).json({success: false, message: "Classroom not exsits with id"});
        res.status(200).json({success: true, data: classroom});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

/** @type RequestHandler */
exports.createClassroom = async (req, res, next)  => {
    try {
        const classroom = await Classroom.create(req.body);
        res.status(201).json({success: true, data: classroom});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

// @route   PUT /api/classrooms/:id
/** @type RequestHandler */
exports.updateClassroom = async (req, res, next)  => {
    try {
        const classroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!classroom) return res.status(400).json({success: false, message: "Classroom not exsits with id"});
    
        res.status(200).json({success: true, data: classroom});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

// @route   DELETE /api/classrooms/:id
/** @type RequestHandler */
exports.deleteClassroom = async (req, res, next)  => {
    try {
        const classroom = await Classroom.findByIdAndDelete(req.params.id);
        if (!classroom) return res.status(400).json({success: false, message: "Classroom not exsits with id"});
    
        res.status(200).json({success: true, data: classroom});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}