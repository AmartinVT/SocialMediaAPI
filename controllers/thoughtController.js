const { User, Thought } = require('../models/User');

module.exports = {
  // Requests all thoughts
  getThought(req, res) {
    User.find()
      .then((thought) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  
  // Requests one thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought foundd with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: req.body.userID },
                { $push: {thoughts: _id} },
                { new: true }
            );
        })
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No user found with this ID!'})
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
  },

  // Update one thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
   },

  //Add one friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  // Delete one thought
  deleteThought(req, res) {
    Thought.findOneAndDelete(
      { _id: req.params.thoughtId },
      { $pull: { thought: req.params.thoughtId } },
      { new: true }
    )
      .then(
        (thought) =>
          !thought
            ? res.status(404).json({ message: "No thought found with this ID!" })
            : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtID },
        { $addToSet: { reactions: req.body }},
        { runValidators: true, new: true }
    )
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No thought found with this ID!'})
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
  },

    // Delete a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought found with this ID!'})
                : res.json(thought)
                )
                .catch((err) => res.status(500).json(err));
      },

};