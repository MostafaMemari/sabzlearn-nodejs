const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const conmmentController = require("../../controllers/v1/commentController");
const isAdminMiddleware = require("../../middlewares/isAdminMiddleware");

const commentsRouter = express.Router();

commentsRouter
  .route("/")
  .post(authMiddleware, isAdminMiddleware, conmmentController.create)
  .get(authMiddleware, isAdminMiddleware, conmmentController.getAll);

commentsRouter.route("/:id").delete(authMiddleware, isAdminMiddleware, conmmentController.remove);

commentsRouter.route("/:id/accept").put(authMiddleware, isAdminMiddleware, conmmentController.remove);
commentsRouter.route("/:id/reject").put(authMiddleware, isAdminMiddleware, conmmentController.reject);

commentsRouter.route("/:id/answer").post(authMiddleware, isAdminMiddleware, conmmentController.answer);

module.exports = commentsRouter;
