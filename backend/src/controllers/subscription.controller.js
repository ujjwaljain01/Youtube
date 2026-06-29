import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { Subscription } from "../models/subscription.model.js";

const ensureValidObject = (id, name = "id") => {
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, `Invalid ${name}`);
  }
};

const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  ensureValidObject(channelId, "channel id");

  const subscribedTo = await Subscription.aggregate([
    {
      $match: { subscriber: new mongoose.Types.ObjectId(channelId) },
    },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "channelDetails",
      },
    },
    {
      $unwind: {
        path: "$channelDetails",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $project: {
        _id: "$channelDetails._id",
        channelName: "$channelDetails.fullName",
        channelAvatar: "$channelDetails.avatar",
      },
    },
  ]);

  if (!subscribedTo || subscribedTo.length === 0) {
    throw new ApiError(404, "No subscriptions found for this channel");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscribedTo,
        "Subscribed channels retrieved successfully"
      )
    );
});

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  ensureValidObject(channelId, "channel id");

  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, Math.min(100, parseInt(req.query.limit) || 10));
  const skip = (page - 1) * limit;

  const subscribersData = await Subscription.aggregate([
    {
      $match: { channel: new mongoose.Types.ObjectId(channelId) },
    },

    {
      $facet: {
        metaData: [{ $count: "subscribersCount" }],
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
          {
            $lookup: {
              from: "users",
              localField: "subscriber",
              foreignField: "_id",
              pipeline: [
                {
                  $project: {
                    _id: 1,
                    username: 1,
                    fullName: 1,
                    avatar: 1,
                  },
                },
              ],
              as: "subscriberDetails",
            },
          },
          {
            $replaceRoot: {
              newRoot: { $arrayElemAt: ["$subscriberDetails", 0] },
            },
          },
        ],
      },
    },
  ]);

  const totalSubscribers =
    subscribersData[0]?.metaData[0]?.subscribersCount || 0;

  const subscribers = subscribersData[0]?.data || [];

  if (totalSubscribers === 0 || subscribers.length === 0) {
    throw new ApiError(404, "No subscribers found for this channel");
  }

  res.status(200).json(
    new ApiResponse(
      200,
      {
        subscribers,
        pagination: {
          totalSubscribers,
          currentPage: page,
          totalPages: Math.ceil(totalSubscribers / limit),
          limit,
        },
      },
      "Channel subscribers retrieved successfully"
    )
  );
});

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const subscriberId = req.user?._id;

  ensureValidObject(channelId, "channel id");
  ensureValidObject(subscriberId, "subscriber id");

  if (channelId.toString() === subscriberId.toString()) {
    throw new ApiError(400, "You cannot subscribe to yourself");
  }

  const existingSubscription = await Subscription.findOne({
    subscriber: subscriberId,
    channel: new mongoose.Types.ObjectId(channelId),
  });

  if (existingSubscription) {
    await existingSubscription.deleteOne();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { channelId, subscribed: false },
          "Unsubscribed successfully"
        )
      );
  }

  const subscription = await Subscription.create({
    subscriber: subscriberId,
    channel: new mongoose.Types.ObjectId(channelId),
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { subscription, subscribed: true },
        "Subscribed successfully"
      )
    );
});

export { getSubscribedChannels, getUserChannelSubscribers, toggleSubscription };
