const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const conmmentController = require("../../controllers/v1/commentController");

const commentsRouter = express.Router();

commentsRouter.route("/").post(authMiddleware, conmmentController.create);

module.exports = commentsRouter;
