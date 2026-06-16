import { Router } from "express";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  publishVideo,
  togglePublishStatus,
  updateVideoDetails,
  updateVideoAssets,
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

router.route("/:id").get(getVideoById).delete(verifyJWT, deleteVideo);

router.route("/:id/details").patch(verifyJWT, updateVideoDetails);

router.route("/:id/assets").patch(
  verifyJWT,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateVideoAssets
);

router.route("/:id/toggle-publish").patch(verifyJWT, togglePublishStatus);

export default router;
