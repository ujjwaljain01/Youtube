import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    likedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetType: {
      type: String,
      enum: ["Video", "Comment", "Tweet"],
      required: true,
    },
    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

likeSchema.index({ targetType: 1, targetId: 1, likedBy: 1 }, { unique: true });

likeSchema.index({ targetId: 1, targetType: 1 });

export const Like = mongoose.model("Like", likeSchema);
