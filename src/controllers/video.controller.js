import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import {
  deleteFromCloudinary,
  uploadLargeOnCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import Ffmpeg from "fluent-ffmpeg";
import ffprobeInstaller from "@ffprobe-installer/ffprobe";
import fs from "fs";

const ensureValidVideoId = (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid video id");
  }
};

const ensureOwner = (video, userId) => {
  if (!video.owner || video.owner.toString() !== userId?.toString()) {
    throw new ApiError(403, "You are not allowed to modify this video");
  }
};

const getVideoDuration = (localfilePath) => {
  return new Promise((resolve, reject) => {
    Ffmpeg.setFfprobePath(ffprobeInstaller.path);
    Ffmpeg.ffprobe(localfilePath, (err, metadata) => {
      if (err) return reject(err);

      const duration = metadata?.format?.duration;

      if (!duration) {
        return reject(new Error("could not read duration metadata from file"));
      }

      resolve(duration);
    });
  });
};

const cleanupUpload = async (upload, resourceType) => {
  if (upload?.public_id) {
    await deleteFromCloudinary(upload.public_id, resourceType);
  }
};

// router.route("/").post(verifyJWT, upload.fields([{name:"video",maxCount:1},{name:"thumbnail",maxCount:1}]), publishVideo)
const publishVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body || {};
  const videoFile = req.files?.video?.[0];
  const thumbnailFile = req.files?.thumbnail?.[0];

  if (
    typeof title !== "string" ||
    title.trim() === "" ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    throw new ApiError(400, "Title and description are required");
  }

  if (!videoFile || !thumbnailFile) {
    throw new ApiError(400, "Video and thumbnail files are required");
  }

  const duration = await getVideoDuration(videoFile.path);

  if (!duration) {
    throw new ApiError(400, "Could not read video duration");
  }

  const [videoResult, thumbnailResult] = await Promise.allSettled([
    uploadLargeOnCloudinary(videoFile.path, "video"),
    uploadOnCloudinary(thumbnailFile.path, "thumbnail"),
  ]);

  if (
    videoResult.status === "rejected" ||
    thumbnailResult.status === "rejected"
  ) {
    if (videoResult.status === "fulfilled") {
      await cleanupUpload(videoResult.value, "video");
    }
    if (thumbnailResult.status === "fulfilled") {
      await cleanupUpload(thumbnailResult.value, "image");
    }
    throw new ApiError(500, "Failed to upload video assets");
  }

  const uploadedVideo = videoResult.value;
  const uploadedThumbnail = thumbnailResult.value;

  try {
    const video = await Video.create({
      videoFile: uploadedVideo.secure_url,
      videoPublicId: uploadedVideo.public_id,
      Thumbnail: uploadedThumbnail.secure_url,
      thumbnailPublicId: uploadedThumbnail.public_id,
      owner: req.user._id,
      title: title.trim(),
      description: description.trim(),
      duration: duration,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, video, "Video published successfully"));
  } catch (error) {
    await Promise.all([
      cleanupUpload(uploadedVideo, "video"),
      cleanupUpload(uploadedThumbnail, "image"),
    ]);
    throw new ApiError(500, "Failed to publish video", error.message);
  }
});

// router.route("/:id").get(getVideoById)
const getVideoById = asyncHandler(async (req, res) => {
  ensureValidVideoId(req.params.id);

  const video = await Video.findById(req.params.id);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully"));
});

// router.route("/").get(getAllVideos)
const getAllVideos = asyncHandler(async (req, res) => {
  const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(
    Math.max(Number.parseInt(req.query.limit, 10) || 10, 1),
    100
  );

  const aggregate = Video.aggregate([
    { $match: { isPublished: true } },
    { $sort: { createdAt: -1 } },
  ]);

  const videos = await Video.aggregatePaginate(aggregate, { page, limit });

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Videos fetched successfully"));
});

