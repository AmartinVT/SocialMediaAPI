const router = require('express').Router();

// Variable of responses from thoughtController.js
const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// GET and POST all route
router.route('/')
    .get(getThought)
    .post(createThought);

// GET and PUT and DELETE by ID route
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

//  POST reaction route
router.route('/:thoughtId/reactions')
    .post(createReaction);

// DELETE reaction route
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;