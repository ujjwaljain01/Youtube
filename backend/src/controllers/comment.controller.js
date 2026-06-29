import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";
import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.isValidObjectId(id);

const getComments = asyncHandler(async (req, res) => {
  const { targetId } = req.params;
  const { limit = 10, cursor } = req.query;

  if (!isValidObjectId(targetId)) {
    throw new ApiError(400, "Invalid target ID");
  }

  const [videoExists, tweetExists] = await Promise.all([
    Video.exists({ _id: targetId }),
    Tweet.exists({ _id: targetId }),
  ]);

  if (!videoExists && !tweetExists) {
    throw new ApiError(404, "Video or Tweet not found");
  }

  const parsedLimit = parseInt(limit, 10);

  const matchStage = {
    targetId: new mongoose.Types.ObjectId(targetId),
    parentCommentId: null,
  };

  if (cursor) {
    matchStage.createdAt = {
      $lt: new Date(cursor),
    };
  }

  const aggregationPipeline = [
    {
      $match: matchStage,
    },
    { $sort: { createdAt: -1 } },
    { $limit: parsedLimit + 1 },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    {
      $unwind: "$owner",
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "parentCommentId",
        as: "replies",
      },
    },
    {
      $project: {
        _id: 1,
        content: 1,
        targetType: 1,
        createdAt: 1,
        updatedAt: 1,
        replyCount: { $size: "$replies" },
        owner: {
          _id: "$owner._id",
          username: "$owner.username",
          avatar: "$owner.avatar",
        },
      },
    },
  ];

  const comments = await Comment.aggregatePaginate(
    Comment.aggregate(aggregationPipeline)
  );

  const hasNextPage = comments.length > parsedLimit;

  if (hasNextPage) {
    comments.pop();
  }

  const nextCursor =
    comments.length > 0 ? comments[comments.length - 1].createdAt : null;

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { comments, nextCursor, hasNextPage },
        "Comments fetched successfully"
      )
    );
});

const getReplies = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { limit = 10, cursor } = req.query;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  const parentCommentExists = await Comment.exists({ _id: commentId });
  if (!parentCommentExists) {
    throw new ApiError(404, "Parent comment not found");
  }

  const matchStage = {
    parentCommentId: new mongoose.Types.ObjectId(commentId),
  };

  if (cursor) {
    matchStage.createdAt = { $lt: new Date(cursor) };
  }

  const parsedLimit = parseInt(limit, 10);

  const aggregationPipeline = [
    { $match: matchStage },
    { $sort: { createdAt: 1 } }, 
    { $limit: parsedLimit + 1 },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    { $unwind: "$owner" },
    {
      $project: {
        _id: 1,
        content: 1,
        createdAt: 1,
        updatedAt: 1,
        owner: {
          _id: "$owner._id",
          username: "$owner.username",
          avatar: "$owner.avatar",
        },
      },
    },
  ];

  const results = await Comment.aggregate(aggregationPipeline);

  const hasNextPage = results.length > parsedLimit;
  
  if (hasNextPage) {
    results.pop();
  }

  const nextCursor =
    results.length > 0 ? results[results.length - 1].createdAt : null;

  res.status(200).json(
    new ApiResponse(
      200,
      {
        replies: results,
        nextCursor,
        hasNextPage,
      },
      "Replies fetched successfully"
    )
  );
});


const addComment = asyncHandler(async (req, res) => {
  const { targetId } = req.params;
  const { content } = req.body;
  const userId = req.user?._id;

  if (!content || content.trim().length === 0) {
    throw new ApiError(400, "Comment content is required");
  }

  const trimmedContent = content.trim();

  if ([...trimmedContent].length > 320) {
    throw new ApiError(400, "Comment content cannot exceed 320 characters");
  }

  if (!targetId || !isValidObjectId(targetId)) {
    throw new ApiError(400, "A valid Target ID is required");
  }

  const [videoExists, tweetExists, parentComment] = await Promise.all([
    Video.exists({ _id: targetId }),
    Tweet.exists({ _id: targetId }),
    Comment.findById(targetId).select("_id parentCommentId"), 
  ]);

  if (!videoExists && !tweetExists && !parentComment) {
    throw new ApiError(404, "Target video, tweet, or comment not found");
  }

  let targetType;
  let parentCommentId = null;

  if (videoExists) {
    targetType = "Video";
  } else if (tweetExists) {
    targetType = "Tweet";
  } else if (parentComment) {
    targetType = "Comment";
    
    // Prevent infinite nesting: If the parent itself is a reply, 
    // lock this reply to the topmost comment thread.
    parentCommentId = parentComment.parentCommentId || parentComment._id;
  }

  const comment = await Comment.create({
    content: trimmedContent,
    targetId,
    targetType,
    owner: userId,
    parentCommentId, 
  });

  await comment.populate({
    path: "owner",
    select: "username avatar",
  });

  const successMessage = parentComment ? "Reply added successfully" : "Comment added successfully";

  return res
    .status(201)
    .json(new ApiResponse(201, comment, successMessage));
});


const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  if (
    !content ||
    typeof content !== "string" ||
    content.trim().length === 0
  ) {
    throw new ApiError(400, "Comment content is required");
  }

  const trimmedContent = content.trim();

  if ([...trimmedContent].length > 320) {
    throw new ApiError(400, "Comment content cannot exceed 320 characters");
  }

  const comment = await Comment.findByIdAndUpdate(
    { _id: commentId, owner: req.user?._id },
    {
      $set: { content: trimmedContent },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!comment) {
    const commentExist = await Comment.exists({ _id: commentId });
    if (!commentExist) {
      throw new ApiError(404, "Comment not found");
    }
    throw new ApiError(403, "You can only update your own comments");
  }

  const updatedComment = await comment.populate([
    {
      path: "owner",
      select: "username avatar",
    },
  ]);

  res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user?._id;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  const comment = await Comment.findByIdAndDelete({
    _id: commentId,
    owner: userId,
  });

  if (!comment) {
    const commentExists = await Comment.exists({ _id: commentId });

    if (!commentExists) {
      throw new ApiError(404, "Comment not found");
    }

    throw new ApiError(403, "You can only delete your own comments");
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment deleted successfully"));
});




export { addComment, deleteComment, getComments, updateComment, getReplies };
