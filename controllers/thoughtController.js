const { Thought, User } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
      .then((posts) => res.json(posts))
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

  // createThought(req, res) {
  //   console.log("req.body", req.body);
  //   Thought.create(req.body)
  //     .then(({ thought }) => {
  //       let userId = req.body.userId;
  //       return User.findOneAndUpdate(
  //         { _id: userId },
  //         { $push: { thoughts: thought._id } },
  //         { new: true }
  //       );
  //     })
  //     .then((userData) => {
  //       console.log("userData", userData);
  //       !userData
  //         ? res.status(404).json({
  //             message: "Thought created but no user found with this id!",
  //           })
  //         : res.json(userData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // },

  createThought(req, res) {
    console.log("req.body", req.body);
    Thought.create(req.body)
      .then((result) => {
        console.log("result", result);
        let userId = req.body.userId;
        return User.findOneAndUpdate(
          { _id: userId },
          { $push: { thoughts: result._id } },
          { new: true }
        );
      })
      .then((userData) => {
        console.log("userData", userData);
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

  updateThought(req, res) {
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
