const { Schema, model } = require("mongoose");
// const dateFormat = require("../utils/dateFormat");
// const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Date, default: Date.now },
    // note to self: you kind of went against the class code, so if something fails, look here lol
    username: { type: String, required: false },
    // reactions: [{ type: Schema.Types.ObjectId, ref: "Reaction" }],
  },
  {
    toJSON: {
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
