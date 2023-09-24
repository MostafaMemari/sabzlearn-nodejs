const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const conmmentController = require("../../controllers/v1/commentController");
const isAdminMiddleware = require("../../middlewares/isAdminMiddleware");

const commentsRouter = express.Router();

commentsRouter.route("/").post(authMiddleware, isAdminMiddleware, conmmentController.create);

commentsRouter.route("/:id").delete(authMiddleware, isAdminMiddleware, conmmentController.remove);

commentsRouter.route("/:id/accept").put(authMiddleware, isAdminMiddleware, conmmentController.remove);
commentsRouter.route("/:id/reject").put(authMiddleware, isAdminMiddleware, conmmentController.reject);

module.exports = commentsRouter;
