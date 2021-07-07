const Classroom = require('../models/Classroom');
const debug = require('debug')('app:classroom.controller');

const {validatePaginationParams} = require('../validations/classroom');
const ErrorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');

/** @type RequestHandler */
exports.getClassrooms = async (req, res, next)  => {
    try {
        let query = Classroom.find();

        // Select Particular fields
        const select = req.query.select;
        console.log(select, typeof select);
        if (select) {
            let selectArray;
            try {
                selectArray = JSON.parse(req.query.select);
            } catch (error) {
                return next(new ErrorResponse(`Please provide valid query param values for selection`, 400));
            }
            if (selectArray.length > 0) {
                query.select(selectArray);
            }
        }

        // Pagination
        const pageSize = +req.query.pageSize;
        const pageIndex = +req.query.pageIndex;
        let pagination = {};
        if (pageSize && pageIndex) {
            if (!validatePaginationParams(pageSize, pageIndex)) return next(new ErrorResponse(`Please provide valid query param values for pagination`, 400));
            const endIndex = pageSize * pageIndex;
            const startIndex = pageSize * (pageIndex - 1);
            const total = await Classroom.countDocuments();
            const indexCount = Math.floor(total / pageSize);
            query.limit(pageSize).skip(startIndex);
            if (pageIndex < indexCount) {
                pagination.next = {
                    pageIndex: pageIndex + 1,
                    pageSize
                }
            }
            if (startIndex > 0) {
                pagination.prev = {
                    pageIndex: pageIndex - 1,
                    pageSize
                }
            }
        }

        // Sorting
        const sort = req.query.sort;
        if (sort) {
            let sortArray;
            try {
                sortArray = JSON.parse(req.query.sort);
            } catch (error) {
                return next(new ErrorResponse(`Please provide valid query param values for sorting`, 400));
            }
            if (sortArray.length > 0) {
                const sortedFields = sortArray.join(' ');
                query.sort(sortedFields);
            }
        } else {
            query.sort('-createdAt');
        }

        // Executing query
        const classrooms = await query;
        res.status(200).json({success: true, count: classrooms.length, pagination, data: classrooms});
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

// @route  GET /api/classrooms/withinradius/:zipcode/:distance
/** @type RequestHandler */
exports.getClassroomsWithinRadius = async (req, res, next)  => {
    try {
        const zipcode = +req.params.zipcode;
        const distance = +req.params.distance;

        // Getting lat lng from node-geocoder
        const loc = await geocoder.geocode(zipcode);
        const lat = loc[0].latitude;
        const lng = loc[0].longitude;

        // Earth radius in 6371 km
        // dividing the distance by radius of earth
        const radius = distance / 6371;
        const filterQuery = {
            location: {
                $geoWithin: {
                    $centerSphere: [[lng, lat], radius]
                }
            }
        };
        const classrooms = await Classroom.find(filterQuery);
        res.status(200).json({success: true, count: classrooms.length, data: classrooms});
    } catch (error) {
        next(error);
    }
}