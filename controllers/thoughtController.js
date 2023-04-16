const { Thought, User } = require("../models");

module.exports = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((posts) => res.json(posts))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get a single thought by its _id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this id" })
          : res.json(thought)
      )
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((result) => {
        let userId = req.body.userId;
        return User.findOneAndUpdate(
          { _id: userId },
          { $push: { thoughts: result._id } },
          { new: true }
        );
      })
      .then((userData) => {
        !userData
          ? res.status(404).json({
              message: "Thought created but no user found with this id!",
            })
          : res.json(userData);
      })
      .catch((err) => {
        console.log("error:", err);
        res.status(500).json(err);
      });
  },
  // update a thought by its _id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
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
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No thought with this id" })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};
