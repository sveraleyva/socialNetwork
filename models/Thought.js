const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const moment = require("moment");

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (timestamp) {
        return moment(timestamp).format("YYYY-MM-DD");
      },
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

// Virtual for thought's reaction count
// thoughtSchema.virtual("reactionCount").get(function () {
//   return this.reactions.length;
// });

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
