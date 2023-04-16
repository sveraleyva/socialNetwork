const { Thought, User } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this id" })
          : res.json(thought)
      )
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then(({ thought }) => {
        return User.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => {
        !user
          ? res.status(404).json({
              message: "Thought created but no user found with this id!",
            })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  updateThough(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.body.userId },
      { runValidators: true, new: true }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No thought with this id" })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No thought with this id" })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};
