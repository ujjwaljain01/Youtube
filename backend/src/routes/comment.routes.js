import { Router } from "express";
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
  getReplies,
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/:targetId").get(getComments).post(addComment);
router.route("/:commentId").delete(deleteComment).patch(updateComment);
router.route("/:commentId/replies").get(getReplies);

export default router;
