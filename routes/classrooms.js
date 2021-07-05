const router = require('express').Router();
const {
    getClassroom,
    getClassrooms,
    updateClassroom,
    createClassroom,
    deleteClassroom,
    getClassroomsWithinRadius
} = require('../controllers/classrooms');

router.get('/', getClassrooms);

router.get('/:id', getClassroom);

router.post('/', createClassroom);

router.put('/:id', updateClassroom);

router.delete('/:id', deleteClassroom);

router.get('/withinradius/:zipcode/:distance', getClassroomsWithinRadius);

// A more cleaner way to define routes.
// router.route('/').get(getClassrooms).post(createClassroom);
// router.route('/:id').get(getClassroom).put(updateClassroom).delete(deleteClassroom);

module.exports = router;