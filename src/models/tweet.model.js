import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxLength: 320,
    },
  },
  { timestamps: true }
);

tweetSchema.index({ owner: 1, createdAt: -1 });

export const Tweet = new mongoose.model("Tweet", tweetSchema);
