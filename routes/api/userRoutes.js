const router = require('express').Router();

// Variable of responses from userController.js
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// GET and POST all route
router.route('/')
    .get(getUsers)
    .post(createUser);

// GET and PUT and DELETE by ID route
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

//  POST friend route
router.route('/:userId/friends')
    .post(addFriend);

// DELETE friend route
router.route('/:userId/friends/:userId')
    .delete(deleteFriend);

module.exports = router;