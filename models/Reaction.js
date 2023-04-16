const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dateFormat = require("../utils/dateFormat");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: [{ type: String, required: true }],
    createdAt: [
      {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
