import { Router } from "express";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  publishVideo,
  togglePublishStatus,
  updateVideoDetails,
  updateVideoAssets,
  incrementViews,
} from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/")
  .get(getAllVideos)
  .post(
    verifyJWT,
    upload.fields([
      { name: "video", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ]),
    publishVideo
  );

router.route("/:videoId").get(getVideoById).delete(verifyJWT, deleteVideo);

router.route("/:videoId/details").patch(verifyJWT, updateVideoDetails);

router.route("/:videoId/assets").patch(
  verifyJWT,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateVideoAssets
);

router.route("/:videoId/toggle-publish").patch(verifyJWT, togglePublishStatus);

router.route("/:videoId/increment-views").patch(incrementViews);

export default router;
