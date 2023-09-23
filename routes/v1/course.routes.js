const express = require("express");
const coursesController = require("./../../controllers/v1/courses.Controller");
const multer = require("multer");
const multerStorage = require("../../utils/uploader");
const authMiddleware = require("../../middlewares/authMiddleware");
const isAdminMiddleware = require("../../middlewares/isAdminMiddleware");

const courseRouter = express.Router();

courseRouter
  .route("/")
  .post(
    multer({ storage: multerStorage, limits: { fileSize: 10000000 } }).single("cover"),
    authMiddleware,
    isAdminMiddleware,
    coursesController.create
  );

courseRouter.route("/:id/sessions").post(
  // multer({ storage: multerStorage, limits: { fileSize: 10000000 } }).single("video"),
  authMiddleware,
  isAdminMiddleware,
  coursesController.createSession
);

courseRouter.route("/:id").delete(authMiddleware, coursesController.remove);

courseRouter.route("/related/:href").get(coursesController.getRelated);

courseRouter.route("/categorie/:href").get(coursesController.getCoursesByCaregory);

courseRouter.route("/sessions").get(authMiddleware, isAdminMiddleware, coursesController.getAllSessions);

courseRouter.route("/:href/:sessionID").get(coursesController.getSessionInfo);

courseRouter.route("/sessions/:id").delete(authMiddleware, isAdminMiddleware, coursesController.removeSession);

courseRouter.route("/:id/register").post(authMiddleware, coursesController.register);

module.exports = courseRouter;
