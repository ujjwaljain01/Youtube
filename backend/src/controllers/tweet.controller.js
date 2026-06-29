import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Tweet } from "../models/tweet.model.js";
import mongoose from "mongoose";

const ensureValidTweet = (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid tweet id");
  }
};

// router.route("/").post(createTweet);
const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body || {};

  if (!req.user?._id) {
    throw new ApiError(401, "Authentication required to create a tweet");
  }

  if (!content || typeof content !== "string" || content.trim() === "") {
    throw new ApiError(400, "Tweet content is required");
  }

  const trimmedContent = content.trim();

  if ([...trimmedContent].length > 320) {
    throw new ApiError(400, "Tweet content cannot exceed 320 characters");
  }
  const tweet = await Tweet.create({
    content: trimmedContent,
    owner: req.user?._id,
  });

  if (!tweet) {
    throw new ApiError(500, "Failed to create tweet due to a DB server error");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, tweet, "Tweet created successfully"));
});

// router.route("/:tweetId").patch(updateTweet)
const updateTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!req.user?._id) {
    throw new ApiError(401, "Authentication required to update a tweet");
  }

  ensureValidTweet(tweetId);

  const { content } = req.body || {};

  if (!content || typeof content !== "string" || content.trim() === "") {
    throw new ApiError(400, "Tweet content is required");
  }

  let trimmedContent = content.trim();

  if ([...trimmedContent].length > 320) {
    throw new ApiError(400, "Tweet content cannot exceed 320 characters");
  }

  const updatedTweet = await Tweet.findByIdAndUpdate(
    { _id: tweetId, owner: req.user?._id },
    {
      $set: { content: trimmedContent },
    },
    { new: true, runValidators: true }
  );

  if (!updatedTweet) {
    const tweetExists = await Tweet.findById(tweetId);

    if (!tweetExists) {
      throw new ApiError(404, "Tweet not found");
    }

    throw new ApiError(403, "You do not have permission to update this tweet");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedTweet, "Tweet updated successfully"));
});

// router.route("/:tweetId").delete(deleteTweet)
const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  console.log(tweetId);

  if (!req.user?._id) {
    throw new ApiError(401, "Authentication required to delete a tweet");
  }

  ensureValidTweet(tweetId);

  const deletedRes = await Tweet.deleteOne({
    _id: tweetId,
    owner: req.user._id,
  });

  if (deletedRes.deletedCount === 0) {
    const tweetExists = await Tweet.findById(tweetId);

    if (!tweetExists) {
      throw new ApiError(404, "Tweet not found");
    }

    throw new ApiError(403, "You do not have permission to delete this tweet");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Tweet deleted successfully"));
});

// router.route("/user/:userId").get(getUserTweets)
const getUserTweets = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!req.user?._id) {
    throw new ApiError(401, "Authentication required to fetch user tweets");
  }

  if (!mongoose.isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user id");
  }

  const currentCursor = req.query.nextCursor;
  const limit = Math.min(100, parseInt(req.query.limit) || 10);

  // 2. Build the query dynamically
  let query = { owner: req.user._id };
  if (currentCursor) {
    // Only fetch tweets older than the last one the user saw
    query._id = { $lt: currentCursor };
  }

  // 3. Fetch one extra item to check if there is a next page
  const tweets = await Tweet.find(query)
    .sort({ _id: -1 }) // Newest first
    .limit(limit + 1) // Fetch 11 items if limit is 10
    .lean();

  // 4. Determine if more items exist
  const hasNextPage = tweets.length > limit;
  if (hasNextPage) {
    tweets.pop(); // Remove the extra 11th item kept for verification
  }

  const nextCursor = hasNextPage ? tweets[tweets.length - 1]._id : null;

  if (!tweets) {
    throw new ApiError(
      500,
      "Failed to fetch user tweets due to a DB server error"
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        tweets, // The array of tweet documents
        pagination: {
          nextCursor: nextCursor, // The ID of the last tweet in this batch, or null
          hasNextPage: hasNextPage, // True if there are more tweets to fetch, false if done
          limit: limit, // How many items were requested
        },
      },
      "User tweets fetched successfully"
    )
  );
});

const getTweetById = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!req.user?._id) {
    throw new ApiError(401, "Authentication required to update a tweet");
  }

  ensureValidTweet(tweetId);

  const tweet = await Tweet.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(tweetId) },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
        pipeline: [
          {
            $project: {
              avatar: 1,
              username: 1,
              _id: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        owner: { $first: "$ownerDetails" },
      },
    },
    {
      $project: {
        ownerDetails: 0,
      },
    },
  ]);

  if (!tweet || tweet.length === 0) {
    throw new ApiError(404, "Tweet not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweet fetched successfully"));
});

export { createTweet, updateTweet, deleteTweet, getUserTweets, getTweetById };
