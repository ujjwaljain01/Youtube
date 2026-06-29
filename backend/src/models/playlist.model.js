import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    description: {
      type: String,
      required: true,
      maxLength: 500,
    },
    videos: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
      default: [],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

playlistSchema.index({ name: 1, owner: 1 }, { unique: true });

export const Playlist = new mongoose.model("Playlist", playlistSchema);