// router.route("/:id/assets").patch()
const updateVideoAssets = asyncHandler(async (req, res) => {
  ensureValidVideoId(req.params.id);

  const videoFile = req.files?.video?.[0];
  const thumbnailFile = req.files?.thumbnail?.[0];

  if (!videoFile && !thumbnailFile) {
    throw new ApiError(
      400,
      "Provide either a video file or a thumbnail to update"
    );
  }

  const video = await Video.findById(req.params.id);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  ensureOwner(video, req.user?._id);

  let uploadedVideo = null;
  let uploadedThumbnail = null;
  const oldVideoPublicId = video.videoPublicId;
  const oldThumbnailPublicId = video.thumbnailPublicId;

  try {
    if (videoFile) {
      const duration = await getVideoDuration(videoFile.path);

      uploadedVideo = await uploadLargeOnCloudinary(videoFile.path, "video");
      if (!uploadedVideo) {
        throw new ApiError(500, "Failed to upload video file to Cloudinary");
      }

      video.videoFile = uploadedVideo.secure_url;
      video.videoPublicId = uploadedVideo.public_id;
      video.duration = duration;
    }

    if (thumbnailFile) {
      uploadedThumbnail = await uploadOnCloudinary(
        thumbnailFile.path,
        "thumbnail"
      );
      if (!uploadedThumbnail) {
        throw new ApiError(
          500,
          "Failed to upload thumbnail file to Cloudinary"
        );
      }

      video.thumbnail = uploadedThumbnail.secure_url;
      video.thumbnailPublicId = uploadedThumbnail.public_id;
    }

    await video.save();

    await Promise.all([
      uploadedVideo && oldVideoPublicId
        ? deleteFromCloudinary(oldVideoPublicId, "video")
        : Promise.resolve(),
      uploadedThumbnail && oldThumbnailPublicId
        ? deleteFromCloudinary(oldThumbnailPublicId, "image")
        : Promise.resolve(),
    ]);

    return res
      .status(200)
      .json(new ApiResponse(200, video, "Video assets updated successfully"));
  } catch (error) {
    await Promise.all([
      uploadedVideo ? cleanupUpload(uploadedVideo, "video") : Promise.resolve(),
      uploadedThumbnail
        ? cleanupUpload(uploadedThumbnail, "image")
        : Promise.resolve(),
    ]);

    throw new ApiError(500, "Failed to update video assets", error.message);
  } finally {
    if (videoFile?.path && fs.existsSync(videoFile.path)) {
      try {
        fs.unlinkSync(videoFile.path);
      } catch (e) {
        console.error("Video unlink error:", e);
      }
    }
    if (thumbnailFile?.path && fs.existsSync(thumbnailFile.path)) {
      try {
        fs.unlinkSync(thumbnailFile.path);
      } catch (e) {
        console.error("Thumbnail unlink error:", e);
      }
    }
  }
});

// router.route("/:id/details").patch()
const updateVideoDetails = asyncHandler(async (req, res) => {
  ensureValidVideoId(req.params.id);

  const { title, description } = req.body || {};

  if (title === undefined && description === undefined) {
    throw new ApiError(400, "Provide either title or description to update");
  }

  const video = await Video.findById(req.params.id);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  ensureOwner(video, req.user?._id);

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      throw new ApiError(400, "Title cannot be empty");
    }
    video.title = title.trim();
  }

  if (description !== undefined) {
    if (typeof description !== "string" || description.trim() === "") {
      throw new ApiError(400, "Description cannot be empty");
    }
    video.description = description.trim();
  }

  await video.save();

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video details updated successfully"));
});

// router.route("/:id").delete(verifyJWT, deleteVideo)
const deleteVideo = asyncHandler(async (req, res) => {
  ensureValidVideoId(req.params.id);

  const video = await Video.findById(req.params.id);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  ensureOwner(video, req.user?._id);

  await video.deleteOne();
  await Promise.all([
    deleteFromCloudinary(video.videoPublicId, "video"),
    deleteFromCloudinary(video.thumbnailPublicId, "image"),
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Video deleted successfully"));
});

// router.route("/:id/toggle-publish").patch(verifyJWT, togglePublishStatus)
const togglePublishStatus = asyncHandler(async (req, res) => {
  ensureValidVideoId(req.params.id);

  const video = await Video.findById(req.params.id);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  ensureOwner(video, req.user?._id);

  video.isPublished = !video.isPublished;
  await video.save();

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Publish status updated successfully"));
});

export {
  publishVideo,
  getVideoById,
  getAllVideos,
  updateVideoAssets,
  updateVideoDetails,
  deleteVideo,
  togglePublishStatus,
};
