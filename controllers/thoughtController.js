const { Thought, User } = require("../models");
const mongoose = require("mongoose");
const reactionSchema = require("../models/Reaction");

const Reaction = mongoose.model("Reaction", reactionSchema);

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
  // deletes a thought by id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No thought with this id" })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
  // add a reaction to a thought
  addReaction(req, res) {
    const { reactionBody, username } = req.body;
    const newReaction = { reactionBody, username };

    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: newReaction } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "No thought with this id" });
        }
        res.json(thought);
      })
      .catch((err) => {
        console.log("error:", err);
        res.status(500).json(err);
      });
  },
  // remove a reaction from a thought
  // /api/thoughts/:thoughtId/reactions
  removeReaction(req, res) {
    Reaction.findOneAndDelete({ _id: req.body.reactionId })
      // make sure the above can actually work, 1 hour limit and then just take the video and submit
      // the only other thing I can think of is to change the route
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No thought with this id" })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};
